import MarketingBadge from "@/features/marketing/MarketingBadge";
import { MARKETING_INTEGRATION_ITEMS } from "@/features/marketing/marketingIntegrationItems.constant";
import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";

export default function MarketingIntegrationsRow() {
  return (
    <section className="mt-20">
      <MarketingSectionHeader
        align="center"
        eyebrow="What you get"
        title="Built for everyday company work"
        description="Use the assistants you already have on your Mac, with a shared website your company can manage together."
      />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {MARKETING_INTEGRATION_ITEMS.map((item) => (
          <MarketingBadge key={item}>{item}</MarketingBadge>
        ))}
      </div>
    </section>
  );
}
