"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/formatPrice";

export function CartDrawer() {
  const {
    isOpen,
    items,
    subtotal,
    itemCount,
    closeCart,
    incrementItem,
    decrementItem,
    removeItem
  } = useCartStore((state) => ({
    isOpen: state.isOpen,
    items: state.items,
    subtotal: state.subtotal,
    itemCount: state.itemCount,
    closeCart: state.closeCart,
    incrementItem: state.incrementItem,
    decrementItem: state.decrementItem,
    removeItem: state.removeItem
  }));

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeCart();
        }
      }}
    >
      <SheetContent side="right" className="w-full max-w-[420px] p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-white/10 px-6 py-5">
            <div className="flex items-center justify-between pr-12">
              <SheetTitle>Shopping Cart</SheetTitle>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
                {itemCount} item{itemCount === 1 ? "" : "s"}
              </span>
            </div>
            <SheetDescription>
              Review your selected pairs before moving to secure checkout.
            </SheetDescription>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <div className="rounded-full border border-white/10 bg-white/5 p-5">
                <ShoppingBag className="h-8 w-8 text-brand-200" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold">Your cart is empty</h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-400">
                Start adding premium pairs and apparel to unlock checkout.
              </p>
              <Button className="mt-8" onClick={closeCart}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5 scrollbar-hidden">
                {items.map((item) => (
                  <article
                    key={item.lineId}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-white/10 bg-slateGlow-800">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="line-clamp-2 text-sm font-semibold text-white">
                              {item.title}
                            </h4>
                            {item.batchType ? (
                              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-brand-200">
                                {item.batchType}
                              </p>
                            ) : null}
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.lineId)}
                            className="rounded-full border border-white/10 p-2 text-zinc-400 transition hover:border-red-400/40 hover:text-red-300"
                            aria-label={`Remove ${item.title} from cart`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-400">
                          {item.variant?.size ? (
                            <span className="rounded-full border border-white/10 px-3 py-1">
                              Size {item.variant.size}
                            </span>
                          ) : null}
                          {item.variant?.color ? (
                            <span className="rounded-full border border-white/10 px-3 py-1">
                              {item.variant.color}
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => decrementItem(item.lineId)}
                              className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-200 transition hover:bg-white/10"
                              aria-label={`Decrease quantity for ${item.title}`}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-6 text-center text-sm font-semibold text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => incrementItem(item.lineId)}
                              className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-200 transition hover:bg-white/10"
                              aria-label={`Increase quantity for ${item.title}`}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-semibold text-white">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            {item.compareAtPrice && item.compareAtPrice > item.price ? (
                              <p className="mt-1 text-xs text-zinc-500 line-through">
                                {formatPrice(item.compareAtPrice * item.quantity)}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="border-t border-white/10 bg-black/20 px-6 py-5">
                <div className="flex items-center justify-between text-sm text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-lg font-semibold text-white">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-zinc-500">
                  Shipping, taxes, and discounts are calculated at checkout.
                </p>
                <Separator className="my-5" />
                <SheetFooter>
                  <Button asChild className="w-full">
                    <Link href="/checkout" onClick={closeCart}>
                      Checkout
                    </Link>
                  </Button>
                  <Button variant="secondary" className="w-full" onClick={closeCart}>
                    Continue Shopping
                  </Button>
                </SheetFooter>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
