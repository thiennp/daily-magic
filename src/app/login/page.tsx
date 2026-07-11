import { Suspense } from "react";

import LoginForm from "@/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <Suspense
        fallback={<div className="text-sm text-gray-500">Loading...</div>}
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
