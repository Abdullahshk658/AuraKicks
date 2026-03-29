import { BatchType, OrderStatus, PaymentMethod, ProductCategory } from "@prisma/client";

export type MockVariant = {
  id: string;
  size: string;
  color: string;
  stockQuantity: number;
  image?: string;
};

export type MockProduct = {
  id: string;
  slug: string;
  sku: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  batchType: BatchType;
  category: ProductCategory;
  subCategory: string;
  images: string[];
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
  variants: MockVariant[];
  createdAt: string;
};

export type MockOrder = {
  id: string;
  orderNumber: string;
  userId?: string | null;
  totalAmount: number;
  subtotalAmount: number;
  shippingAmount: number;
  discountAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  contactEmail: string;
  contactPhone: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    city: string;
    area: string;
    addressLine1: string;
    postalCode: string;
  };
  items: Array<{
    id: string;
    productId: string;
    variantId?: string;
    quantity: number;
    price: number;
    productTitle: string;
    productImage: string;
    size?: string;
    color?: string;
  }>;
  createdAt: string;
};

export const heroSlides = [
  {
    id: "hero-1",
    eyebrow: "New Arrival Edit",
    title: "The premium sneaker drop built for statement rotations.",
    description:
      "Jordan, Dunk, Yeezy, and New Balance grails curated with a dark luxury retail finish.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80",
    href: "/collections/footwear"
  },
  {
    id: "hero-2",
    eyebrow: "Streetwear Layers",
    title: "Oversized hoodies, jackets, and essentials for the full fit.",
    description:
      "Premium textures, elevated silhouettes, and Pakistan-ready shipping with nationwide delivery.",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1600&q=80",
    href: "/collections/clothing"
  },
  {
    id: "hero-3",
    eyebrow: "Cash On Delivery",
    title: "Shop fast, pay secure, and finish with fragrances and accessories.",
    description:
      "A complete lifestyle storefront with Stripe checkout for cards and COD for the local market.",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1600&q=80",
    href: "/collections/accessories"
  }
] as const;

export const categoryCards = [
  {
    title: "Footwear",
    description: "Sneakers, slides, runners, and performance silhouettes.",
    href: "/collections/footwear",
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Streetwear",
    description: "Hoodies, tees, jackets, and oversized essentials.",
    href: "/collections/clothing",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Accessories",
    description: "Crossbody bags, caps, socks, and finishing details.",
    href: "/collections/accessories",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Perfumes",
    description: "Luxury-inspired scents designed to complete the fit.",
    href: "/collections/perfumes",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80"
  }
] as const;

export const shippingPolicySections = [
  "Orders are processed within 24 to 48 hours and dispatched nationwide through trusted courier partners.",
  "Karachi, Lahore, and Islamabad orders usually arrive within 2 to 4 working days. Other cities typically arrive within 3 to 6 working days.",
  "Cash on Delivery orders are confirmed by phone or WhatsApp before dispatch. Unconfirmed orders may be delayed or cancelled."
] as const;

export const sizeGuideSections = [
  "Nike and Jordan pairs generally fit true to size. If you are between sizes, choose the larger option for extra comfort.",
  "Slides and foam-based silhouettes can feel snug initially. A half size up is recommended for wider feet.",
  "Apparel follows an oversized streetwear fit. Review the product description for silhouette notes before ordering."
] as const;

