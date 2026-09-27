import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

const PREFERENCE = [
  "claude-cli",
  "codex",
  "cursor",
  "antigravity",
] as const satisfies readonly HarnessWriterAgent[];

export const PROMPT_SDLC_LOCAL_MODEL_LABELS: Record<
  (typeof PREFERENCE)[number],
  string
> = {
  "claude-cli": "Claude",
  codex: "Codex",
  cursor: "Cursor",
  antigravity: "Antigravity",
};

export const choosePromptSdlcLocalModels = (
  installedWriterIds: readonly string[],
): {
  readonly judge: (typeof PREFERENCE)[number];
  readonly improver: (typeof PREFERENCE)[number];
} | null => {
  const available = PREFERENCE.filter((writer) =>
    installedWriterIds.includes(writer),
  );
  const judge = available[0];
  if (judge === undefined) {
    return null;
  }

  return { judge, improver: available[1] ?? judge };
};
