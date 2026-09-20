'use client'

import { useState, type FormEvent } from 'react'
import Script from 'next/script'
import type { Form } from '@/payload-types'

type Status = { state: 'idle' | 'sending' | 'ok' | 'error'; message?: string }

const INPUT =
  'w-full px-4 py-2 rounded bg-mellow-dark text-mellow-white border border-mellow-groen focus:outline-none focus:border-mellow-groen/70'

export const FormRenderer = ({ form }: { form: Form }) => {
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus({ state: 'sending' })

    // Vastpakken voor de await: React geeft currentTarget na afloop van
    // de handler vrij, dus daarna is het null.
    const formElement = event.currentTarget
    const formData = new FormData(formElement)
    const turnstileToken = formData.get('cf-turnstile-response')
    formData.delete('cf-turnstile-response')

    const submissionData = Array.from(formData.entries()).map(([field, value]) => ({
      field,
      value: String(value),
    }))

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: form.id, submissionData, turnstileToken }),
      })

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { errors?: { message: string }[] } | null
        throw new Error(body?.errors?.[0]?.message ?? 'Er ging iets mis.')
      }

      setStatus({ state: 'ok' })
      formElement.reset()
      ;(window as unknown as { turnstile?: { reset: () => void } }).turnstile?.reset()
    } catch (error) {
      setStatus({
        state: 'error',
        message: error instanceof Error ? error.message : 'Er ging iets mis. Probeer het later opnieuw.',
      })
    }
  }

  if (status.state === 'ok') {
    return (
      <p className="text-mellow-groen text-lg" role="status">
        Bedankt! We nemen zo snel mogelijk contact met je op.
      </p>
    )
  }

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />

      <form onSubmit={onSubmit} className="space-y-4">
        {(form.fields ?? []).map((field, i) => {
          if (field.blockType === 'message') {
            return (
              <div key={i} className="text-mellow-white">
                {/* message-velden bevatten rich text uit de Form Builder */}
              </div>
            )
          }

          const id = `${form.id}-${field.name}`
          const label = (
            <label htmlFor={id} className="block text-mellow-white text-sm mb-1">
              {field.label}
              {field.required ? ' *' : ''}
            </label>
          )

          if (field.blockType === 'textarea') {
            return (
              <div key={i}>
                {label}
                <textarea id={id} name={field.name} rows={4} required={!!field.required} className={`${INPUT} resize-none`} />
              </div>
            )
          }

          if (field.blockType === 'select') {
            return (
              <div key={i}>
                {label}
                <select id={id} name={field.name} required={!!field.required} className={INPUT}>
                  <option value="">Maak een keuze</option>
                  {(field.options ?? []).map((option, j) => (
                    <option key={j} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )
          }

          if (field.blockType === 'checkbox') {
            return (
              <div key={i} className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id={id}
                  name={field.name}
                  required={!!field.required}
                  className="mt-1"
                />
                <label htmlFor={id} className="text-mellow-white text-sm">
                  {field.label}
                  {field.required ? ' *' : ''}
                </label>
              </div>
            )
          }

          const type =
            field.blockType === 'email' ? 'email' : field.blockType === 'number' ? 'number' : 'text'

          return (
            <div key={i}>
              {label}
              <input id={id} name={field.name} type={type} required={!!field.required} className={INPUT} />
            </div>
          )
        })}

        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        />

        {status.state === 'error' && (
          <p className="text-sm bg-white/10 p-2 rounded text-mellow-white" role="alert">
            {status.message}
          </p>
        )}

        <button
          type="submit"
          disabled={status.state === 'sending'}
          className="text-2xl w-full px-6 py-3 rounded-lg bg-mellow-blue hover:bg-mellow-red text-mellow-white font-medium transition-colors border-2 border-mellow-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status.state === 'sending' ? 'Versturen…' : (form.submitButtonLabel ?? 'Versturen')}
        </button>
      </form>
    </>
  )
}
