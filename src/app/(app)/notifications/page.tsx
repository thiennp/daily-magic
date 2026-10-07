import type { Metadata } from "next";

import NotificationsPageClient from "@/features/notifications/NotificationsPageClient";
import AppShell from "@/features/shell/AppShell";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Notifications | ${AGENT_WITCH_PRODUCT_NAME}`,
  description:
    "Updates from your projects and anything that needs your OK on AgentWitch.",
};

export default function NotificationsPage() {
  return (
    <AppShell>
      <NotificationsPageClient />
    </AppShell>
  );
}
