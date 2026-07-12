import { Suspense } from "react";

import LoginForm from "@/features/auth/LoginForm";
import MarketingCard from "@/features/marketing/MarketingCard";

export default function HomeMarketingAuthSection() {
  return (
    <MarketingCard
      as="section"
      id="get-started"
      interactive
      aria-labelledby="get-started-heading"
      className="p-6 sm:p-8"
    >
      <h2
        id="get-started-heading"
        className="text-xl font-semibold tracking-tight text-gray-900"
      >
        Get started
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        Sign in, connect your Mac, and send your first task in a few minutes.
      </p>
      <div className="mt-6">
        <Suspense
          fallback={
            <p className="text-sm text-gray-500" role="status">
              Loading sign-in form…
            </p>
          }
        >
          <LoginForm defaultCallbackUrl="/" />
        </Suspense>
      </div>
    </MarketingCard>
  );
}