export const mockProductsSeed: MockProduct[] = [
  {
    id: "prod-aj1-mocha",
    slug: "air-jordan-1-retro-high-mocha",
    sku: "HK-AJ1-MOCHA",
    title: "Air Jordan 1 Retro High Mocha",
    description:
      "A premium dark neutral rotation built with buttery mocha overlays, crisp sail panels, and a clean high-cut shape that anchors everyday styling. This pair is finished with padded collar support, detailed stitching, and a structure tuned for long hours on-foot.",
    shortDescription: "Premium mocha high-top with a sharp leather finish and classic Jordan stance.",
    price: 34990,
    compareAtPrice: 41990,
    batchType: BatchType.PREMIUM_PLUS_BATCH,
    category: ProductCategory.FOOTWEAR,
    subCategory: "Sneakers",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80"
    ],
    isFeatured: true,
    isActive: true,
    tags: ["Jordan", "High Top", "Mocha", "Premium"],
    variants: [
      { id: "var-aj1-41", size: "41", color: "Mocha", stockQuantity: 5 },
      { id: "var-aj1-42", size: "42", color: "Mocha", stockQuantity: 8 },
      { id: "var-aj1-43", size: "43", color: "Mocha", stockQuantity: 6 }
    ],
    createdAt: "2026-03-24T11:00:00.000Z"
  },
  {
    id: "prod-dunk-panda",
    slug: "nike-dunk-low-panda",
    sku: "HK-DUNK-PANDA",
    title: "Nike Dunk Low Panda",
    description:
      "The cleanest daily rotation in the catalogue, balancing black overlays and crisp white leather with a low-cut profile that fits everything from cargos to denim. Built for versatile wear with accurate panel placement and balanced cushioning.",
    shortDescription: "The iconic black-and-white Dunk built for everyday wear.",
    price: 18990,
    compareAtPrice: 22990,
    batchType: BatchType.DOT_PERFECT,
    category: ProductCategory.FOOTWEAR,
    subCategory: "Sneakers",
    images: [
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=80"
    ],
    isFeatured: true,
    isActive: true,
    tags: ["Nike", "Dunk", "Low Top", "Monochrome"],
    variants: [
      { id: "var-dunk-40", size: "40", color: "Black/White", stockQuantity: 9 },
      { id: "var-dunk-41", size: "41", color: "Black/White", stockQuantity: 10 },
      { id: "var-dunk-42", size: "42", color: "Black/White", stockQuantity: 7 }
    ],
    createdAt: "2026-03-28T10:30:00.000Z"
  },
  {
    id: "prod-yeezy-slide",
    slug: "yeezy-slide-onyx",
    sku: "HK-YZY-SLIDE-ONYX",
    title: "Yeezy Slide Onyx",
    description:
      "Minimal, sculpted, and comfort-first, the Onyx slide lands with dense foam support and an understated matte finish. It is the easiest warm-weather option in the collection and pairs cleanly with socks or bare-foot styling.",
    shortDescription: "Soft foam comfort with the signature Yeezy one-piece look.",
    price: 14990,
    compareAtPrice: 17990,
    batchType: BatchType.ONE_TO_ONE,
    category: ProductCategory.FOOTWEAR,
    subCategory: "Slides",
    images: [
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=900&q=80"
    ],
    isFeatured: true,
    isActive: true,
    tags: ["Yeezy", "Slides", "Comfort", "Onyx"],
    variants: [
      { id: "var-slide-40", size: "40", color: "Onyx", stockQuantity: 8 },
      { id: "var-slide-41", size: "41", color: "Onyx", stockQuantity: 8 },
      { id: "var-slide-43", size: "43", color: "Onyx", stockQuantity: 5 }
    ],
    createdAt: "2026-03-22T14:00:00.000Z"
  },
  {
    id: "prod-nb-9060",
    slug: "new-balance-9060-sea-salt",
    sku: "HK-NB-9060-SS",
    title: "New Balance 9060 Sea Salt",
    description:
      "A chunkier retro-runner expression with layered mesh, suede depth, and exaggerated sole geometry that feels technical without losing comfort. Sea Salt keeps the palette refined and elevated across day and night fits.",
    shortDescription: "A plush retro-runner with layered suede and strong lifestyle energy.",
    price: 26990,
    compareAtPrice: 31990,
    batchType: BatchType.HOP_BATCH,
    category: ProductCategory.FOOTWEAR,
    subCategory: "Sports",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80"
    ],
    isFeatured: false,
    isActive: true,
    tags: ["New Balance", "9060", "Runner", "Sea Salt"],
    variants: [
      { id: "var-9060-41", size: "41", color: "Sea Salt", stockQuantity: 4 },
      { id: "var-9060-42", size: "42", color: "Sea Salt", stockQuantity: 5 },
      { id: "var-9060-44", size: "44", color: "Sea Salt", stockQuantity: 3 }
    ],
    createdAt: "2026-03-27T12:45:00.000Z"
  },
  {
    id: "prod-hoodie-essentials",
    slug: "essentials-pullover-hoodie-taupe",
    sku: "HK-ESS-HOOD-TAUPE",
    title: "Essentials Pullover Hoodie Taupe",
    description:
      "Heavyweight fleece warmth with a softly structured hood, dropped shoulders, and minimal front branding. This taupe colourway keeps the layer understated while still reading premium in low light and neutral outfits.",
    shortDescription: "Heavyweight fleece hoodie with oversized drape and refined neutral tone.",
    price: 11990,
    compareAtPrice: 14990,
    batchType: BatchType.PREMIUM_PLUS_BATCH,
    category: ProductCategory.CLOTHING,
    subCategory: "Hoodies",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"
    ],
    isFeatured: true,
    isActive: true,
    tags: ["Essentials", "Hoodie", "Oversized", "Taupe"],
    variants: [
      { id: "var-hoodie-m", size: "M", color: "Taupe", stockQuantity: 7 },
      { id: "var-hoodie-l", size: "L", color: "Taupe", stockQuantity: 9 },
      { id: "var-hoodie-xl", size: "XL", color: "Taupe", stockQuantity: 4 }
    ],
    createdAt: "2026-03-26T09:15:00.000Z"
  },
  {
    id: "prod-jacket-nocta",
    slug: "nocta-puffer-jacket-black",
    sku: "HK-NOCTA-PUFF-BLK",
    title: "NOCTA Puffer Jacket Black",
    description:
      "A dense insulated shell finished in deep black with a reflective premium hand feel. It delivers volume without looking bulky and works especially well for night drives, airport fits, and layered winter styling.",
    shortDescription: "Insulated black puffer with elevated streetwear styling.",
    price: 17990,
    compareAtPrice: 22990,
    batchType: BatchType.DOT_PERFECT,
    category: ProductCategory.CLOTHING,
    subCategory: "Jackets",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
    ],
    isFeatured: false,
    isActive: true,
    tags: ["NOCTA", "Puffer", "Jacket", "Black"],
    variants: [
      { id: "var-jacket-m", size: "M", color: "Black", stockQuantity: 3 },
      { id: "var-jacket-l", size: "L", color: "Black", stockQuantity: 5 }
    ],
    createdAt: "2026-03-25T08:20:00.000Z"
  },
  {
    id: "prod-tee-logo",
    slug: "street-logo-oversized-tee-off-white",
    sku: "HK-TEE-LOGO-OW",
    title: "Street Logo Oversized Tee Off White",
    description:
      "Midweight jersey cotton cut with a boxy oversized profile, dropped sleeves, and a soft off-white base that works across monochrome and earth-tone fits. Finished with a front-and-back graphic lockup and clean collar construction.",
    shortDescription: "A boxy logo tee built as the everyday base layer.",
    price: 6490,
    compareAtPrice: 7990,
    batchType: BatchType.HOP_BATCH,
    category: ProductCategory.CLOTHING,
    subCategory: "Tees",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"
    ],
    isFeatured: false,
    isActive: true,
    tags: ["Tee", "Oversized", "Logo", "Off White"],
    variants: [
      { id: "var-tee-m", size: "M", color: "Off White", stockQuantity: 11 },
      { id: "var-tee-l", size: "L", color: "Off White", stockQuantity: 8 },
      { id: "var-tee-xl", size: "XL", color: "Off White", stockQuantity: 5 }
    ],
    createdAt: "2026-03-29T06:15:00.000Z"
  },
  {
    id: "prod-bag-crossbody",
    slug: "utility-crossbody-bag-black",
    sku: "HK-BAG-UTILITY-BLK",
    title: "Utility Crossbody Bag Black",
    description:
      "Compact urban carry with adjustable strap length, quick-access front pocket, and a matte technical fabric finish that holds its shape. Built to pair with streetwear fits without overpowering the outfit.",
    shortDescription: "A compact crossbody with technical fabric and clean utility layout.",
    price: 5490,
    compareAtPrice: 6990,
    batchType: BatchType.HOP_BATCH,
    category: ProductCategory.ACCESSORIES,
    subCategory: "Bags",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80"
    ],
    isFeatured: true,
    isActive: true,
    tags: ["Accessory", "Bag", "Crossbody", "Black"],
    variants: [{ id: "var-bag-os", size: "One Size", color: "Black", stockQuantity: 14 }],
    createdAt: "2026-03-21T15:30:00.000Z"
  },
  {
    id: "prod-women-samba",
    slug: "women-samba-cloud-white",
    sku: "HK-W-SAMBA-WHT",
    title: "Women Samba Cloud White",
    description:
      "A sleek women’s low-profile classic with soft white leather, tonal suede at the toe, and a streamlined gum sole finish. Designed for easy all-day styling across denim, wide-leg trousers, and relaxed tailoring.",
    shortDescription: "Clean women’s low-top styling with a crisp gum sole finish.",
    price: 15990,
    compareAtPrice: 19990,
    batchType: BatchType.ONE_TO_ONE,
    category: ProductCategory.WOMEN,
    subCategory: "Sneakers",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80"
    ],
    isFeatured: true,
    isActive: true,
    tags: ["Women", "Samba", "Low Top", "Cloud White"],
    variants: [
      { id: "var-samba-37", size: "37", color: "Cloud White", stockQuantity: 6 },
      { id: "var-samba-38", size: "38", color: "Cloud White", stockQuantity: 7 },
      { id: "var-samba-39", size: "39", color: "Cloud White", stockQuantity: 4 }
    ],
    createdAt: "2026-03-23T13:40:00.000Z"
  },
  {
    id: "prod-kids-j4",
    slug: "kids-jordan-4-thunder",
    sku: "HK-K-J4-THUNDER",
    title: "Kids Jordan 4 Thunder",
    description:
      "Scaled-down Jordan energy with bright yellow contrast, structured side cages, and all the attitude of the original. Built to handle daily wear while still turning heads on weekends and family events.",
    shortDescription: "Mini grail energy with bold yellow contrast and Jordan heritage.",
    price: 13990,
    compareAtPrice: 16990,
    batchType: BatchType.DOT_PERFECT,
    category: ProductCategory.KIDS,
    subCategory: "Sneakers",
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80"
    ],
    isFeatured: false,
    isActive: true,
    tags: ["Kids", "Jordan 4", "Thunder", "GS"],
    variants: [
      { id: "var-kj4-31", size: "31", color: "Black/Yellow", stockQuantity: 4 },
      { id: "var-kj4-32", size: "32", color: "Black/Yellow", stockQuantity: 4 },
      { id: "var-kj4-33", size: "33", color: "Black/Yellow", stockQuantity: 3 }
    ],
    createdAt: "2026-03-20T10:15:00.000Z"
  },
  {
    id: "prod-perfume-oud",
    slug: "amber-oud-reserve-edp",
    sku: "HK-PERF-AMBR-OUD",
    title: "Amber Oud Reserve EDP",
    description:
      "A rich fragrance blend opening with saffron and warm spice before moving into amber woods and a smooth musky base. It wears especially well in evening settings and adds a polished close to layered fits.",
    shortDescription: "Warm amber woods and saffron in a long-wearing evening profile.",
    price: 8990,
    compareAtPrice: 10990,
    batchType: BatchType.HOP_BATCH,
    category: ProductCategory.PERFUMES,
    subCategory: "Fragrance",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1619994403073-2cecaa3de4bd?auto=format&fit=crop&w=900&q=80"
    ],
    isFeatured: true,
    isActive: true,
    tags: ["Perfume", "Amber", "Oud", "Evening"],
    variants: [{ id: "var-oud-100", size: "100ml", color: "Amber", stockQuantity: 12 }],
    createdAt: "2026-03-29T07:10:00.000Z"
  }
];

