import { PROJECT_BOT_KNOWLEDGE_CARD_CATALOG_ADAPT } from "@/lib/agentAccess/projectBotKnowledgeCardReport.constant";
import type { ProductConnectUpdateEntry } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

/** Catalog v29: bot knowledge cards → publish_project_skill + task resultSummary. */
export const PRODUCT_CONNECT_UPDATES_KNOWLEDGE_CARD: readonly ProductConnectUpdateEntry[] =
  [
    {
      id: "bot-knowledge-card-report",
      catalogVersion: 29,
      at: "2026-10-09",
      kind: "connect",
      title: "Bot knowledge cards for auto skills",
      summary:
        "Report project work as knowledge cards (published skills): onboarding card once per bot seat if missing, standard sections (When to use, Steps, Pitfalls, Verification), list_project_skills before work, and resultSummary on every done task.",
      adapt: PROJECT_BOT_KNOWLEDGE_CARD_CATALOG_ADAPT,
    },
  ];
