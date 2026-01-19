globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as dist } from '../../chunks/index_aKCL9d7R.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, locals }) => {
  try {
    const formData = await request.formData();
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      zipCode: formData.get("zipCode"),
      city: formData.get("city"),
      birthDate: formData.get("birthDate"),
      emergencyContact: formData.get("emergencyContact"),
      emergencyPhone: formData.get("emergencyPhone"),
      experience: formData.get("experience"),
      "cf-turnstile-response": formData.get("cf-turnstile-response")
    };
    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "zipCode", "city", "birthDate"];
    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      return new Response(JSON.stringify({ error: "Vul alle verplichte velden in" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(JSON.stringify({ error: "Voer een geldig emailadres in" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const turnstileSecret = locals.runtime?.env?.TURNSTILE_SECRET_KEY || undefined                                    ;
    if (turnstileSecret && data["cf-turnstile-response"]) {
      const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: data["cf-turnstile-response"]
        })
      });
      const outcome = await turnstileResponse.json();
      if (!outcome.success) {
        return new Response(JSON.stringify({ error: "Verificatie mislukt. Probeer opnieuw." }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    const postmarkToken = locals.runtime?.env?.POSTMARK_API_TOKEN || undefined                                  ;
    console.log("Postmark token available:", !!postmarkToken);
    console.log("Environment check:", {
      hasRuntime: !!locals.runtime,
      hasEnv: !!locals.runtime?.env,
      tokenLength: postmarkToken?.length || 0
    });
    if (postmarkToken) {
      try {
        const client = new dist.ServerClient(postmarkToken);
        console.log("Sending membership email via Postmark...");
        const result = await client.sendEmail({
          From: "info@mellowbikers.nl",
          To: "info@mellowbikers.nl",
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
Naam: ${data.emergencyContact || "Niet opgegeven"}
Telefoon: ${data.emergencyPhone || "Niet opgegeven"}

Mountainbike ervaring:
${data.experience || "Niet opgegeven"}
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
            <tr><td style="padding: 5px 10px; border: 1px solid #ddd;"><strong>Naam:</strong></td><td style="padding: 5px 10px; border: 1px solid #ddd;">${data.emergencyContact || "<em>Niet opgegeven</em>"}</td></tr>
            <tr><td style="padding: 5px 10px; border: 1px solid #ddd;"><strong>Telefoon:</strong></td><td style="padding: 5px 10px; border: 1px solid #ddd;">${data.emergencyPhone || "<em>Niet opgegeven</em>"}</td></tr>
          </table>
          
          <h3>Mountainbike ervaring</h3>
          <p>${data.experience ? data.experience.replace(/\n/g, "<br>") : "<em>Niet opgegeven</em>"}</p>
        `
        });
        console.log("Membership email sent successfully:", result.MessageID);
      } catch (emailError) {
        console.error("Postmark error:", emailError);
      }
    } else {
      console.log("No Postmark token found - email not sent");
      console.log("Lid worden formulier ingediend:", data);
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Bedankt voor je inschrijving! Onze secretaris neemt zo snel mogelijk contact met je op."
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error processing lid-worden form:", error);
    return new Response(JSON.stringify({ error: "Er ging iets mis. Probeer het later opnieuw." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
