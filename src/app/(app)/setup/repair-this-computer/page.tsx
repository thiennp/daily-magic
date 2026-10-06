import type { Metadata } from "next";

import RepairThisComputerPageBody from "@/features/setup/repairThisComputer/RepairThisComputerPageBody";
import AppShell from "@/features/shell/AppShell";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";

const title = `Repair this computer | ${AGENT_WITCH_PRODUCT_NAME}`;
const description =
  "Update, restart, reconnect, and check AgentWitch Local when this computer will not connect.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${AGENT_WITCH_DEFAULT_ORIGIN}/setup/repair-this-computer`,
  },
};

export default function RepairThisComputerPage() {
  return (
    <AppShell>
      <RepairThisComputerPageBody />
    </AppShell>
  );
}
