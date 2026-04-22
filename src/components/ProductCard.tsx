import { motion } from "framer-motion";
import { type Product, formatColones, getProductImage } from "@/data/products";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-200 hover:border-primary hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-primary-soft">
        <img
          src={getProductImage(product)}
          alt={product.name}
          loading="lazy"
          width={768}
          height={576}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
      <div className="mb-3 flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
          aria-label={`Categoría ${product.category}`}
        >
          <span aria-hidden>{product.emoji}</span>
          {product.category}
        </span>
      </div>

      <h3 className="text-base font-bold leading-snug text-foreground">
        {product.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
        {product.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-lg font-bold text-primary">
          {formatColones(product.price)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelect(product)}
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Ver más
        </Button>
      </div>
      </div>
    </motion.article>
  );
}
