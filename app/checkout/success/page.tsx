import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type CheckoutSuccessPageProps = {
  searchParams: {
    order?: string;
  };
};

export default function CheckoutSuccessPage({
  searchParams
}: CheckoutSuccessPageProps) {
  return (
    <main className="container flex min-h-[70vh] items-center justify-center py-16">
      <section className="max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center shadow-card sm:p-12">
        <div className="mx-auto inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-100">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h1 className="mt-6 text-4xl font-semibold text-white">Order confirmed</h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          Your order has been successfully placed and is now being prepared for
          processing.
          {searchParams.order ? ` Order number: ${searchParams.order}.` : ""}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/collections/all">Continue Shopping</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/account">View Account</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
