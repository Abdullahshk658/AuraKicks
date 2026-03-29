"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartVariantSelection = {
  id?: string | null;
  size?: string | null;
  color?: string | null;
};

export type CartItem = {
  lineId: string;
  productId: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  compareAtPrice?: number | null;
  batchType?: string | null;
  quantity: number;
  maxQuantity: number;
  variant?: CartVariantSelection;
};

type AddCartItemInput = Omit<CartItem, "lineId"> & {
  lineId?: string;
};

type CartState = {
  isOpen: boolean;
  isHydrated: boolean;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: AddCartItemInput) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  incrementItem: (lineId: string) => void;
  decrementItem: (lineId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setHydrated: (value: boolean) => void;
};

function clampQuantity(quantity: number, maxQuantity: number) {
  return Math.max(1, Math.min(quantity, maxQuantity));
}

function calculateCartTotals(items: CartItem[]) {
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return {
    itemCount,
    subtotal
  };
}

function syncCart(items: CartItem[]) {
  return {
    items,
    ...calculateCartTotals(items)
  };
}

export function buildCartLineId(input: {
  productId: string;
  variantId?: string | null;
  size?: string | null;
  color?: string | null;
}) {
  return [
    input.productId,
    input.variantId ?? "default",
    input.size ?? "na",
    input.color ?? "na"
  ].join(":");
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      isHydrated: false,
      items: [],
      itemCount: 0,
      subtotal: 0,
      addItem: (item) => {
        const lineId =
          item.lineId ??
          buildCartLineId({
            productId: item.productId,
            variantId: item.variant?.id,
            size: item.variant?.size,
            color: item.variant?.color
          });

        const existingItem = get().items.find(
          (cartItem) => cartItem.lineId === lineId
        );

        if (existingItem) {
          const nextItems = get().items.map((cartItem) =>
            cartItem.lineId === lineId
              ? {
                  ...cartItem,
                  quantity: clampQuantity(
                    cartItem.quantity + item.quantity,
                    cartItem.maxQuantity
                  )
                }
              : cartItem
          );

          set({
            ...syncCart(nextItems),
            isOpen: true
          });

          return;
        }

        const nextItem: CartItem = {
          ...item,
          lineId,
          quantity: clampQuantity(item.quantity, item.maxQuantity)
        };

        set({
          ...syncCart([...get().items, nextItem]),
          isOpen: true
        });
      },
      removeItem: (lineId) => {
        const nextItems = get().items.filter((item) => item.lineId !== lineId);
        set(syncCart(nextItems));
      },
      updateQuantity: (lineId, quantity) => {
        const nextItems = get().items
          .map((item) =>
            item.lineId === lineId
              ? {
                  ...item,
                  quantity: clampQuantity(quantity, item.maxQuantity)
                }
              : item
          )
          .filter((item) => item.quantity > 0);

        set(syncCart(nextItems));
      },
      incrementItem: (lineId) => {
        const target = get().items.find((item) => item.lineId === lineId);

        if (!target) {
          return;
        }

        get().updateQuantity(lineId, target.quantity + 1);
      },
      decrementItem: (lineId) => {
        const target = get().items.find((item) => item.lineId === lineId);

        if (!target) {
          return;
        }

        if (target.quantity <= 1) {
          get().removeItem(lineId);
          return;
        }

        get().updateQuantity(lineId, target.quantity - 1);
      },
      clearCart: () => {
        set({
          items: [],
          itemCount: 0,
          subtotal: 0
        });
      },
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setHydrated: (value) => set({ isHydrated: value })
    }),
    {
      name: "hopkicks-cart-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        itemCount: state.itemCount,
        subtotal: state.subtotal
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      }
    }
  )
);
