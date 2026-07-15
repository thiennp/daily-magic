import Link from "next/link";

import HomeMarketingPopularPresetsGrid from "@/features/home/components/HomeMarketingPopularPresetsGrid";
import resolveHomePopularPresets from "@/features/home/utils/resolveHomePopularPresets";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import { MARKETING_TEXT_SECONDARY_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function HomeMarketingPopularPresets() {
  const presets = resolveHomePopularPresets();

  return (
    <section className="mt-24" aria-labelledby="popular-presets-heading">
      <MarketingSectionHeader
        eyebrow="Popular workflows"
        title="Start from a playbook, automate it for you or your team"
        description="Pick a free preset, sign in, and save it to your library—then schedule it on your Mac or share the workflow with your group."
        headingId="popular-presets-heading"
      />
      <HomeMarketingPopularPresetsGrid presets={presets} />
      <p
        className={mergeMarketingClasses(
          "mt-8 text-sm",
          MARKETING_TEXT_SECONDARY_CLASSES,
        )}
      >
        Browse all presets after you sign in on the{" "}
        <Link
          href="/login?callbackUrl=%2Fmarketplace"
          className={MARKETING_TEXT_LINK_CLASSES}
        >
          marketplace
        </Link>
        .
      </p>
    </section>
  );
}
