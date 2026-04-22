import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type Product, formatColones } from "@/data/products";

interface ProductModalProps {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({ product, onOpenChange }: ProductModalProps) {
  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {product && (
          <>
            <DialogHeader>
              <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                <span aria-hidden>{product.emoji}</span>
                {product.category}
              </span>
              <DialogTitle className="text-2xl text-foreground">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                {product.description}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 rounded-lg bg-primary-soft p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Precio
              </p>
              <p className="mt-1 text-3xl font-bold text-primary">
                {formatColones(product.price)}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
