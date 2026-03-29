import { CheckoutForm } from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="pb-24 pt-8">
      <div className="container space-y-8">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-card sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
            Multi-Step Checkout
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Secure your order</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
            Complete contact details, shipping, and payment in a focused checkout flow
            built for both Stripe and Cash on Delivery.
          </p>
        </section>

        <CheckoutForm stripeEnabled={Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)} />
      </div>
    </main>
  );
}
