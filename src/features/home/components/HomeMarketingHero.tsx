import Link from "next/link";

import MarketingProductPreview from "@/features/marketing/MarketingProductPreview";
import MarketingTrustStrip from "@/features/marketing/MarketingTrustStrip";
import { MARKETING_CTA_GHOST_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

import HomeMarketingAuthSection from "./HomeMarketingAuthSection";

export default function HomeMarketingHero() {
  return (
    <header className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-20 xl:gap-24">
      <div className="space-y-8 lg:pt-2">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Personal &amp; team automations
          </p>
          <h1
            className={mergeMarketingClasses(
              "text-4xl font-semibold tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]",
              MARKETING_TEXT_PRIMARY_CLASSES,
            )}
          >
            Create automations that work for you—and your whole team.
          </h1>
          <p
            className={mergeMarketingClasses(
              "max-w-2xl text-lg leading-relaxed",
              MARKETING_TEXT_SECONDARY_CLASSES,
            )}
          >
            {AGENT_WITCH_PRODUCT_NAME} helps people and companies turn playbooks
            into jobs that run on Macs: schedule recurring workflows, trigger
            them with webhooks, and send work to yourself or a colleague. Your
            group can require manager approval when it matters, and every run
            stays in history.
          </p>
        </div>

        <nav aria-label="Jump to sign in">
          <Link
            href="#get-started"
            className={MARKETING_CTA_GHOST_CLASSES}
            aria-label="Jump to the get started sign-in form"
          >
            Get started with your email or Google →
          </Link>
        </nav>

        <div className="mt-8">
          <MarketingTrustStrip />
        </div>
      </div>

      <aside aria-label="Sign in and product preview" className="space-y-5">
        <HomeMarketingAuthSection />
        <MarketingProductPreview />
      </aside>
    </header>
  );
}
