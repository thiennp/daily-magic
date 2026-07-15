import Link from "next/link";

import MarketingFeatureCard from "@/features/marketing/MarketingFeatureCard";
import { MARKETING_FEATURE_ITEMS } from "@/features/marketing/marketingFeatureItems.constant";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import { MARKETING_TEXT_SECONDARY_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function HomeMarketingFeatures() {
  return (
    <section className="mt-24" aria-labelledby="features-heading">
      <MarketingSectionHeader
        eyebrow="Why teams use it"
        title="Simple to follow, easy to trust"
        description="Turn one-off tasks into personal or group automations—everyone can see who ran what, whether it was approved, and what came back."
        headingId="features-heading"
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {MARKETING_FEATURE_ITEMS.map((item) => (
          <MarketingFeatureCard key={item.title} item={item} />
        ))}
      </div>
      <p
        className={mergeMarketingClasses(
          "mt-8 text-sm",
          MARKETING_TEXT_SECONDARY_CLASSES,
        )}
      >
        Ready to try it?{" "}
        <Link href="/#get-started" className={MARKETING_TEXT_LINK_CLASSES}>
          Sign in and connect your Mac
        </Link>
        .
      </p>
    </section>
  );
}
