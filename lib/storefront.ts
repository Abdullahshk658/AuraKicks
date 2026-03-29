import {
  BatchType,
  OrderStatus,
  PaymentMethod,
  ProductCategory,
  type Prisma
} from "@prisma/client";

import {
  addMockOrder,
  addMockProduct,
  getMockOrders,
  getMockProducts,
  type MockOrder,
  type MockProduct
} from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";

export type CollectionSlug =
  | "all"
  | "footwear"
  | "clothing"
  | "accessories"
  | "women"
  | "kids"
  | "perfumes";

export type StorefrontVariant = {
  id: string;
  size: string;
  color: string;
  stockQuantity: number;
  image?: string;
};

export type StorefrontProduct = {
  id: string;
  slug: string;
  sku?: string | null;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number | null;
  batchType: "Premium Plus Batch" | "Dot Perfect" | "1:1" | "HOP Batch";
  batchTypeValue: BatchType;
  category: CollectionSlug;
  categoryLabel: string;
  subCategory: string;
  images: string[];
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
  variants: StorefrontVariant[];
  createdAt: string;
};

export type ProductFilters = {
  category?: CollectionSlug;
  featured?: boolean;
  latest?: boolean;
  query?: string;
  batch?: string;
  subCategory?: string;
  sort?: "latest" | "price-asc" | "price-desc" | "featured";
};

export type ShippingAddress = {
  firstName: string;
  lastName: string;
  city: string;
  area: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
};

export type CheckoutLineItem = {
  productId: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  variant?: {
    id?: string | null;
    size?: string | null;
    color?: string | null;
  };
};

export type CreateOrderInput = {
  userId?: string;
  contactEmail: string;
  contactPhone: string;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  notes?: string;
  items: CheckoutLineItem[];
  stripePaymentIntentId?: string | null;
};

export type StorefrontOrder = {
  id: string;
  orderNumber: string;
  totalAmount: number;
  subtotalAmount: number;
  shippingAmount: number;
  discountAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  contactEmail: string;
  contactPhone: string;
  shippingAddress: ShippingAddress;
  createdAt: string;
  items: Array<{
    id: string;
    productId: string;
    variantId?: string | null;
    quantity: number;
    price: number;
    productTitle: string;
    productImage: string;
    size?: string | null;
    color?: string | null;
  }>;
};

export type CreateProductInput = {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number | null;
  batchType: BatchType;
  category: ProductCategory;
  subCategory: string;
  images: string[];
  isFeatured: boolean;
  tags: string[];
  variants: StorefrontVariant[];
};

const categoryToSlug: Record<ProductCategory, CollectionSlug> = {
  FOOTWEAR: "footwear",
  CLOTHING: "clothing",
  ACCESSORIES: "accessories",
  WOMEN: "women",
  KIDS: "kids",
  PERFUMES: "perfumes"
};

const slugToCategory: Partial<Record<CollectionSlug, ProductCategory>> = {
  footwear: ProductCategory.FOOTWEAR,
  clothing: ProductCategory.CLOTHING,
  accessories: ProductCategory.ACCESSORIES,
  women: ProductCategory.WOMEN,
  kids: ProductCategory.KIDS,
  perfumes: ProductCategory.PERFUMES
};

const categoryLabels: Record<CollectionSlug, string> = {
  all: "All Products",
  footwear: "Footwear",
  clothing: "Clothing",
  accessories: "Accessories",
  women: "Women",
  kids: "Kids",
  perfumes: "Perfumes"
};

const batchLabels: Record<BatchType, StorefrontProduct["batchType"]> = {
  PREMIUM_PLUS_BATCH: "Premium Plus Batch",
  DOT_PERFECT: "Dot Perfect",
  ONE_TO_ONE: "1:1",
  HOP_BATCH: "HOP Batch"
};

const batchLookup = Object.entries(batchLabels).reduce<Record<string, BatchType>>(
  (accumulator, [enumValue, label]) => {
    accumulator[label] = enumValue as BatchType;
    return accumulator;
  },
  {}
);

