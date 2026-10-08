/** Four AI paths on Prompt optimizer (Pricing LOCK rule 12). Not package-card credits. */
export const PROMPT_SDLC_AI_PATH_COPY = {
  title: "How AI runs",
  tip: "Pick one in step 3 of the wizard. You can change it on every run.",
  intro: "Choose one per run in AgentWitch Local.",
  footnote:
    "Pro and Team packages include no AI. Buy tokens is an add-on. Each own API key counts as 1 agent toward your connect limit.",
  paths: [
    {
      id: "cli",
      label: "CLI",
      tag: "Uses your CLI accounts",
      tip: "The CLI runs in your project folder with your own sign-in. AgentWitch does not charge for its tokens.",
      detail:
        "Use a writer CLI installed and signed in on this computer: Claude, Codex, Cursor, Antigravity, or You for manual steps.",
    },
    {
      id: "assistant",
      label: "Assistant",
      tag: "Connected assistants",
      tip: "Assistants you already connected in Connect. They count toward your connect limit as usual.",
      detail:
        "Let a connected assistant do the judge, improver and runner work.",
    },
    {
      id: "buy-tokens",
      label: "Buy tokens",
      tag: "Add-on, not in packages",
      tip: "Tokens are an add-on. Pro and Team packages do not include AI. You only pay for tokens you buy.",
      detail: "Buy AgentWitch tokens or an AW AI pack and pay per run.",
    },
    {
      id: "own-api-key",
      label: "Own API key",
      tag: "Each key = 1 agent",
      tip: "Each own API key counts as 1 agent toward your connect limit: Pro 3, Team 10.",
      detail:
        "Paste your own provider API key. Your provider bills you directly.",
    },
  ],
} as const;

export const PROMPT_SDLC_STEPS = [
  {
    title: "Project",
    body: "Pick the folder writers run in. Add a Skill from that folder if you like.",
  },
  {
    title: "Prompt and goal",
    body: "Write the goal and the prompt. Set the pass score and cost limits.",
  },
  {
    title: "CLI",
    body: "Choose the judge, the improver and the runner. Each needs to be signed in.",
  },
  {
    title: "Summary → Run",
    body: "Check the plan and start. You see every trial and its score.",
  },
] as const;

export const PROMPT_SDLC_MODULES = [
  "generalize",
  "evaluate",
  "separate",
  "optimize",
] as const;

export const PROMPT_SDLC_RESULT_LEGEND = [
  { key: "passed", text: "Reached the pass score." },
  { key: "failed", text: "Finished below the pass score." },
  { key: "timeout", text: "A trial took too long." },
  { key: "interrupt", text: "You or the computer stopped it." },
  { key: "no_reply", text: "A writer did not answer." },
] as const;
