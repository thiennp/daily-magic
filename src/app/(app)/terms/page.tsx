import type { Metadata } from "next";

import { MarketingLegalPageLayout } from "@/features/marketing/public-api/presentation";
import { MARKETING_TERMS_COPY } from "@/features/marketing/public-api/types";
import { AppShell } from "@/features/shell/public-api/presentation";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export const metadata: Metadata = {
  title: `Terms of Service | ${AGENT_WITCH_PRODUCT_NAME}`,
  description: `Terms of use for ${AGENT_WITCH_PRODUCT_NAME} at agentwitch.com.`,
};

export default function TermsPage() {
  return (
    <AppShell>
      <MarketingLegalPageLayout doc={MARKETING_TERMS_COPY} />
    </AppShell>
  );
}
