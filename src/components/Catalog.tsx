import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { CATEGORIES, PRODUCTS, type Category, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { Input } from "@/components/ui/input";

type Filter = "Todos" | Category;

export function Catalog() {
  const [filter, setFilter] = useState<Filter>("Todos");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const inCategory = filter === "Todos" || p.category === filter;
      const inQuery = !q || p.name.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [filter, query]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10"
    >
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          Todo para tu mejor amigo 🐾
        </h2>
        <p className="mt-2 text-muted-foreground">
          Productos cuidadosamente seleccionados para mascotas felices.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar producto…"
          className="pl-9"
          aria-label="Buscar producto"
        />
      </div>

      {/* Category chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = filter === c.name;
          return (
            <button
              key={c.name}
              onClick={() => setFilter(c.name as Filter)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/75 hover:border-primary hover:text-primary"
              }`}
              aria-pressed={active}
            >
              <span aria-hidden className="mr-1">
                {c.emoji}
              </span>
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
          No encontramos productos con esos filtros.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onSelect={setSelected} />
            ))}
          </AnimatePresence>
        </div>
      )}

      <ProductModal
        product={selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </motion.section>
  );
}
