import { SignInForm } from "@/components/SignInForm";
import { demoAdminCredentials } from "@/lib/auth";

type SignInPageProps = {
  searchParams: {
    callbackUrl?: string;
  };
};

export default function SignInPage({ searchParams }: SignInPageProps) {
  return (
    <main className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-xl">
        <SignInForm
          demoEmail={demoAdminCredentials.email}
          demoPassword={demoAdminCredentials.password}
          googleEnabled={Boolean(
            process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
          )}
          callbackUrl={searchParams.callbackUrl ?? "/account"}
        />
      </div>
    </main>
  );
}
