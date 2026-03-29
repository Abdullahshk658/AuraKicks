import { NextResponse } from "next/server";

import { getAllProducts, getCategoryFromSlug } from "@/lib/storefront";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const products = await getAllProducts({
    category: searchParams.get("category")
      ? getCategoryFromSlug(searchParams.get("category")!)
      : undefined,
    query: searchParams.get("q") ?? undefined,
    sort:
      (searchParams.get("sort") as "latest" | "price-asc" | "price-desc" | "featured" | null) ??
      undefined,
    batch: searchParams.get("batch") ?? undefined,
    subCategory: searchParams.get("subCategory") ?? undefined,
    featured: searchParams.get("featured") === "true"
  });

  return NextResponse.json({ products });
}
