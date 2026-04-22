import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Catalog } from "@/components/Catalog";
import { PetBot } from "@/components/PetBot";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guau Guau Pet Shop — Todo para tu mascota" },
      {
        name: "description",
        content:
          "Tienda de mascotas en Costa Rica con catálogo completo y PetBot, tu asistente de IA que recomienda los productos perfectos para tu mejor amigo.",
      },
      { property: "og:title", content: "Guau Guau Pet Shop" },
      {
        property: "og:description",
        content:
          "Catálogo de productos para mascotas y un asistente IA que te recomienda lo mejor.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [tab, setTab] = useState<"catalog" | "chat">("catalog");

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={tab} onTabChange={setTab} />
      <main>
        <AnimatePresence mode="wait">
          {tab === "catalog" ? <Catalog key="catalog" /> : <PetBot key="chat" />}
        </AnimatePresence>
      </main>
      <Toaster />
    </div>
  );
}
