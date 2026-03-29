import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";

import { AccountActions } from "@/components/AccountActions";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <main className="container flex min-h-[70vh] items-center justify-center py-16">
        <section className="max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center shadow-card sm:p-12">
          <h1 className="text-4xl font-semibold text-white">Account access</h1>
          <p className="mt-4 text-base leading-7 text-zinc-400">
            Sign in to manage your profile, continue checkout, and access admin tools if
            you have the right permissions.
          </p>
          <Button asChild className="mt-8">
            <Link href="/account/sign-in">Sign In</Link>
          </Button>
        </section>
      </main>
    );
  }

  return (
    <main className="container py-16">
      <section className="max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-card sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
          My Account
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">
          Welcome back, {session.user.name ?? "Customer"}
        </h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slateGlow-900/80 p-5">
            <p className="text-sm text-zinc-500">Email</p>
            <p className="mt-2 text-lg font-semibold text-white">{session.user.email}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slateGlow-900/80 p-5">
            <p className="text-sm text-zinc-500">Role</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {session.user.role === Role.ADMIN ? "Administrator" : "Customer"}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <AccountActions isAdmin={session.user.role === Role.ADMIN} />
        </div>
      </section>
    </main>
  );
}
