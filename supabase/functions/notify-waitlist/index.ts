import { Resend } from 'npm:resend@2.1.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Initialize Resend with your API key
const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { record } = body;

    if (!record) {
      throw new Error("No record found in webhook payload");
    }

    // Send welcome email to the user
    await resend.emails.send({
      from: "RUDO <info@rudofit.com>",
      to: record.email,
      subject: "¡Bienvenido a la lista de espera de RUDO!",
      replyTo: "rudo.management@gmail.com",
      html: `
        <div style="font-family: 'Inter', sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8A2BE2; margin-bottom: 24px;">¡Hola ${record.name}! 👋</h1>
          
          <p style="margin-bottom: 16px; line-height: 1.6;">
            Gracias por unirte a la lista de espera de RUDO. Estamos emocionados de tenerte a bordo.
          </p>
          
          <p style="margin-bottom: 16px; line-height: 1.6;">
            Serás uno de los primeros en saber cuando lancemos la plataforma. Mientras tanto, 
            mantente atento a tu correo para recibir actualizaciones exclusivas.
          </p>
          
          ${record.box ? `
          <p style="margin-bottom: 16px; line-height: 1.6;">
            Nos encanta saber que vienes de ${record.box}. Estamos trabajando para hacer de RUDO 
            la mejor herramienta para boxes como el tuyo.
          </p>
          ` : ''}
          
          <p style="margin-bottom: 24px; line-height: 1.6;">
            Si tienes alguna pregunta, no dudes en responder a este correo.
          </p>
          
          <p style="color: #666; font-size: 14px;">
            ¡Nos vemos pronto!<br>
            El equipo de RUDO
          </p>
        </div>
      `,
    });

    // Send notification to admin
    await resend.emails.send({
      from: "RUDO <info@rudofit.com>",
      to: "rudo.management@gmail.com",
      subject: "¡Nuevo registro en la lista de espera!",
      html: `
        <div style="font-family: 'Inter', sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8A2BE2; margin-bottom: 24px;">Nuevo registro en la lista de espera</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 8px 0;"><strong>Nombre:</strong> ${record.name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${record.email}</p>
            ${record.box ? `<p style="margin: 8px 0;"><strong>Box:</strong> ${record.box}</p>` : ''}
            <p style="margin: 8px 0;"><strong>Fecha:</strong> ${new Date(record.created_at).toLocaleString('es-419')}</p>
          </div>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});