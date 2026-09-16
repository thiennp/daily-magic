import type { Metadata } from "next";

import MarketingLegalPageLayout from "@/features/marketing/MarketingLegalPageLayout";
import { MARKETING_TERMS_COPY } from "@/features/marketing/marketingLegalCopy.constant";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export const metadata: Metadata = {
  title: `Terms of Service | ${AGENT_WITCH_PRODUCT_NAME}`,
  description: `Terms of use for ${AGENT_WITCH_PRODUCT_NAME} at agentwitch.com.`,
};

export default function TermsPage() {
  const copy = MARKETING_TERMS_COPY;

  return (
    <MarketingLegalPageLayout
      title={copy.title}
      lastUpdated={copy.lastUpdated}
      intro={copy.intro}
      sections={copy.sections}
    />
  );
}
