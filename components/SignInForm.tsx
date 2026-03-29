"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SignInFormProps = {
  demoEmail: string;
  demoPassword: string;
  googleEnabled: boolean;
  callbackUrl: string;
};

export function SignInForm({
  demoEmail,
  demoPassword,
  googleEnabled,
  callbackUrl
}: SignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(demoEmail);
  const [password, setPassword] = useState(demoPassword);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCredentialsSignIn = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: false
    });

    setIsSubmitting(false);

    if (result?.error) {
      setErrorMessage("Incorrect email or password.");
      return;
    }

    router.push(result?.url ?? callbackUrl);
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl });
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-card sm:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-white">Sign in to continue</h1>
        <p className="text-sm leading-6 text-zinc-400">
          Use your customer account, Google, or the local demo admin credentials.
        </p>
      </div>

      <div className="mt-6 rounded-3xl border border-brand-300/20 bg-brand-400/10 p-4 text-sm text-brand-100">
        Demo admin for preview: {demoEmail} / {demoPassword}
      </div>

      <div className="mt-8 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Email</label>
          <Input value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {errorMessage ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
            {errorMessage}
          </div>
        ) : null}

        <div className="grid gap-3">
          <Button onClick={handleCredentialsSignIn} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in
              </>
            ) : (
              "Continue with Email"
            )}
          </Button>

          <Button
            variant="secondary"
            onClick={handleGoogleSignIn}
            disabled={!googleEnabled}
          >
            {googleEnabled ? "Continue with Google" : "Google Sign-In Unavailable"}
          </Button>
        </div>

        <p className="text-sm text-zinc-400">
          Need an account?{" "}
          <Link href="/account/register" className="text-brand-100 hover:text-brand-50">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
