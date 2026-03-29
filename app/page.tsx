import { ArrowRight, ShieldCheck, Truck, WalletCards } from "lucide-react";
import Link from "next/link";

import { CategoryGrid } from "@/components/CategoryGrid";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductRail } from "@/components/ProductRail";
import { Button } from "@/components/ui/button";
import { categoryCards, heroSlides } from "@/lib/mock-data";
import { getFeaturedProducts, getLatestProducts } from "@/lib/storefront";

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Quality Checked",
    description: "Every order is reviewed before dispatch to maintain finish and consistency."
  },
  {
    icon: Truck,
    title: "Nationwide Shipping",
    description: "Fast delivery across Pakistan with reliable courier partners and order tracking."
  },
  {
    icon: WalletCards,
    title: "COD + Stripe",
    description: "Pay online or choose Cash on Delivery for local purchase confidence."
  }
];

export default async function HomePage() {
  const [featuredProducts, latestProducts] = await Promise.all([
    getFeaturedProducts(6),
    getLatestProducts(6)
  ]);

  return (
    <main className="pb-24 pt-6 sm:pt-8">
      <div className="container space-y-16">
        <HeroCarousel slides={[...heroSlides]} />

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-card sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
              Premium Retail Direction
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold text-white sm:text-4xl">
              Dark luxury storefront built around sneakers, layers, and fast checkout.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
              The experience mirrors a high-energy sneaker retailer with bold imagery,
              featured drops, price callouts, and a friction-light cart and checkout flow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/collections/all?sort=latest">
                  Explore All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/collections/footwear">Shop Footwear</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {trustPoints.map((point) => {
              const Icon = point.icon;

              return (
                <div
                  key={point.title}
                  className="rounded-[1.75rem] border border-white/10 bg-slateGlow-900/80 p-5 shadow-card"
                >
                  <div className="inline-flex rounded-full border border-brand-300/20 bg-brand-400/10 p-3 text-brand-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{point.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <ProductRail
          title="Featured Products"
          eyebrow="Editor Picks"
          products={featuredProducts}
        />

        <CategoryGrid categories={categoryCards} />

        <ProductRail
          title="Latest Arrivals"
          eyebrow="Just Landed"
          products={latestProducts}
        />
      </div>
    </main>
  );
}
