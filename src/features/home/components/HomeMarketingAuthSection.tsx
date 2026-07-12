import { Suspense } from "react";

import LoginForm from "@/features/auth/LoginForm";
import MarketingCard from "@/features/marketing/MarketingCard";
import {
  MARKETING_TEXT_MUTED_CLASSES,
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

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
        className={mergeMarketingClasses(
          "text-xl font-semibold tracking-[-0.02em]",
          MARKETING_TEXT_PRIMARY_CLASSES,
        )}
      >
        Get started
      </h2>
      <p
        className={mergeMarketingClasses(
          "mt-2 text-sm leading-relaxed",
          MARKETING_TEXT_SECONDARY_CLASSES,
        )}
      >
        Sign in, connect your Mac, and send your first task in a few minutes.
      </p>
      <div className="mt-6">
        <Suspense
          fallback={
            <p
              className={mergeMarketingClasses("text-sm", MARKETING_TEXT_MUTED_CLASSES)}
              role="status"
            >
              Loading sign-in form…
            </p>
          }
        >
          <LoginForm defaultCallbackUrl="/" appearance="marketing" />
        </Suspense>
      </div>
    </MarketingCard>
  );
}
