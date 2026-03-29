import { BatchType, ProductCategory, Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { createProduct } from "@/lib/storefront";

const createProductSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(20),
  shortDescription: z.string().min(10),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().nullable().optional(),
  batchType: z.nativeEnum(BatchType),
  category: z.nativeEnum(ProductCategory),
  subCategory: z.string().min(2),
  images: z.array(z.string().url()).min(1),
  isFeatured: z.boolean(),
  tags: z.array(z.string()).min(1),
  variants: z
    .array(
      z.object({
        size: z.string().min(1),
        color: z.string().min(1),
        stockQuantity: z.number().int().nonnegative(),
        image: z.string().optional()
      })
    )
    .min(1)
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== Role.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = createProductSchema.parse(await request.json());
    const product = await createProduct({
      ...body,
      compareAtPrice: body.compareAtPrice ?? null,
      variants: body.variants.map((variant, index) => ({
        id: `${body.slug}-variant-${index + 1}`,
        size: variant.size,
        color: variant.color,
        stockQuantity: variant.stockQuantity,
        image: variant.image
      }))
    });

    return NextResponse.json({ id: product.id, title: product.title });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create product." },
      { status: 500 }
    );
  }
}
