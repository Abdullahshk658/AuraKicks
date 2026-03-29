import { RegisterForm } from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-xl">
        <RegisterForm />
      </div>
    </main>
  );
}