export const mockOrdersSeed: MockOrder[] = [
  {
    id: "ord-demo-1",
    orderNumber: "HK-20260329-1001",
    totalAmount: 35989,
    subtotalAmount: 34990,
    shippingAmount: 999,
    discountAmount: 0,
    status: OrderStatus.PROCESSING,
    paymentMethod: PaymentMethod.COD,
    contactEmail: "customer.one@example.com",
    contactPhone: "+92 300 1234567",
    shippingAddress: {
      firstName: "Ali",
      lastName: "Khan",
      city: "Karachi",
      area: "DHA Phase 6",
      addressLine1: "Street 12, Khayaban-e-Bukhari",
      postalCode: "75500"
    },
    items: [
      {
        id: "ord-item-1",
        productId: "prod-aj1-mocha",
        variantId: "var-aj1-42",
        quantity: 1,
        price: 34990,
        productTitle: "Air Jordan 1 Retro High Mocha",
        productImage:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
        size: "42",
        color: "Mocha"
      }
    ],
    createdAt: "2026-03-29T02:10:00.000Z"
  },
  {
    id: "ord-demo-2",
    orderNumber: "HK-20260329-1002",
    totalAmount: 18489,
    subtotalAmount: 17990,
    shippingAmount: 499,
    discountAmount: 0,
    status: OrderStatus.PAID,
    paymentMethod: PaymentMethod.STRIPE,
    contactEmail: "customer.two@example.com",
    contactPhone: "+92 321 9876543",
    shippingAddress: {
      firstName: "Sara",
      lastName: "Ahmed",
      city: "Lahore",
      area: "Gulberg",
      addressLine1: "Main Boulevard Block M",
      postalCode: "54000"
    },
    items: [
      {
        id: "ord-item-2",
        productId: "prod-jacket-nocta",
        variantId: "var-jacket-l",
        quantity: 1,
        price: 17990,
        productTitle: "NOCTA Puffer Jacket Black",
        productImage:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
        size: "L",
        color: "Black"
      }
    ],
    createdAt: "2026-03-28T16:45:00.000Z"
  }
];

let mockProducts = [...mockProductsSeed];
let mockOrders = [...mockOrdersSeed];

export function getMockProducts() {
  return mockProducts;
}

export function getMockOrders() {
  return mockOrders;
}

export function addMockProduct(product: MockProduct) {
  mockProducts = [product, ...mockProducts];
  return product;
}

export function addMockOrder(order: MockOrder) {
  mockOrders = [order, ...mockOrders];
  return order;
}