const SHIPPING_FLAT_RATE = 499;
const FREE_SHIPPING_THRESHOLD = 25000;

function normalizeProduct(product: MockProduct): StorefrontProduct;
function normalizeProduct(
  product: Prisma.ProductGetPayload<{ include: { variants: true } }>
): StorefrontProduct;
function normalizeProduct(
  product:
    | MockProduct
    | Prisma.ProductGetPayload<{
        include: { variants: true };
      }>
): StorefrontProduct {
  const category = categoryToSlug[product.category];

  return {
    id: product.id,
    slug: product.slug,
    sku: product.sku ?? null,
    title: product.title,
    description: product.description,
    shortDescription:
      "shortDescription" in product && typeof product.shortDescription === "string"
        ? product.shortDescription
        : product.description,
    price: Number(product.price),
    compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    batchType: batchLabels[product.batchType],
    batchTypeValue: product.batchType,
    category,
    categoryLabel: categoryLabels[category],
    subCategory: product.subCategory ?? "General",
    images: product.images,
    isFeatured: product.isFeatured,
    isActive: product.isActive,
    tags: product.tags,
    variants: product.variants.map((variant) => ({
      id: variant.id,
      size: variant.size,
      color: variant.color,
      stockQuantity: variant.stockQuantity,
      image: variant.image ?? undefined
    })),
    createdAt:
      "createdAt" in product && product.createdAt instanceof Date
        ? product.createdAt.toISOString()
        : String(product.createdAt)
  };
}

function normalizeOrder(order: MockOrder): StorefrontOrder;
function normalizeOrder(
  order: Prisma.OrderGetPayload<{ include: { items: true } }>
): StorefrontOrder;
function normalizeOrder(
  order:
    | MockOrder
    | Prisma.OrderGetPayload<{
        include: { items: true };
      }>
): StorefrontOrder {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    totalAmount: Number(order.totalAmount),
    subtotalAmount: Number(order.subtotalAmount),
    shippingAmount: Number(order.shippingAmount),
    discountAmount: Number(order.discountAmount),
    status: order.status,
    paymentMethod: order.paymentMethod,
    contactEmail: order.contactEmail,
    contactPhone: order.contactPhone,
    shippingAddress: order.shippingAddress as ShippingAddress,
    createdAt:
      "createdAt" in order && order.createdAt instanceof Date
        ? order.createdAt.toISOString()
        : String(order.createdAt),
    items: order.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      variantId: item.variantId ?? null,
      quantity: item.quantity,
      price: Number(item.price),
      productTitle: item.productTitle,
      productImage: item.productImage,
      size: item.size ?? null,
      color: item.color ?? null
    }))
  };
}

