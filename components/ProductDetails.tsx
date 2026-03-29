"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Check, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/formatPrice";

type ProductVariant = {
  id: string;
  size: string;
  color: string;
  stockQuantity: number;
  image?: string;
};

type ProductDetailsProps = {
  product: {
    id: string;
    slug: string;
    title: string;
    description: string;
    shortDescription: string;
    price: number;
    compareAtPrice?: number | null;
    batchType: string;
    subCategory: string;
    images: string[];
    tags: string[];
    variants: ProductVariant[];
  };
  shippingPolicySections: readonly string[];
  sizeGuideSections: readonly string[];
};

export function ProductDetails({
  product,
  shippingPolicySections,
  sizeGuideSections
}: ProductDetailsProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedImage, setSelectedImage] = useState(product.images[0] ?? "");
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size ?? "");
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color ?? "");
  const [quantity, setQuantity] = useState(1);

  const sizes = Array.from(new Set(product.variants.map((variant) => variant.size)));
  const colors = Array.from(new Set(product.variants.map((variant) => variant.color)));

  const activeVariant = useMemo(
    () =>
      product.variants.find(
        (variant) => variant.size === selectedSize && variant.color === selectedColor
      ) ?? product.variants[0],
    [product.variants, selectedColor, selectedSize]
  );

  const totalStock = activeVariant?.stockQuantity ?? 0;
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? product.compareAtPrice - product.price
      : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      image: selectedImage,
      price: product.price,
      compareAtPrice: product.compareAtPrice ?? null,
      batchType: product.batchType,
      quantity,
      maxQuantity: Math.max(totalStock, 1),
      variant: activeVariant
        ? {
            id: activeVariant.id,
            size: activeVariant.size,
            color: activeVariant.color
          }
        : undefined
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <section className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="space-y-5">
        <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-card">
          <div className="relative aspect-[4/4.7]">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-[1.15]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.08)_100%)]" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {product.images.map((image) => (
            <button
              key={image}
              type="button"
              onMouseEnter={() => setSelectedImage(image)}
              onClick={() => setSelectedImage(image)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-2xl border bg-card transition",
                selectedImage === image
                  ? "border-brand-300/50"
                  : "border-white/10 hover:border-white/20"
              )}
            >
              <Image
                src={image}
                alt={`${product.title} thumbnail`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-card sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{product.batchType}</Badge>
            <Badge variant="secondary">{product.subCategory}</Badge>
          </div>

          <h1 className="mt-5 text-4xl font-semibold text-white">{product.title}</h1>
          <p className="mt-4 text-base leading-7 text-zinc-300">
            {product.shortDescription}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-semibold text-white">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice ? (
              <span className="text-lg text-zinc-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            ) : null}
            {discount > 0 ? (
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                Save {formatPrice(discount)}
              </span>
            ) : null}
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Select Size
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition",
                      selectedSize === size
                        ? "border-brand-300/40 bg-brand-400/10 text-white"
                        : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Select Color
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition",
                      selectedColor === color
                        ? "border-brand-300/40 bg-brand-400/10 text-white"
                        : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Quantity
                </p>
                <p className="mt-1 text-sm text-zinc-300">
                  {totalStock > 0 ? `${totalStock} pieces in stock` : "Currently unavailable"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="rounded-full border border-white/10 px-3 py-2 text-white transition hover:bg-white/10"
                >
                  -
                </button>
                <span className="min-w-6 text-center text-sm font-semibold text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((value) => Math.min(totalStock || 1, value + 1))
                  }
                  className="rounded-full border border-white/10 px-3 py-2 text-white transition hover:bg-white/10"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={totalStock <= 0}
                className="w-full"
              >
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={handleBuyNow}
                disabled={totalStock <= 0}
                className="w-full"
              >
                Buy it Now
              </Button>
            </div>

            <div className="grid gap-3 rounded-3xl border border-white/10 bg-slateGlow-800/70 p-4 text-sm text-zinc-300">
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-emerald-300" />
                Premium quality check before dispatch
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-4 w-4 text-brand-200" />
                Nationwide delivery with COD and online payment
              </div>
            </div>
          </div>

          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="description">
              <AccordionTrigger>Product Description</AccordionTrigger>
              <AccordionContent>{product.description}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping Policy</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {shippingPolicySections.map((section) => (
                    <p key={section}>{section}</p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="size-guide">
              <AccordionTrigger>Size Guide</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {sizeGuideSections.map((section) => (
                    <p key={section}>{section}</p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-8 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.16em] text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
