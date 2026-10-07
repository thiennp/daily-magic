import type { Metadata } from "next";

import PricingPageLayout from "@/features/pricing/PricingPageLayout";
import MarketingShell from "@/features/marketing/MarketingShell";
import AppShell from "@/features/shell/AppShell";
import { getAuthActor } from "@/lib/auth/auth";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Pricing | ${AGENT_WITCH_PRODUCT_NAME}`,
  description:
    "Simple AgentWitch pricing. Start with a free month, then Pro or Team per seat. Cancel anytime. Prices in USD.",
};

type PricingSearchParams = {
  readonly trial_closed?: string;
};

export default async function PricingPage({
  searchParams,
}: {
  readonly searchParams?: Promise<PricingSearchParams> | PricingSearchParams;
}) {
  const actor = await getAuthActor();
  const signedIn = Boolean(actor);
  const params = await Promise.resolve(searchParams ?? {});
  const raw = params.trial_closed;
  const trialClosedBanner =
    !signedIn && (raw === "1" || raw === "true" || raw === "yes");

  if (signedIn) {
    return (
      <AppShell>
        <PricingPageLayout signedIn />
      </AppShell>
    );
  }

  return (
    <MarketingShell>
      <PricingPageLayout
        signedIn={false}
        trialClosedBanner={trialClosedBanner}
      />
    </MarketingShell>
  );
}
