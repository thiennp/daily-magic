import type { Metadata } from "next";

import { AccountPageClient } from "@/features/account/public-api/presentation";
import { AppShell } from "@/features/shell/public-api/presentation";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Account | ${AGENT_WITCH_PRODUCT_NAME}`,
  description: "Your name and what we email you on AgentWitch.",
};

export default function AccountPage() {
  return (
    <AppShell>
      <AccountPageClient />
    </AppShell>
  );
}
