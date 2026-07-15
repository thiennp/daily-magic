import type { AgentWitchInstructionSection } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";

export const AGENT_WITCH_INSTRUCTION_OVERVIEW_SECTION: AgentWitchInstructionSection =
  {
    id: "overview",
    title: "What Agent Witch does",
    summary:
      "Agent Witch connects the web app to AI writer tools on a paired Mac so people can send tasks from a browser and review results in job history.",
    topics: [
      {
        id: "product-purpose",
        title: "Purpose",
        body: "Agent Witch is for individuals and company teams who want browser-initiated AI work to run on a real Mac with local files, local CLIs, and company-approved rules.",
        bullets: [
          "Sign in to the web app, install the local bridge on your Mac, and pair the computer.",
          "Send tasks from Home to your Mac or to a teammate in your company.",
          "Read outputs and statuses in Job history.",
        ],
      },
      {
        id: "who-runs-work",
        title: "Where work runs",
        body: "Tasks execute on the paired Mac using the writer tool you chose (Claude CLI, Codex, Cursor, or Antigravity). The server coordinates dispatch, approvals, and history — it does not replace the local AI runtime.",
      },
      {
        id: "company-vs-personal",
        title: "Personal and company use",
        body: "You can use Agent Witch alone or inside a company. Companies share playbooks, marketplace listings, dispatch rules, and member directory access while each person's Mac stays their own execution environment.",
      },
    ],
  };
