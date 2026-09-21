import Link from 'next/link'
import type { Metadata } from 'next'
import { BUTTON } from '@/lib/theme'

export const metadata: Metadata = {
  title: 'Pagina niet gevonden',
  robots: { index: false, follow: false },
}

/** De oude site had helemaal geen 404-pagina. */
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-16">
      <p className="text-8xl md:text-9xl font-black text-mellow-red tracking-tighter">404</p>
      <h1 className="mt-4 text-3xl md:text-4xl font-bold text-mellow-groen">
        Verkeerde afslag genomen
      </h1>
      <p className="mt-4 text-xl text-mellow-white max-w-md">
        Deze pagina bestaat niet (meer). Terug naar de gebaande paden?
      </p>
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Link href="/" prefetch={false} className={BUTTON.primary}>
          Naar de homepage
        </Link>
        <Link href="/agenda" prefetch={false} className={BUTTON.secondary}>
          Bekijk de agenda
        </Link>
      </div>
    </div>
  )
}
