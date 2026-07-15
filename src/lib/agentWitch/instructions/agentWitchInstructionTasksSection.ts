import type { AgentWitchInstructionSection } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";

export const AGENT_WITCH_INSTRUCTION_TASKS_SECTION: AgentWitchInstructionSection =
  {
    id: "tasks",
    title: "Sending tasks",
    summary:
      "Tasks are composed in the browser, sent to a Mac, executed there, and recorded in Job history.",
    topics: [
      {
        id: "open-composer",
        title: "Opening the task composer",
        body: "Use Send a task from Home or navigation. The composer opens as a modal on Home with optional prefill from Library or Job history.",
      },
      {
        id: "writer-agents",
        title: "Which AI runs the job",
        body: "Pick which tool on your Mac should run the job: Claude, Codex, Cursor, or Antigravity. During an active session the choice stays locked until you finish.",
        bullets: [
          "Claude — Anthropic Claude in the terminal",
          "Codex — OpenAI Codex",
          "Cursor — Cursor agent",
          "Antigravity — Antigravity",
        ],
      },
      {
        id: "mac-selection",
        title: "Choosing a Mac",
        body: "If you have multiple Macs, pick the target in the composer. The selection locks for the current session so follow-up sends stay on the same machine.",
      },
      {
        id: "self-vs-teammate",
        title: "Your Mac vs teammate dispatch",
        body: "Send to your own Mac for direct execution. Send to a teammate when you choose a company member and workflow — company dispatch policies decide whether approval is required first.",
      },
      {
        id: "offline-queue",
        title: "Offline queue",
        body: "When your Mac is not connected, tasks can be queued in the browser and send automatically when the connection returns.",
      },
      {
        id: "operator-steps",
        title: "Human steps in the composer",
        body: "Workflows and agents can include Human step harness items. The task composer shows them as Your steps for you, while the Mac agent receives only a short checkpoint summary in its prompt.",
      },
      {
        id: "mid-run-input",
        title: "Answering questions mid-run",
        body: "If the AI needs input, the live terminal shows a prompt. Reply in the browser; the response goes to your Mac and the run continues.",
      },
      {
        id: "job-history",
        title: "Job history",
        body: "Every task creates a record with status, timestamps, and output. Job history is available in Reports and is also cached locally in the browser.",
      },
    ],
  };
