import type { APIRoute } from 'astro';
import { ServerClient } from 'postmark';

interface LidWordenFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  birthDate: string;
  emergencyContact: string;
  emergencyPhone: string;
  experience: string;
  'cf-turnstile-response': string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const formData = await request.formData();
    const data: LidWordenFormData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      zipCode: formData.get('zipCode') as string,
      city: formData.get('city') as string,
      birthDate: formData.get('birthDate') as string,
      emergencyContact: formData.get('emergencyContact') as string,
      emergencyPhone: formData.get('emergencyPhone') as string,
      experience: formData.get('experience') as string,
      'cf-turnstile-response': formData.get('cf-turnstile-response') as string,
    };

    // Validatie
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'zipCode', 'city', 'birthDate'];
    const missingFields = requiredFields.filter(field => !data[field as keyof LidWordenFormData]);
    
    if (missingFields.length > 0) {
      return new Response(JSON.stringify({ error: 'Vul alle verplichte velden in' }), {
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
    const turnstileSecret = (locals.runtime?.env?.TURNSTILE_SECRET_KEY as string) || import.meta.env.TURNSTILE_SECRET_KEY;
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

    // Verstuur inschrijving via Postmark
    const postmarkToken = (locals.runtime?.env?.POSTMARK_API_TOKEN as string) || import.meta.env.POSTMARK_API_TOKEN;
    console.log('Postmark token available:', !!postmarkToken);
    console.log('Environment check:', {
      hasRuntime: !!locals.runtime,
      hasEnv: !!locals.runtime?.env,
      tokenLength: postmarkToken?.length || 0
    });
    
    if (postmarkToken) {
      try {
        const client = new ServerClient(postmarkToken);
        console.log('Sending membership email via Postmark...');
      
        const result = await client.sendEmail({
        From: 'info@mellowbikers.nl',
        To: 'info@mellowbikers.nl',
        ReplyTo: data.email,
        Subject: `Nieuwe inschrijving: ${data.firstName} ${data.lastName}`,
        TextBody: `
NIEUWE LIDMAATSCHAP AANVRAAG

Persoonlijke gegevens:
Naam: ${data.firstName} ${data.lastName}
Email: ${data.email}
Telefoon: ${data.phone}
Adres: ${data.address}
Postcode: ${data.zipCode}
Plaats: ${data.city}
Geboortedatum: ${data.birthDate}

Noodcontact:
Naam: ${data.emergencyContact || 'Niet opgegeven'}
Telefoon: ${data.emergencyPhone || 'Niet opgegeven'}

Mountainbike ervaring:
${data.experience || 'Niet opgegeven'}
        `,
        HtmlBody: `
          <h2>Nieuwe lidmaatschap aanvraag</h2>
          
          <h3>Persoonlijke gegevens</h3>
          <table style="border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 5px 10px; border: 1px solid #ddd;"><strong>Naam:</strong></td><td style="padding: 5px 10px; border: 1px solid #ddd;">${data.firstName} ${data.lastName}</td></tr>
            <tr><td style="padding: 5px 10px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 5px 10px; border: 1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 5px 10px; border: 1px solid #ddd;"><strong>Telefoon:</strong></td><td style="padding: 5px 10px; border: 1px solid #ddd;">${data.phone}</td></tr>
            <tr><td style="padding: 5px 10px; border: 1px solid #ddd;"><strong>Adres:</strong></td><td style="padding: 5px 10px; border: 1px solid #ddd;">${data.address}</td></tr>
            <tr><td style="padding: 5px 10px; border: 1px solid #ddd;"><strong>Postcode:</strong></td><td style="padding: 5px 10px; border: 1px solid #ddd;">${data.zipCode}</td></tr>
            <tr><td style="padding: 5px 10px; border: 1px solid #ddd;"><strong>Plaats:</strong></td><td style="padding: 5px 10px; border: 1px solid #ddd;">${data.city}</td></tr>
            <tr><td style="padding: 5px 10px; border: 1px solid #ddd;"><strong>Geboortedatum:</strong></td><td style="padding: 5px 10px; border: 1px solid #ddd;">${data.birthDate}</td></tr>
          </table>
          
          <h3>Noodcontact</h3>
          <table style="border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 5px 10px; border: 1px solid #ddd;"><strong>Naam:</strong></td><td style="padding: 5px 10px; border: 1px solid #ddd;">${data.emergencyContact || '<em>Niet opgegeven</em>'}</td></tr>
            <tr><td style="padding: 5px 10px; border: 1px solid #ddd;"><strong>Telefoon:</strong></td><td style="padding: 5px 10px; border: 1px solid #ddd;">${data.emergencyPhone || '<em>Niet opgegeven</em>'}</td></tr>
          </table>
          
          <h3>Mountainbike ervaring</h3>
          <p>${data.experience ? data.experience.replace(/\n/g, '<br>') : '<em>Niet opgegeven</em>'}</p>
        `,
        });
        
        console.log('Membership email sent successfully:', result.MessageID);
      } catch (emailError) {
        console.error('Postmark error:', emailError);
        // Ga door met succes response, maar log de error
      }
    } else {
      console.log('No Postmark token found - email not sent');
      console.log('Lid worden formulier ingediend:', data);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Bedankt voor je inschrijving! Onze secretaris neemt zo snel mogelijk contact met je op.' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing lid-worden form:', error);
    return new Response(JSON.stringify({ error: 'Er ging iets mis. Probeer het later opnieuw.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
