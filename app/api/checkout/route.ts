import { PaymentMethod } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { createOrder, getCheckoutSummary } from "@/lib/storefront";
import { stripe } from "@/lib/stripe";

const checkoutSchema = z.object({
  contactEmail: z.string().email(),
  contactPhone: z.string().min(6),
  notes: z.string().optional(),
  paymentMethod: z.nativeEnum(PaymentMethod),
  shippingAddress: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    city: z.string().min(1),
    area: z.string().min(1),
    addressLine1: z.string().min(1),
    addressLine2: z.string().optional(),
    postalCode: z.string().min(1)
  }),
  items: z
    .array(
      z.object({
        productId: z.string(),
        title: z.string(),
        slug: z.string(),
        image: z.string().url(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
        variant: z
          .object({
            id: z.string().optional().nullable(),
            size: z.string().optional().nullable(),
            color: z.string().optional().nullable()
          })
          .optional()
      })
    )
    .min(1)
});

export async function POST(request: Request) {
  try {
    const body = checkoutSchema.parse(await request.json()) as z.infer<typeof checkoutSchema>;
    const session = await getServerSession(authOptions);
    const order = await createOrder({
      userId: session?.user?.id,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      shippingAddress: body.shippingAddress,
      notes: body.notes,
      paymentMethod: body.paymentMethod,
      items: body.items
    });

    if (body.paymentMethod === PaymentMethod.COD) {
      return NextResponse.json({
        orderNumber: order.orderNumber,
        status: order.status
      });
    }

    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured for this environment." },
        { status: 500 }
      );
    }

    const origin = new URL(request.url).origin;
    const summary = getCheckoutSummary(body.items);

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${origin}/checkout/success?order=${order.orderNumber}`,
      cancel_url: `${origin}/checkout/cancel`,
      customer_email: body.contactEmail,
      payment_method_types: ["card"],
      ...(summary.shipping > 0
        ? {
            shipping_options: [
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: {
                    amount: summary.shipping * 100,
                    currency: "pkr"
                  },
                  display_name: "Nationwide Delivery"
                }
              }
            ]
          }
        : {}),
      line_items: body.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "pkr",
          unit_amount: item.price * 100,
          product_data: {
            name: item.title,
            images: [item.image]
          }
        }
      }))
    });

    return NextResponse.json({
      orderNumber: order.orderNumber,
      checkoutUrl: checkoutSession.url
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed." },
      { status: 500 }
    );
  }
}
