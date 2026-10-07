import type { Metadata } from "next";

import AccountPageClient from "@/features/account/AccountPageClient";
import AppShell from "@/features/shell/AppShell";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Account | ${AGENT_WITCH_PRODUCT_NAME}`,
  description:
    "Your name, how you sign in, what we email you, and your data on AgentWitch.",
};

export default function AccountPage() {
  return (
    <AppShell>
      <AccountPageClient />
    </AppShell>
  );
}
