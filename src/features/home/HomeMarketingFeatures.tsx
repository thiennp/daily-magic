import Link from "next/link";

import MarketingFeatureCard from "@/features/marketing/MarketingFeatureCard";
import { MARKETING_FEATURE_ITEMS } from "@/features/marketing/marketingFeatureItems.constant";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";

export default function HomeMarketingFeatures() {
  return (
    <section className="mt-24" aria-labelledby="features-heading">
      <MarketingSectionHeader
        eyebrow="Why teams use it"
        title="Simple to follow, easy to trust"
        description="Everyone can see who sent a task, whether it was approved, and what the computer returned."
        headingId="features-heading"
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {MARKETING_FEATURE_ITEMS.map((item) => (
          <MarketingFeatureCard key={item.title} item={item} />
        ))}
      </div>
      <p className="mt-8 text-sm text-gray-600">
        Ready to try it?{" "}
        <Link href="/#get-started" className={MARKETING_TEXT_LINK_CLASSES}>
          Sign in and connect your Mac
        </Link>
        .
      </p>
    </section>
  );
}
