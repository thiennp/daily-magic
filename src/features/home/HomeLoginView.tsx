import Link from "next/link";
import { Suspense } from "react";

import LoginForm from "@/features/auth/LoginForm";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export default function HomeLoginView() {
  return (
    <div className="space-y-6 text-left">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-brand-500">
          {AGENT_WITCH_PRODUCT_NAME}
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Sign in to continue
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Log in to connect your Mac and see who is online on your team.
        </p>
      </div>

      <Suspense
        fallback={<div className="text-sm text-gray-500">Loading...</div>}
      >
        <LoginForm defaultCallbackUrl="/" />
      </Suspense>

      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        <Link
          href="/styleguide"
          className="text-brand-600 hover:underline dark:text-brand-400"
        >
          Styleguide
        </Link>
      </p>
    </div>
  );
}
