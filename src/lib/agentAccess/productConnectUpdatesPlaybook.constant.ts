import { PROJECT_BOT_PLAYBOOK_CATALOG_ADAPT } from "@/lib/agentAccess/projectBotPlaybookReport.constant";
import type { ProductConnectUpdateEntry } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

/** Catalog v30: bots report with resultSummary on the task board and Playbook skills in the library. */
export const PRODUCT_CONNECT_UPDATES_PLAYBOOK: readonly ProductConnectUpdateEntry[] =
  [
    {
      id: "bot-playbook-skill-report",
      catalogVersion: 30,
      at: "2026-10-09",
      kind: "connect",
      title: "Bot Playbook skills and task summaries",
      summary:
        "Check the project library first (list_project_skills, get_project_skill), set resultSummary on every done task (the line people read on the task board), and publish a Playbook skill with standard sections (When to use, Steps, Pitfalls, Verification) only when the work is reusable beyond that line. Bots never create auto skills; no onboarding skill is required.",
      adapt: PROJECT_BOT_PLAYBOOK_CATALOG_ADAPT,
    },
  ];
