import type { Metadata } from "next";
import Link from "next/link";

import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { getAllProducts, getCategoryFromSlug, getCategoryLabel } from "@/lib/storefront";

type CollectionPageProps = {
  params: {
    category: string;
  };
  searchParams: {
    q?: string;
    sort?: "latest" | "price-asc" | "price-desc" | "featured";
    batch?: string;
    subCategory?: string;
  };
};

export async function generateMetadata({
  params
}: CollectionPageProps): Promise<Metadata> {
  const category = getCategoryFromSlug(params.category);
  return {
    title: `${getCategoryLabel(category)} Collection`
  };
}

export default async function CollectionPage({
  params,
  searchParams
}: CollectionPageProps) {
  const category = getCategoryFromSlug(params.category);
  const products = await getAllProducts({
    category,
    query: searchParams.q,
    sort: searchParams.sort ?? "latest",
    batch: searchParams.batch,
    subCategory: searchParams.subCategory
  });

  const categoryLabel = getCategoryLabel(category);

  return (
    <main className="pb-24 pt-8">
      <div className="container space-y-10">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-card sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
            Collection View
          </p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-white">{categoryLabel}</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
                Browse premium sneakers, streetwear, and lifestyle products with batch
                filters, pricing sort, and quick add-to-cart actions.
              </p>
            </div>

            <form className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <input type="hidden" name="category" value={category} />
              <input
                name="q"
                defaultValue={searchParams.q}
                placeholder="Search products"
                className="h-11 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-zinc-500"
              />
              <select
                name="sort"
                defaultValue={searchParams.sort ?? "latest"}
                className="h-11 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white"
              >
                <option value="latest">Latest</option>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <select
                name="batch"
                defaultValue={searchParams.batch ?? ""}
                className="h-11 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white"
              >
                <option value="">All Batches</option>
                <option value="Premium Plus Batch">Premium Plus Batch</option>
                <option value="Dot Perfect">Dot Perfect</option>
                <option value="1:1">1:1</option>
                <option value="HOP Batch">HOP Batch</option>
              </select>
              <Button type="submit" className="w-full">
                Apply Filters
              </Button>
            </form>
          </div>
        </section>

        {products.length > 0 ? (
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        ) : (
          <section className="rounded-[2rem] border border-white/10 bg-slateGlow-900/70 p-10 text-center shadow-card">
            <h2 className="text-2xl font-semibold text-white">No products matched</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Try adjusting your search terms or reset filters to see the full
              collection.
            </p>
            <Button asChild className="mt-6">
              <Link href={`/collections/${category}`}>Reset Collection</Link>
            </Button>
          </section>
        )}
      </div>
    </main>
  );
}
