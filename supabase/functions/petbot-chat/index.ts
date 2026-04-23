// Edge function: PetBot chat — proxies to Lovable AI Gateway (streaming)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const CATALOG = `CATÁLOGO OFICIAL DE PRODUCTOS:

ALIMENTOS PERROS Y GATOS:
- Purina: Dog Chow (adulto/cachorro), Cat Chow, Pro Plan (perro adulto/cachorro/gato), Alpo, Friskies, Felix húmedo.
- Royal Canin: Mini Adulto (razas pequeñas), Maxi Adulto (razas grandes), Kitten.
- Hill's: Science Diet Adulto, Prescription Diet i/d (medicado digestivo).
- Pet Master, Pro Pet, Super Perro (opciones económicas balanceadas).

SNACKS Y PREMIOS: Galletas para perro, Premios dentales, Snacks naturales, Treats para entrenamiento, Huesos masticables, Premios para gato.

SALUD Y SUPLEMENTOS:
- Vitaminas multivitamínicas, Suplementos minerales, Suplemento articular, Suplemento piel y pelaje, Probióticos, Suplemento digestivo.
- Antiparasitarios: Bayer (oral), Frontline (pipetas pulgas/garrapatas), Nexgard (masticable).
- Cuidado: Shampoo medicado, Gotas óticas, Pasta dental para mascotas, Kit de cuidado dental.

ACCESORIOS:
- Fancy Pets: Collar ajustable, Correa resistente, Pechera acolchada.
- Placa de identificación, Cama para perro/gato, Cobija polar, Transportadora plástica.
- Comedero de acero, Bebedero antideslizante, Fuente de agua eléctrica.
- Kong: Clásico (rellenable) y Puppy (cachorros).

AVES: Vitakraft (mezcla pericos, snacks), Kaytee (Forti-Diet, mezcla canarios), ZuPreem FruitBlend (pellets con frutas).

CONEJOS: Oxbow (heno Timothy, pellets adultos), Vitakraft (alimento completo, snacks heno/frutas), Kaytee Forti-Diet.

PECES: Tetra (escamas tropical, Min granulado), Sera Vipan (escamas premium), API (pellets de fondo), Hikari (Cichlid Gold, Betta Bio-Gold).`;

const SYSTEM_PROMPT = `Eres PetBot, el asistente amigable de la tienda de mascotas "Guau Guau Pet Shop" en Costa Rica.
Tu única función es recomendar productos del catálogo según la mascota del cliente (tipo, edad, necesidades).
Cuando el cliente describa su mascota, recomienda exactamente 10 productos del catálogo, explica brevemente por qué cada uno y al final pregunta si necesita algo más.
Si te preguntan algo fuera del tema de mascotas, redirige amablemente al tema.
Responde siempre en español, de forma cálida, concisa y usa emojis ocasionalmente 🐾.
Usa formato markdown (listas, negritas) para que las recomendaciones sean fáciles de leer.

${CATALOG}`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Demasiadas solicitudes. Intentá en un momento." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Se agotaron los créditos de IA. Agregá fondos en Settings → Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Error del servicio de IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("petbot-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
