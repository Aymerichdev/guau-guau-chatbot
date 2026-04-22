import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Send } from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  { emoji: "🐶", text: "Tengo un perro cachorro" },
  { emoji: "🐱", text: "Tengo un gato adulto" },
  { emoji: "🧸", text: "Busco juguetes para mi perro" },
  { emoji: "💊", text: "Necesito productos de salud" },
];

const WELCOME: Msg = {
  role: "assistant",
  content:
    "¡Hola! 🐾 Soy **PetBot**, tu asistente de **Guau Guau Pet Shop**. Contame sobre tu mascota (tipo, edad, necesidades) y te recomiendo los productos perfectos. ¿Qué tipo de mascota tenés?",
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/petbot-chat`;

export function PetBot() {
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setShowSuggestions(false);
    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last !== WELCOME && prev.length > next.length) {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m,
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      // Strip the welcome message from history sent to API
      const history = next.filter((m) => m !== WELCOME);
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: history }),
      });

      if (!resp.ok) {
        if (resp.status === 429) {
          toast.error("Demasiadas solicitudes. Esperá un momento.");
        } else if (resp.status === 402) {
          toast.error("Se agotaron los créditos de IA.");
        } else {
          toast.error("Error al contactar a PetBot.");
        }
        setIsLoading(false);
        return;
      }
      if (!resp.body) throw new Error("no body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) upsert(content);
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Error de conexión. Intentá de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10"
    >
      <div className="flex h-[calc(100vh-9rem)] max-h-[720px] min-h-[520px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card-hover)]">
        {/* Header */}
        <div className="flex items-center gap-3 bg-[var(--gradient-brand)] px-5 py-4 text-primary-foreground">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 p-1">
            <img src={logo} alt="" width={40} height={40} className="h-9 w-9 object-contain" />
          </div>
          <div>
            <h2 className="text-base font-semibold leading-tight">PetBot</h2>
            <p className="text-xs opacity-90">Asistente de Guau Guau</p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-5 sm:px-5">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`chat-md max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-primary-soft text-foreground"
                }`}
              >
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-primary-soft px-4 py-3">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {showSuggestions && (
          <div className="flex flex-wrap gap-2 px-4 pb-2 sm:px-5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.text}
                onClick={() => send(s.text)}
                className="rounded-full border border-primary px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <span aria-hidden className="mr-1">{s.emoji}</span>
                {s.text}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-border bg-card px-4 py-3 sm:px-5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ej: tengo un perro adulto raza pequeña…"
            disabled={isLoading}
            className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
            aria-label="Mensaje para PetBot"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-secondary disabled:opacity-50"
            aria-label="Enviar mensaje"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        <p className="border-t border-border bg-card py-2 text-center text-[11px] text-muted-foreground">
          Powered by AI 🐾
        </p>
      </div>
    </motion.section>
  );
}
