import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetails } from "@/components/ProductDetails";
import { ProductRail } from "@/components/ProductRail";
import { shippingPolicySections, sizeGuideSections } from "@/lib/mock-data";
import { getProductBySlugOrId, getRelatedProducts } from "@/lib/storefront";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlugOrId(params.id);

  if (!product) {
    return {
      title: "Product Not Found"
    };
  }

  return {
    title: product.title,
    description: product.shortDescription
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlugOrId(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product, 4);

  return (
    <main className="pb-24 pt-8">
      <div className="container space-y-16">
        <ProductDetails
          product={product}
          shippingPolicySections={shippingPolicySections}
          sizeGuideSections={sizeGuideSections}
        />

        <ProductRail
          title="You May Also Like"
          eyebrow="Related Picks"
          products={relatedProducts}
        />
      </div>
    </main>
  );
}
