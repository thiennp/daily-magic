import type { Metadata } from "next";

import MarketingLegalPageLayout from "@/features/marketing/MarketingLegalPageLayout";
import { MARKETING_PRIVACY_COPY } from "@/features/marketing/marketingLegalCopy.constant";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export const metadata: Metadata = {
  title: `Privacy Policy | ${AGENT_WITCH_PRODUCT_NAME}`,
  description: `How ${AGENT_WITCH_PRODUCT_NAME} handles account and usage information.`,
};

export default function PrivacyPage() {
  const copy = MARKETING_PRIVACY_COPY;

  return (
    <MarketingLegalPageLayout
      title={copy.title}
      lastUpdated={copy.lastUpdated}
      intro={copy.intro}
      sections={copy.sections}
    />
  );
}
