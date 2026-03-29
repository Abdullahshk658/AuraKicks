import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container flex min-h-[70vh] items-center justify-center py-16">
      <section className="max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center shadow-card sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          The page you were looking for does not exist or may have been moved.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Return Home</Link>
        </Button>
      </section>
    </main>
  );
}
