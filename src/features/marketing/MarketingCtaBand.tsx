import Link from "next/link";

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
            Ready to delegate agent work on Macs you control?
          </h2>
          <p className="text-base text-brand-100">
            Create a free workspace, connect your first Mac, and run your first
            workflow today.
          </p>
        </div>
        <Link
          href="/#get-started"
          className={MARKETING_BUTTON_ON_BRAND_BAND_CLASSES}
        >
          Create free account
        </Link>
      </div>
    </section>
  );
}
