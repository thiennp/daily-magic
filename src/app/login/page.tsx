import { Suspense } from "react";

import LoginForm from "@/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10 dark:bg-gray-900">
      <main className="w-full max-w-md space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03] sm:p-10">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-500">
            Daily Magic
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Sign in to continue
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Log in to connect your local agent and manage your workspace.
          </p>
        </div>
        <Suspense
          fallback={<div className="text-sm text-gray-500">Loading...</div>}
        >
          <LoginForm defaultCallbackUrl="/" />
        </Suspense>
      </main>
    </div>
  );
}
