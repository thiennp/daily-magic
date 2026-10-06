import type { AgentWitchInstructionSection } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";

export const AGENT_WITCH_INSTRUCTION_TASKS_SECTION: AgentWitchInstructionSection =
  {
    id: "tasks",
    title: "Sending tasks",
    summary:
      "Open a project and use New task there. Work is assigned to a bot on the project, runs where that bot works, and shows up in Reports.",
    topics: [
      {
        id: "open-composer",
        title: "Opening the task composer",
        body: "Open a project, then choose New task on that project. Assign the work there. The composer still supports optional prefill from Library.",
      },
      {
        id: "writer-agents",
        title: "Which AI runs the job",
        body: "Pick which tool on your computer should run the job: Claude, Codex, Cursor, or Antigravity. During an active session the choice stays locked until you finish.",
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
        title: "Your computer vs teammate dispatch",
        body: "Send to your own Mac for direct execution. Send to a teammate when you choose a company member and workflow — company dispatch policies decide whether approval is required first.",
      },
      {
        id: "offline-queue",
        title: "Offline queue",
        body: "When your computer is not connected, tasks can be queued in the browser and send automatically when the connection returns.",
      },
      {
        id: "operator-steps",
        title: "Human steps in the composer",
        body: "Workflows and agents can include Human step harness items. The task composer shows them as Your steps for you, while the Mac agent receives only a short checkpoint summary in its prompt.",
      },
      {
        id: "prompt-optimizer",
        title: "Optimize the prompt on this computer",
        body: "Before you send or save a prompt, run the prompt optimizer yourself at http://127.0.0.1:43347/prompt-optimizer/agent. POST goal, prompt, and workingDirectory for the project folder. The judge and improver run in that folder, so they can read the harness and the code. Do not ask the human to paste the prompt into a different optimizer. Poll GET ?cycle= until done is true. Use bestPrompt when status is passed (useThisPrompt). Do not use the prompt when status is stopped or failed. totalTokens is the reported writer tokens so far.",
      },
      {
        id: "mid-run-input",
        title: "Answering questions mid-run",
        body: "If the AI needs input, the live terminal shows a prompt. Reply in the browser; the response goes to your computer and the run continues.",
      },
      {
        id: "job-history",
        title: "Reports",
        body: "Every task creates a record with status, timestamps, and output. Reports is also cached locally in the browser.",
      },
    ],
  };
