// Edge function: PetBot chat — proxies to Lovable AI Gateway (streaming)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const CATALOG = `CATÁLOGO DE PRODUCTOS:
ALIMENTOS: Purina Pro Plan cachorro (perros jóvenes), Purina Pro Plan adulto (perros adultos), Purina Pro Plan gato, NutriSource perro, NutriSource gato, Balance perro adulto, Balance cachorro, Diamond Maintenance Cat, Pedigree croquetas, Biscrok snacks, Alimento húmedo para gato, Alimento premium razas pequeñas.
SNACKS: Huesos masticables, Galletas Dukan, Premios dentales, Snacks naturales, Treats para entrenamiento.
JUGUETES: Peluche squeaky, Kong rellenable, Cuerda para tirar, Pelotas de caucho, Juguetes interactivos, Mordedores.
ACCESORIOS: Camas para perro, Camas para gato, Platos para comida, Dispensadores de agua, Collares, Correas, Arnés.
GROOMING: Shampoo para perro, Shampoo para gato, Corte de uñas, Limpieza de oídos, Cepillos, Servicios de grooming.
SALUD: Vitaminas, Suplementos, Productos calmantes, Control de pulgas.
OTROS: Arena para gato, Comida para conejo, Heno, Jaulas pequeñas.`;

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
