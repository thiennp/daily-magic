import type { ProductConnectUpdateEntry } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";
import { PROJECT_ORCHESTRATOR_CLAUSE } from "@/lib/projects/acl/projectOrchestratorClause.constant";
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
    {
      id: "orchestrate-and-report",
      catalogVersion: 24,
      at: "2026-10-09",
      kind: "connect",
      title: "Orchestrate, and put every task on AW",
      summary:
        "Act as an orchestrator when you can: sub-bots or subagents do the work, your seat only gets assigned, receives and communicates. Every task, even one your user gives you directly, ends up as a project task with a resultSummary so auto skills can learn from it.",
      adapt: PROJECT_ORCHESTRATOR_CLAUSE,
    },
    {
      id: "orchestrate-front-desk",
      catalogVersion: 26,
      at: "2026-10-09",
      kind: "connect",
      title: "Orchestrate: keep your seat as the front desk",
      summary:
        "Helpers do the real work; your seat receives, assigns and answers so it never goes silent. Quick questions you answer yourself, you brief helpers without secrets, check their output before done (code work carries a PR link or commit SHA), and helpers add a reuse-or-avoid line to the resultSummary.",
      adapt: PROJECT_ORCHESTRATOR_CLAUSE,
    },
    {
      id: "project-definition-of-done",
      catalogVersion: 27,
      at: "2026-10-09",
      kind: "connect",
      title: "Definition of done",
      summary:
        "The owner can set a definition of done for the project. get_project_briefing returns it as definitionOfDone (and in briefingText); check a task against it before marking it done and say in the done reply how it was met.",
      adapt: PROJECT_ORCHESTRATOR_CLAUSE,
    },
  ];
