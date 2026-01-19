globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as dist } from '../../chunks/index_aKCL9d7R.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, locals }) => {
  try {
    const formData = await request.formData();
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      "cf-turnstile-response": formData.get("cf-turnstile-response")
    };
    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: "Vul alle velden in" }), {
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
        console.log("Sending email via Postmark...");
        const result = await client.sendEmail({
          From: "info@mellowbikers.nl",
          To: "info@mellowbikers.nl",
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
            <p>${data.message.replace(/\n/g, "<br>")}</p>
          `
        });
        console.log("Email sent successfully:", result.MessageID);
      } catch (emailError) {
        console.error("Postmark error:", emailError);
      }
    } else {
      console.log("No Postmark token found - email not sent");
      console.log("Contact formulier ingediend:", data);
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op."
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
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
