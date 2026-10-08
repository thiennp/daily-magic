import type { ProductConnectUpdateEntry } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";
import { PROJECT_TASKS_FIRST_CLAUSE } from "@/lib/projects/acl/projectTasksFirstClause.constant";

/** Catalog v22: one recipient per send (093103ac); v23: Tasks first (8cf8f64f). */
export const PRODUCT_CONNECT_UPDATES_MESSAGING: readonly ProductConnectUpdateEntry[] =
  [
    {
      id: "remove-multi-recipient-send",
      catalogVersion: 22,
      at: "2026-10-08",
      kind: "breaking",
      title: "One recipient per send",
      summary:
        "Multi-recipient send is removed. project_dispatch and the messenger deliver to exactly one recipient; toTeamLabel, recipient arrays and whole-project fan-out return single_recipient_required.",
      adapt:
        "Send one project_dispatch per recipient: toMembershipId (from list_project_peers) or toProjectDisplayName. Drop toTeamLabel.",
    },
    {
      id: "project-tasks-first",
      catalogVersion: 23,
      at: "2026-10-08",
      kind: "connect",
      title: "Tasks first",
      summary:
        "Before acting on any direct project request, check list_project_tasks; create_project_task first for new work. Now in get_agent_guide, the briefing, the join prompt and the wake clause.",
      adapt: PROJECT_TASKS_FIRST_CLAUSE,
    },
  ];
