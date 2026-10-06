/** Four AI paths on Prompt optimizer (Pricing LOCK rule 12). Not package-card credits. */
export const PROMPT_SDLC_AI_PATH_COPY = {
  title: "How the Prompt optimizer runs AI",
  intro:
    "Pick one path for each run. These are add-on choices — seats never include AI credits inside Pricing packages.",
  paths: [
    {
      id: "cli",
      label: "CLI",
      detail:
        "Use a writer CLI already installed and signed in on this computer (Claude, Codex, Cursor, Antigravity, or You for manual).",
    },
    {
      id: "assistant",
      label: "assistant",
      detail: "Use a connected assistant on this computer.",
    },
    {
      id: "buy-tokens",
      label: "buy tokens",
      detail:
        "Buy AgentWitch tokens or an AW AI pack for on-demand runs. Not bundled in any Pricing package.",
    },
    {
      id: "own-api-key",
      label: "own API key",
      detail:
        "Provide your own API key. Each own API key counts as 1 agent toward assistant connect limits.",
    },
  ],
} as const;
