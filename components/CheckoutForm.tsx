"use client";

import { PaymentMethod } from "@prisma/client";
import { Loader2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/formatPrice";

type CheckoutPayload = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  city: string;
  area: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  notes: string;
  paymentMethod: PaymentMethod;
};

const checkoutSteps = [
  "Contact Info",
  "Shipping Address",
  "Payment Method"
] as const;

type CheckoutFormProps = {
  stripeEnabled: boolean;
};

export function CheckoutForm({ stripeEnabled }: CheckoutFormProps) {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore((state) => ({
    items: state.items,
    subtotal: state.subtotal,
    clearCart: state.clearCart
  }));
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [payload, setPayload] = useState<CheckoutPayload>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    city: "",
    area: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    notes: "",
    paymentMethod: PaymentMethod.COD
  });

  const shipping = subtotal >= 25000 ? 0 : 499;
  const total = subtotal + shipping;

  const updateField = (key: keyof CheckoutPayload, value: string) => {
    setPayload((current) => ({ ...current, [key]: value }));
  };

  const validateStep = () => {
    if (step === 0) {
      return payload.email && payload.phone;
    }

    if (step === 1) {
      return (
        payload.firstName &&
        payload.lastName &&
        payload.city &&
        payload.area &&
        payload.addressLine1 &&
        payload.postalCode
      );
    }

    return true;
  };

  const handleSubmit = async () => {
    if (items.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contactEmail: payload.email,
          contactPhone: payload.phone,
          shippingAddress: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            city: payload.city,
            area: payload.area,
            addressLine1: payload.addressLine1,
            addressLine2: payload.addressLine2,
            postalCode: payload.postalCode
          },
          notes: payload.notes,
          paymentMethod: payload.paymentMethod,
          items
        })
      });

      const result = (await response.json()) as {
        error?: string;
        orderNumber?: string;
        checkoutUrl?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? "Checkout failed.");
      }

      if (result.checkoutUrl) {
        window.location.assign(result.checkoutUrl);
        return;
      }

      clearCart();
      router.push(`/checkout/success?order=${result.orderNumber ?? ""}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to process checkout."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap gap-3">
          {checkoutSteps.map((label, index) => (
            <div
              key={label}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${
                index === step
                  ? "border-brand-300/40 bg-brand-400/10 text-white"
                  : "border-white/10 bg-white/5 text-zinc-400"
              }`}
            >
              {index + 1}. {label}
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-6">
          {step === 0 ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Email</label>
                  <Input
                    type="email"
                    value={payload.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Phone</label>
                  <Input
                    type="tel"
                    value={payload.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder="+92 300 1234567"
                  />
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slateGlow-800/70 p-4 text-sm leading-7 text-zinc-400">
                We use your contact information for order verification, shipping updates,
                and COD confirmation where applicable.
              </div>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">First Name</label>
                  <Input
                    value={payload.firstName}
                    onChange={(event) => updateField("firstName", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Last Name</label>
                  <Input
                    value={payload.lastName}
                    onChange={(event) => updateField("lastName", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">City</label>
                  <Input
                    value={payload.city}
                    onChange={(event) => updateField("city", event.target.value)}
                    placeholder="Karachi"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Area</label>
                  <Input
                    value={payload.area}
                    onChange={(event) => updateField("area", event.target.value)}
                    placeholder="DHA, Gulberg, Bahria Town..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Address Line 1</label>
                <Input
                  value={payload.addressLine1}
                  onChange={(event) => updateField("addressLine1", event.target.value)}
                  placeholder="House / apartment / street"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Address Line 2</label>
                <Input
                  value={payload.addressLine2}
                  onChange={(event) => updateField("addressLine2", event.target.value)}
                  placeholder="Landmark or optional details"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Postal Code</label>
                <Input
                  value={payload.postalCode}
                  onChange={(event) => updateField("postalCode", event.target.value)}
                />
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <div className="grid gap-4">
                <button
                  type="button"
                  onClick={() => updateField("paymentMethod", PaymentMethod.COD)}
                  className={`rounded-3xl border p-5 text-left transition ${
                    payload.paymentMethod === PaymentMethod.COD
                      ? "border-brand-300/40 bg-brand-400/10"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <p className="text-base font-semibold text-white">Cash on Delivery</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Confirm by phone and pay at your doorstep. Best fit for local
                    Pakistani checkout expectations.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => updateField("paymentMethod", PaymentMethod.STRIPE)}
                  disabled={!stripeEnabled}
                  className={`rounded-3xl border p-5 text-left transition ${
                    payload.paymentMethod === PaymentMethod.STRIPE
                      ? "border-brand-300/40 bg-brand-400/10"
                      : "border-white/10 bg-white/[0.03]"
                  } ${!stripeEnabled ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <p className="text-base font-semibold text-white">Pay with Stripe</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Hosted secure card checkout. {stripeEnabled
                      ? "You will be redirected to Stripe to complete payment."
                      : "Stripe keys are not configured in this environment."}
                  </p>
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Order Notes</label>
                <Textarea
                  value={payload.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder="Delivery instructions, call timing, or landmark details."
                />
              </div>
            </>
          ) : null}

          {errorMessage ? (
            <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
              {errorMessage}
            </div>
          ) : null}

          <div className="flex flex-wrap justify-between gap-3">
            <Button
              variant="secondary"
              onClick={() => setStep((current) => Math.max(0, current - 1))}
              disabled={step === 0 || isSubmitting}
            >
              Back
            </Button>

            {step < checkoutSteps.length - 1 ? (
              <Button onClick={() => validateStep() && setStep((current) => current + 1)}>
                Continue
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting || !validateStep()}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            )}
          </div>
        </div>
      </section>

      <aside className="rounded-[2rem] border border-white/10 bg-slateGlow-900/80 p-6 shadow-card sm:p-8 lg:sticky lg:top-28 lg:self-start">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-brand-200" />
          <p className="text-sm font-medium text-zinc-300">
            Secure checkout with COD and Stripe support
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.lineId}
              className="flex items-start justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {item.variant?.size ? `Size ${item.variant.size}` : "One Size"}
                  {item.variant?.color ? ` • ${item.variant.color}` : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <p className="mt-1 text-xs text-zinc-500">Qty {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm">
          <div className="flex justify-between text-zinc-400">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-white">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
