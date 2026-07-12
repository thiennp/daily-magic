import Link from "next/link";

import MarketingFeatureCard from "@/features/marketing/MarketingFeatureCard";
import { MARKETING_FEATURE_ITEMS } from "@/features/marketing/marketingFeatureItems.constant";
import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";

export default function HomeMarketingFeatures() {
  return (
    <section className="mt-20">
      <MarketingSectionHeader
        eyebrow="Why teams use it"
        title="Simple to follow, easy to trust"
        description="Everyone can see who sent a task, whether it was approved, and what the computer returned."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {MARKETING_FEATURE_ITEMS.map((item) => (
          <MarketingFeatureCard key={item.title} item={item} />
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-600">
        Ready to try it?{" "}
        <Link
          href="/#get-started"
          className="font-medium text-brand-600 hover:text-brand-700"
        >
          Sign in and connect your Mac
        </Link>
        .
      </p>
    </section>
  );
}
