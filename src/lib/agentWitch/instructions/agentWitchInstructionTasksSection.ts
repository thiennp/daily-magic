import type { AgentWitchInstructionSection } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";

export const AGENT_WITCH_INSTRUCTION_TASKS_SECTION: AgentWitchInstructionSection =
  {
    id: "tasks",
    title: "Sending tasks",
    summary:
      "Tasks are composed in the browser, dispatched over WebSocket, executed on a Mac, and recorded as agent runs.",
    topics: [
      {
        id: "open-composer",
        title: "Opening the task composer",
        body: "Use Send a task from Home or navigation. The composer opens as a modal on Home with optional prefill from Library or Job history.",
      },
      {
        id: "writer-agents",
        title: "Writer agents",
        body: "Pick which local CLI should run the job: claude-cli, codex, cursor, or antigravity. During an active Mac session the writer choice stays locked until you finish the session.",
        bullets: [
          "claude-cli — Anthropic Claude Code CLI",
          "codex — OpenAI Codex CLI",
          "cursor — Cursor agent CLI",
          "antigravity — Antigravity CLI",
        ],
      },
      {
        id: "mac-selection",
        title: "Choosing a Mac",
        body: "If you have multiple paired Macs, pick the target in the composer. The selection locks for the current session so follow-up sends continue the same terminal thread on the same machine.",
      },
      {
        id: "self-vs-teammate",
        title: "Your Mac vs teammate dispatch",
        body: "Send to your own Mac for direct execution. Send to a teammate when you choose a company member and workflow — company dispatch policies decide whether approval is required first.",
      },
      {
        id: "offline-queue",
        title: "Offline queue",
        body: "When your Mac is not connected, tasks can be queued in the browser and flush automatically when the WebSocket bridge reconnects.",
      },
      {
        id: "mid-run-input",
        title: "Answering questions mid-run",
        body: "If a writer needs input, the live terminal shows a prompt. Reply in the browser; the response is forwarded to the Mac and the run continues.",
      },
      {
        id: "job-history",
        title: "Job history",
        body: "Every dispatch creates an agent run with status, timestamps, and output. Job history is available in Reports and is also cached locally in the browser for resilience.",
      },
    ],
  };
