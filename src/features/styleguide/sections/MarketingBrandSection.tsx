import { MARKETING_DESIGN_SYSTEM_VERSION } from "@/features/marketing/marketingDesignSystem.constant";
import MarketingBrandSectionCards from "@/features/styleguide/sections/MarketingBrandSectionCards";

export default function MarketingBrandSection() {
  return (
    <section id="marketing-brand" className="scroll-mt-28">
      <h2 className="mb-2 text-2xl font-semibold text-awc-fg dark:text-white/90">
        Marketing brand ({MARKETING_DESIGN_SYSTEM_VERSION})
      </h2>
      <p className="mb-5 max-w-3xl text-sm leading-relaxed text-awc-fg-muted dark:text-gray-400">
        Public-site tokens for AgentWitch landing (AWC), login, legal, and AWL
        inline CSS. Logo lockup stays unchanged; surfaces use border-first
        cards, brand blue CTAs, navy announcement + security bands, and metric
        dividers. Canonical doc: docs/design/agent-witch-public-ui.md
      </p>
      <MarketingBrandSectionCards />
    </section>
  );
}
