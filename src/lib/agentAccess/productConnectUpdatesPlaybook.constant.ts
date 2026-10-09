import {
  PROJECT_BOT_PLAYBOOK_CATALOG_ADAPT,
  PROJECT_BOT_PLAYBOOK_CATALOG_V30_ADAPT,
} from "@/lib/agentAccess/projectBotPlaybookReport.constant";
import type { ProductConnectUpdateEntry } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

/**
 * Catalog v29 + v30: bots report with resultSummary and Playbook skills.
 * v29 carries the corrected copy so a bot still at 28 is never told the old
 * onboarding-card rule; v30 is the delta for bots that already adapted v29.
 */
export const PRODUCT_CONNECT_UPDATES_PLAYBOOK: readonly ProductConnectUpdateEntry[] =
  [
    {
      id: "bot-knowledge-card-report",
      catalogVersion: 29,
      at: "2026-10-09",
      kind: "connect",
      title: "Bot Playbook skills and task summaries",
      summary:
        "Check the project library first (list_project_skills, get_project_skill), set resultSummary on every done task, and publish a Playbook skill with standard sections (When to use, Steps, Pitfalls, Verification) when the work is reusable beyond that line.",
      adapt: PROJECT_BOT_PLAYBOOK_CATALOG_ADAPT,
    },
    {
      id: "bot-playbook-skill-terminology",
      catalogVersion: 30,
      at: "2026-10-09",
      kind: "changelog",
      title: "Playbook skill wording; onboarding skill dropped",
      summary:
        "Knowledge card is now Playbook skill. The per-seat onboarding skill is no longer required. resultSummary is the task-board line, not an auto-skill input, and bots never create auto skills.",
      adapt: PROJECT_BOT_PLAYBOOK_CATALOG_V30_ADAPT,
    },
  ];
