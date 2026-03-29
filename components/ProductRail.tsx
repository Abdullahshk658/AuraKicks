"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ProductCard, type ProductCardData } from "@/components/ProductCard";

type ProductRailProps = {
  title: string;
  eyebrow: string;
  products: ProductCardData[];
};

export function ProductRail({ title, eyebrow, products }: ProductRailProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true
  });

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">{title}</h2>
        </div>

        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="rounded-full border border-white/10 bg-white/5 p-3 text-zinc-200 transition hover:bg-white/10"
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="rounded-full border border-white/10 bg-white/5 p-3 text-zinc-200 transition hover:bg-white/10"
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_50%] xl:flex-[0_0_30%]"
            >
              <ProductCard product={product} priority={index < 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
