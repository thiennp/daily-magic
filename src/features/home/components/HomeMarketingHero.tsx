import MarketingProductPreview from "@/features/marketing/MarketingProductPreview";
import MarketingTrustStrip from "@/features/marketing/MarketingTrustStrip";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

import HomeMarketingAuthSection from "./HomeMarketingAuthSection";
import HomeMarketingHeroActions from "./HomeMarketingHeroActions";

export default function HomeMarketingHero() {
  return (
    <header className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div className="space-y-8">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            AI tasks for teams
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            Send work to your Mac from the browser — with your team&apos;s
            approval when it matters.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
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
            className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-100/70 via-white/30 to-brand-50/50 blur-2xl"
            aria-hidden
          />
          <MarketingProductPreview />
        </div>
        <HomeMarketingAuthSection />
      </aside>
    </header>
  );
}
