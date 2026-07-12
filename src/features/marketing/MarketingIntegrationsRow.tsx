import MarketingBadge from "@/features/marketing/MarketingBadge";
import { MARKETING_INTEGRATION_ITEMS } from "@/features/marketing/marketingIntegrationItems.constant";
import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";

export default function MarketingIntegrationsRow() {
  return (
    <section className="mt-20">
      <MarketingSectionHeader
        align="center"
        eyebrow="Your stack"
        title="Built for the tools you already run"
        description="Pair a local client, connect over WebSocket, and keep harness context per account."
      />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {MARKETING_INTEGRATION_ITEMS.map((item) => (
          <MarketingBadge key={item}>{item}</MarketingBadge>
        ))}
      </div>
    </section>
  );
}
