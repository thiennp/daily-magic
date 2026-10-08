import MarketingAuthTrigger from "@/features/marketing/MarketingAuthTrigger";

import {
  MARKETING_BUTTON_ON_BRAND_BAND_CLASSES,
  MARKETING_CTA_BAND_CLASSES,
} from "@/features/marketing/marketingDesignSystem.constant";

export default function MarketingCtaBand() {
  return (
    <section
      className={`${MARKETING_CTA_BAND_CLASSES} mt-16 rounded-2xl px-6 py-10 sm:px-10 sm:py-12`}
      aria-labelledby="marketing-cta-band-heading"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-2">
          <h2
            id="marketing-cta-band-heading"
            className="text-2xl font-bold tracking-[-0.02em] sm:text-3xl"
          >
            Stop repeating yourself to your AI.
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <MarketingAuthTrigger
            mode="up"
            fallbackHref="/#get-started"
            className={MARKETING_BUTTON_ON_BRAND_BAND_CLASSES}
          >
            Create free account
          </MarketingAuthTrigger>
          <MarketingAuthTrigger
            mode="in"
            fallbackHref="/login"
            className={MARKETING_BUTTON_ON_BRAND_BAND_CLASSES}
          >
            Sign in
          </MarketingAuthTrigger>
        </div>
      </div>
    </section>
  );
}
