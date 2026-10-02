import { Suspense } from "react";

import LoginForm from "@/features/auth/LoginForm";
import { LOGIN_PAGE_COPY } from "@/features/auth/loginPageCopy.constant";
import MarketingCard from "@/features/marketing/MarketingCard";
import MarketingShell from "@/features/marketing/MarketingShell";

/** Dedicated sign-in layout (not the home marketing hero). */
export default function LoginPageView() {
  return (
    <MarketingShell showSignIn={false} showFooter={false}>
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            {LOGIN_PAGE_COPY.title}
          </h1>
          <p className="mt-4 text-base text-gray-600">
            {LOGIN_PAGE_COPY.description}
          </p>
        </div>

        <MarketingCard className="order-1 lg:order-2">
          <h2 className="text-xl font-semibold text-gray-900">Sign in</h2>
          <p className="mt-2 text-sm text-gray-600">
            Use your email link or Google account to continue.
          </p>
          <div className="mt-6">
            <Suspense
              fallback={<div className="text-sm text-gray-500">Loading…</div>}
            >
              <LoginForm defaultCallbackUrl="/" appearance="marketing" />
            </Suspense>
          </div>
        </MarketingCard>
      </div>
    </MarketingShell>
  );
}