function sortProducts(products: StorefrontProduct[], sort?: ProductFilters["sort"]) {
  const nextProducts = [...products];

  switch (sort) {
    case "price-asc":
      return nextProducts.sort((a, b) => a.price - b.price);
    case "price-desc":
      return nextProducts.sort((a, b) => b.price - a.price);
    case "featured":
      return nextProducts.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    case "latest":
    default:
      return nextProducts.sort(
        (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      );
  }
}

function filterProducts(products: StorefrontProduct[], filters: ProductFilters = {}) {
  const query = filters.query?.trim().toLowerCase();

  return sortProducts(
    products.filter((product) => {
      const matchesCategory =
        !filters.category || filters.category === "all"
          ? true
          : product.category === filters.category;
      const matchesFeatured = filters.featured ? product.isFeatured : true;
      const matchesLatest = filters.latest
        ? new Date(product.createdAt).valueOf() >
          Date.now() - 1000 * 60 * 60 * 24 * 14
        : true;
      const matchesBatch = filters.batch
        ? product.batchType.toLowerCase() === filters.batch.toLowerCase()
        : true;
      const matchesSubCategory = filters.subCategory
        ? product.subCategory.toLowerCase() === filters.subCategory.toLowerCase()
        : true;
      const matchesQuery = query
        ? [product.title, product.description, product.subCategory, ...product.tags]
            .join(" ")
            .toLowerCase()
            .includes(query)
        : true;

      return (
        matchesCategory &&
        matchesFeatured &&
        matchesLatest &&
        matchesBatch &&
        matchesSubCategory &&
        matchesQuery
      );
    }),
    filters.sort
  );
}

async function withProductFallback<T>(
  callback: () => Promise<T>,
  fallback: () => T | Promise<T>
) {
  const database = prisma;

  if (!database) {
    return fallback();
  }

  try {
    return await callback();
  } catch {
    return fallback();
  }
}

function calculateShipping(subtotal: number) {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
}

export function getCategoryLabel(category: CollectionSlug) {
  return categoryLabels[category];
}

export function getCategoryFromSlug(category: string): CollectionSlug {
  const candidate = category.toLowerCase() as CollectionSlug;
  return candidate in categoryLabels ? candidate : "all";
}

export async function getAllProducts(filters: ProductFilters = {}) {
  return withProductFallback(
    async () => {
      const where: Prisma.ProductWhereInput = {
        isActive: true,
        ...(filters.category && filters.category !== "all"
          ? { category: slugToCategory[filters.category] }
          : {}),
        ...(filters.featured ? { isFeatured: true } : {}),
        ...(filters.batch ? { batchType: batchLookup[filters.batch] } : {}),
        ...(filters.subCategory ? { subCategory: filters.subCategory } : {}),
        ...(filters.query
          ? {
              OR: [
                { title: { contains: filters.query, mode: "insensitive" } },
                { description: { contains: filters.query, mode: "insensitive" } },
                { tags: { has: filters.query } }
              ]
            }
          : {})
      };

      const products = await prisma!.product.findMany({
        where,
        include: { variants: true }
      });

      return filterProducts(products.map(normalizeProduct), filters);
    },
    () => filterProducts(getMockProducts().map(normalizeProduct), filters)
  );
}

export async function getFeaturedProducts(limit = 8) {
  const products = await getAllProducts({ featured: true, sort: "featured" });
  return products.slice(0, limit);
}

export async function getLatestProducts(limit = 8) {
  const products = await getAllProducts({ sort: "latest" });
  return products.slice(0, limit);
}

export async function getProductBySlugOrId(identifier: string) {
  const products = await getAllProducts();
  return products.find((product) => product.slug === identifier || product.id === identifier);
}

export async function getRelatedProducts(product: StorefrontProduct, limit = 4) {
  const products = await getAllProducts({
    category: product.category,
    sort: "featured"
  });

  return products.filter((item) => item.id !== product.id).slice(0, limit);
}

export async function getOrders() {
  return withProductFallback(
    async () => {
      const orders = await prisma!.order.findMany({
        include: { items: true },
        orderBy: { createdAt: "desc" }
      });

      return orders.map(normalizeOrder);
    },
    () =>
      getMockOrders()
        .map(normalizeOrder)
        .sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
  );
}

export async function createProduct(input: CreateProductInput) {
  const productPayload = {
    title: input.title,
    slug: input.slug,
    sku: `HK-${input.slug.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}`,
    description: input.description,
    shortDescription: input.shortDescription,
    price: input.price,
    compareAtPrice: input.compareAtPrice ?? null,
    batchType: input.batchType,
    category: input.category,
    subCategory: input.subCategory,
    images: input.images,
    isFeatured: input.isFeatured,
    isActive: true,
    tags: input.tags
  };

  return withProductFallback(
    async () => {
      const createdProduct = await prisma!.product.create({
        data: {
          ...productPayload,
          variants: {
            create: input.variants.map((variant) => ({
              size: variant.size,
              color: variant.color,
              stockQuantity: variant.stockQuantity,
              image: variant.image
            }))
          }
        },
        include: { variants: true }
      });

      const category = categoryToSlug[createdProduct.category];

      return {
        id: createdProduct.id,
        slug: createdProduct.slug,
        sku: createdProduct.sku ?? null,
        title: createdProduct.title,
        description: createdProduct.description,
        shortDescription: input.shortDescription,
        price: Number(createdProduct.price),
        compareAtPrice: createdProduct.compareAtPrice
          ? Number(createdProduct.compareAtPrice)
          : null,
        batchType: batchLabels[createdProduct.batchType],
        batchTypeValue: createdProduct.batchType,
        category,
        categoryLabel: categoryLabels[category],
        subCategory: createdProduct.subCategory ?? input.subCategory,
        images: createdProduct.images,
        isFeatured: createdProduct.isFeatured,
        isActive: createdProduct.isActive,
        tags: createdProduct.tags,
        variants: createdProduct.variants.map((variant) => ({
          id: variant.id,
          size: variant.size,
          color: variant.color,
          stockQuantity: variant.stockQuantity,
          image: variant.image ?? undefined
        })),
        createdAt: createdProduct.createdAt.toISOString()
      } as StorefrontProduct;
    },
    () =>
      normalizeProduct(
        addMockProduct({
          id: `prod-${input.slug}`,
          ...productPayload,
          compareAtPrice: input.compareAtPrice ?? undefined,
          variants: input.variants,
          createdAt: new Date().toISOString()
        })
      )
  );
}

export async function createOrder(input: CreateOrderInput) {
  const subtotalAmount = input.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingAmount = calculateShipping(subtotalAmount);
  const totalAmount = subtotalAmount + shippingAmount;
  const orderNumber = `HK-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;

  return withProductFallback(
    async () => {
      const createdOrder = await prisma!.order.create({
        data: {
          orderNumber,
          userId: input.userId,
          totalAmount,
          subtotalAmount,
          shippingAmount,
          discountAmount: 0,
          status:
            input.paymentMethod === PaymentMethod.COD
              ? OrderStatus.PROCESSING
              : OrderStatus.PENDING,
          paymentMethod: input.paymentMethod,
          paymentIntentId: input.stripePaymentIntentId ?? null,
          contactEmail: input.contactEmail,
          contactPhone: input.contactPhone,
          shippingAddress: input.shippingAddress,
          notes: input.notes,
          items: {
            create: input.items.map((item) => ({
              productId: item.productId,
              variantId: item.variant?.id ?? null,
              quantity: item.quantity,
              price: item.price,
              productTitle: item.title,
              productImage: item.image,
              size: item.variant?.size ?? null,
              color: item.variant?.color ?? null
            }))
          }
        },
        include: { items: true }
      });

      return normalizeOrder(createdOrder);
    },
    () =>
      normalizeOrder(
        addMockOrder({
          id: `ord-${orderNumber.toLowerCase()}`,
          orderNumber,
          userId: input.userId,
          totalAmount,
          subtotalAmount,
          shippingAmount,
          discountAmount: 0,
          status:
            input.paymentMethod === PaymentMethod.COD
              ? OrderStatus.PROCESSING
              : OrderStatus.PENDING,
          paymentMethod: input.paymentMethod,
          contactEmail: input.contactEmail,
          contactPhone: input.contactPhone,
          shippingAddress: input.shippingAddress,
          items: input.items.map((item, index) => ({
            id: `ord-item-${index + 1}-${Date.now()}`,
            productId: item.productId,
            variantId: item.variant?.id ?? undefined,
            quantity: item.quantity,
            price: item.price,
            productTitle: item.title,
            productImage: item.image,
            size: item.variant?.size ?? undefined,
            color: item.variant?.color ?? undefined
          })),
          createdAt: new Date().toISOString()
        })
      )
  );
}

export function getCheckoutSummary(items: CheckoutLineItem[]) {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = calculateShipping(subtotal);
  return {
    subtotal,
    shipping,
    total: subtotal + shipping
  };
}
