import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function CheckoutCancelPage() {
  return (
    <main className="container flex min-h-[70vh] items-center justify-center py-16">
      <section className="max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center shadow-card sm:p-12">
        <h1 className="text-4xl font-semibold text-white">Checkout cancelled</h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          Your cart is still saved. Return whenever you are ready to complete the
          order.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/checkout">Return to Checkout</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/collections/all">Back to Store</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
