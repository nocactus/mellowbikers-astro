import type { Payload } from 'payload'

/**
 * Maakt de twee formulieren aan die de oude API-routes vervingen.
 *
 * Het lid-worden-formulier krijgt een verplichte toestemmingscheckbox.
 * De oude versie verzamelde naam, adres, postcode, geboortedatum,
 * telefoon en noodcontact zonder enige privacyverklaring of toestemming.
 */
export async function ensureForms(
  payload: Payload,
  html: (value: string) => Promise<unknown>,
): Promise<{ contact: number; membership: number }> {
  const find = async (title: string) => {
    const result = await payload.find({ collection: 'forms', where: { title: { equals: title } }, limit: 1 })
    return result.docs[0]?.id
  }

  const text = (name: string, label: string, required = true, width = 100) =>
    ({ blockType: 'text' as const, name, label, required, width })

  let contact = await find('Contact')
  if (!contact) {
    const created = await payload.create({
      collection: 'forms',
      data: {
        title: 'Contact',
        submitButtonLabel: 'Verstuur bericht',
        confirmationType: 'message',
        confirmationMessage: (await html(
          '<p>Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.</p>',
        )) as never,
        fields: [
          text('name', 'Naam'),
          { blockType: 'email', name: 'email', label: 'E-mailadres', required: true, width: 100 },
          { blockType: 'textarea', name: 'message', label: 'Bericht', required: true, width: 100 },
        ],
        emails: [
          {
            emailTo: 'info@mellowbikers.nl',
            replyTo: '{{email}}',
            subject: 'Nieuw contactbericht van {{name}}',
            message: undefined,
          },
        ],
      },
    })
    contact = created.id
  }

  let membership = await find('Lid worden')
  if (!membership) {
    const created = await payload.create({
      collection: 'forms',
      data: {
        title: 'Lid worden',
        submitButtonLabel: 'Aanmelding versturen',
        confirmationType: 'message',
        confirmationMessage: (await html(
          '<p>Bedankt voor je aanmelding! We nemen contact met je op over de volgende stap.</p>',
        )) as never,
        fields: [
          text('firstName', 'Voornaam', true, 50),
          text('lastName', 'Achternaam', true, 50),
          { blockType: 'email', name: 'email', label: 'E-mailadres', required: true, width: 50 },
          text('phone', 'Telefoonnummer', true, 50),
          text('address', 'Adres', true, 100),
          text('zipCode', 'Postcode', true, 50),
          text('city', 'Plaats', true, 50),
          text('birthDate', 'Geboortedatum', true, 50),
          text('emergencyContact', 'Noodcontact — naam', false, 50),
          text('emergencyPhone', 'Noodcontact — telefoon', false, 50),
          { blockType: 'textarea', name: 'experience', label: 'Mountainbike-ervaring', required: false, width: 100 },
          {
            blockType: 'checkbox',
            name: 'privacyConsent',
            label: 'Ik ga akkoord met de privacyverklaring',
            required: true,
            width: 100,
          },
        ],
        emails: [
          {
            emailTo: 'info@mellowbikers.nl',
            replyTo: '{{email}}',
            subject: 'Nieuwe aanmelding: {{firstName}} {{lastName}}',
            message: undefined,
          },
        ],
      },
    })
    membership = created.id
  }

  return { contact, membership }
}
