import { Suspense } from "react";

import LoginForm from "@/features/auth/LoginForm";
import { MARKETING_FOCAL_CARD_CLASSES } from "@/features/marketing/marketingPalette.constant";
import {
  MARKETING_TEXT_MUTED_CLASSES,
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function HomeMarketingAuthSection() {
  return (
    <section
      id="get-started"
      aria-labelledby="get-started-heading"
      className={mergeMarketingClasses(MARKETING_FOCAL_CARD_CLASSES, "p-6 sm:p-8")}
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
    </section>
  );
}
