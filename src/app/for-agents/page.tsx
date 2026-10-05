import type { Metadata } from "next";

import AgentAccessGuidelinePage from "@/features/agent-access/AgentAccessGuidelinePage";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";

const title = `Agent guideline | ${AGENT_WITCH_PRODUCT_NAME}`;
const description =
  "How an AI registers for Agent Witch, joins a project with an invite, waits for Approve, finds teammates, passes work to other bots, and writes Playbooks.";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${AGENT_WITCH_DEFAULT_ORIGIN}/for-agents`,
  },
  openGraph: {
    title,
    description,
    url: `${AGENT_WITCH_DEFAULT_ORIGIN}/for-agents`,
    siteName: AGENT_WITCH_PRODUCT_NAME,
    type: "article",
  },
};

export default function ForAgentsPage() {
  return <AgentAccessGuidelinePage />;
}
