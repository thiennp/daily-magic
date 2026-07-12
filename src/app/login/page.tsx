import { Suspense } from "react";

import LoginForm from "@/features/auth/LoginForm";
import MarketingCard from "@/features/marketing/MarketingCard";
import MarketingShell from "@/features/marketing/MarketingShell";
import MarketingTrustStrip from "@/features/marketing/MarketingTrustStrip";

export default function LoginPage() {
  return (
    <MarketingShell showSignIn={false} showFooter={false}>
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
            Daily Magic
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Sign in to pair your local agent
          </h1>
          <p className="mt-4 text-base text-gray-600">
            Connect your machine, join a group, and dispatch Claude tasks with
            approval rules and run reports your team can trust.
          </p>
          <div className="mt-8">
            <MarketingTrustStrip />
          </div>
        </div>

        <MarketingCard>
          <h2 className="text-xl font-semibold text-gray-900">Sign in</h2>
          <p className="mt-2 text-sm text-gray-600">
            Use your email magic link or Google account to continue.
          </p>
          <div className="mt-6">
            <Suspense
              fallback={<div className="text-sm text-gray-500">Loading…</div>}
            >
              <LoginForm defaultCallbackUrl="/" />
            </Suspense>
          </div>
        </MarketingCard>
      </div>
    </MarketingShell>
  );
}
