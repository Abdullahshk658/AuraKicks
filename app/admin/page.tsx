import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { AdminProductForm } from "@/components/AdminProductForm";
import { authOptions } from "@/lib/auth";
import { getOrders, type StorefrontOrder } from "@/lib/storefront";
import { formatPrice } from "@/utils/formatPrice";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/account/sign-in?callbackUrl=/admin");
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/account");
  }

  const orders = await getOrders();

  return (
    <main className="container space-y-10 py-10">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
          Admin Dashboard
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Manage products and orders</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
          Use this protected dashboard to create new products, review order intake,
          and monitor payment methods across the storefront.
        </p>
      </section>

      <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
        <AdminProductForm />

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-card">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
              Latest Orders
            </p>
            <h2 className="text-3xl font-semibold text-white">Order stream</h2>
          </div>

          <div className="mt-8 space-y-4">
            {orders.map((order: StorefrontOrder) => (
              <article
                key={order.id}
                className="rounded-3xl border border-white/10 bg-slateGlow-900/80 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{order.orderNumber}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">
                      {order.paymentMethod} • {order.status}
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {formatPrice(order.totalAmount)}
                  </p>
                </div>

                <div className="mt-4 grid gap-2 text-sm text-zinc-400">
                  <p>
                    {order.contactEmail} • {order.contactPhone}
                  </p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.area}
                  </p>
                </div>

                <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-zinc-300">
                  {order.items.map((item: StorefrontOrder["items"][number]) => (
                    <div key={item.id} className="flex items-center justify-between gap-3">
                      <span>
                        {item.productTitle} x {item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
