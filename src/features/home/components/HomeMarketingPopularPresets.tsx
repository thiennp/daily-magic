import Link from "next/link";

import HomeMarketingPopularPresetsGrid from "@/features/home/components/HomeMarketingPopularPresetsGrid";
import { HOME_MARKETING_POPULAR_PRESETS_COPY } from "@/features/home/constants/homeMarketingLandingCopy.constant";
import resolveHomePopularPresets from "@/features/home/utils/resolveHomePopularPresets";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import { MARKETING_TEXT_SECONDARY_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function HomeMarketingPopularPresets() {
  const presets = resolveHomePopularPresets();
  const copy = HOME_MARKETING_POPULAR_PRESETS_COPY;

  return (
    <section className="mt-24" aria-labelledby="popular-presets-heading">
      <MarketingSectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        headingId="popular-presets-heading"
      />
      <HomeMarketingPopularPresetsGrid presets={presets} />
      <p
        className={mergeMarketingClasses(
          "mt-8 text-sm",
          MARKETING_TEXT_SECONDARY_CLASSES,
        )}
      >
        {copy.footerPrefix}{" "}
        <Link
          href="/login?callbackUrl=%2Fmarketplace"
          className={MARKETING_TEXT_LINK_CLASSES}
        >
          {copy.footerLink}
        </Link>
        .
      </p>
    </section>
  );
}
