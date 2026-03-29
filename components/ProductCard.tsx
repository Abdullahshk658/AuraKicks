"use client";

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { calculateDiscountPercentage, formatPrice } from "@/utils/formatPrice";

export type ProductCardVariant = {
  id?: string;
  size?: string | null;
  color?: string | null;
  stockQuantity: number;
};

export type ProductCardData = {
  id: string;
  slug: string;
  title: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  batchType: "Premium Plus Batch" | "Dot Perfect" | "1:1" | "HOP Batch";
  category: string;
  subCategory?: string | null;
  variants?: ProductCardVariant[];
};

type ProductCardProps = {
  product: ProductCardData;
  priority?: boolean;
};

const badgeStyles: Record<ProductCardData["batchType"], string> = {
  "Premium Plus Batch":
    "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
  "Dot Perfect": "border-sky-400/30 bg-sky-400/10 text-sky-100",
  "1:1": "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-100",
  "HOP Batch": "border-brand-300/30 bg-brand-400/10 text-brand-100"
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const primaryImage = product.images[0] ?? "/fallback-product.jpg";
  const secondaryImage = product.images[1] ?? primaryImage;
  const firstVariant = product.variants?.find((variant) => variant.stockQuantity > 0);
  const totalStock =
    product.variants?.reduce((sum, variant) => sum + variant.stockQuantity, 0) ?? 0;
  const discountPercentage = calculateDiscountPercentage(
    product.price,
    product.compareAtPrice
  );

  const handleQuickAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      image: primaryImage,
      price: product.price,
      compareAtPrice: product.compareAtPrice ?? null,
      batchType: product.batchType,
      quantity: 1,
      maxQuantity: Math.max(firstVariant?.stockQuantity ?? totalStock, 1),
      variant: firstVariant
        ? {
            id: firstVariant.id,
            size: firstVariant.size ?? null,
            color: firstVariant.color ?? null
          }
        : undefined
    });
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-card/80 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-300/30">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/4.6] overflow-hidden bg-card">
          <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4">
            <Badge className={badgeStyles[product.batchType]}>{product.batchType}</Badge>
            {discountPercentage > 0 ? (
              <Badge
                variant="secondary"
                className="border-red-400/20 bg-red-400/10 text-red-100"
              >
                -{discountPercentage}%
              </Badge>
            ) : null}
          </div>

          <Image
            src={primaryImage}
            alt={product.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-0"
          />
          <Image
            src={secondaryImage}
            alt={`${product.title} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover opacity-0 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />

          <div className="absolute inset-x-4 bottom-4 z-10 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs font-medium text-zinc-200 backdrop-blur-md">
            {product.subCategory ?? product.category}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
            {product.category}
          </p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-brand-100">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-white">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price ? (
                <span className="text-sm text-zinc-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              {totalStock > 0 ? `${totalStock} units available` : "Out of stock"}
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleQuickAdd}
            disabled={totalStock <= 0}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
