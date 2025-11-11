import type { APIRoute } from 'astro';
import { ServerClient } from 'postmark';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  'cf-turnstile-response': string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      'cf-turnstile-response': formData.get('cf-turnstile-response') as string,
    };

    // Validatie
    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: 'Vul alle velden in' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Email validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(JSON.stringify({ error: 'Voer een geldig emailadres in' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Turnstile verificatie
    const turnstileSecret = import.meta.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && data['cf-turnstile-response']) {
      const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: data['cf-turnstile-response'],
        }),
      });
      
      const outcome = await turnstileResponse.json();
      if (!outcome.success) {
        return new Response(JSON.stringify({ error: 'Verificatie mislukt. Probeer opnieuw.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Verstuur email via Postmark
    const postmarkToken = import.meta.env.POSTMARK_API_TOKEN;
    if (postmarkToken) {
      const client = new ServerClient(postmarkToken);
      
      await client.sendEmail({
        From: 'noreply@mellowbikers.nl',
        To: 'info@mellowbikers.nl',
        ReplyTo: data.email,
        Subject: `Nieuw contactbericht van ${data.name}`,
        TextBody: `
Naam: ${data.name}
Email: ${data.email}

Bericht:
${data.message}
        `,
        HtmlBody: `
          <h2>Nieuw contactbericht</h2>
          <p><strong>Naam:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <h3>Bericht:</h3>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
      });
    } else {
      console.log('Contact formulier ingediend:', data);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(JSON.stringify({ error: 'Er ging iets mis. Probeer het later opnieuw.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
