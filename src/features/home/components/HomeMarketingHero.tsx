import MarketingProductPreview from "@/features/marketing/MarketingProductPreview";
import MarketingTrustStrip from "@/features/marketing/MarketingTrustStrip";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

import HomeMarketingAuthSection from "./HomeMarketingAuthSection";
import HomeMarketingHeroActions from "./HomeMarketingHeroActions";

export default function HomeMarketingHero() {
  return (
    <header className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 xl:gap-24">
      <div className="space-y-8">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            AI tasks for teams
          </p>
          <h1
            className={mergeMarketingClasses(
              "text-4xl font-semibold tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]",
              MARKETING_TEXT_PRIMARY_CLASSES,
            )}
          >
            Send work to your Mac from the browser — with your team&apos;s
            approval when it matters.
          </h1>
          <p
            className={mergeMarketingClasses(
              "max-w-2xl text-lg leading-relaxed",
              MARKETING_TEXT_SECONDARY_CLASSES,
            )}
          >
            {AGENT_WITCH_PRODUCT_NAME} connects this website to computers on
            your team. Ask your own Mac for help, send a task to a colleague,
            have managers approve sensitive requests, and keep a record of every
            job.
          </p>
        </div>
        <HomeMarketingHeroActions />
        <MarketingTrustStrip />
      </div>

      <aside aria-label="Product preview and sign in" className="space-y-6">
        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-400/15 via-brand-500/5 to-slate-400/5 blur-3xl"
            aria-hidden
          />
          <div className="relative translate-y-0 transition duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            <MarketingProductPreview />
          </div>
        </div>
        <HomeMarketingAuthSection />
      </aside>
    </header>
  );
}
