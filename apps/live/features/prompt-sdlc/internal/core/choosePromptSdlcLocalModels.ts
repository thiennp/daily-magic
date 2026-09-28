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

export const labelPromptSdlcLocalModel = (writer: string): string =>
  writer in PROMPT_SDLC_LOCAL_MODEL_LABELS
    ? PROMPT_SDLC_LOCAL_MODEL_LABELS[
        writer as keyof typeof PROMPT_SDLC_LOCAL_MODEL_LABELS
      ]
    : writer;

export const listPromptSdlcLocalWriters = (
  installedWriterIds: readonly string[],
): readonly (typeof PREFERENCE)[number][] =>
  PREFERENCE.filter((writer) => installedWriterIds.includes(writer));

export const choosePromptSdlcLocalModels = (
  installedWriterIds: readonly string[],
): {
  readonly judge: (typeof PREFERENCE)[number];
  readonly improver: (typeof PREFERENCE)[number];
} | null => {
  const available = listPromptSdlcLocalWriters(installedWriterIds);
  const judge = available[0];
  if (judge === undefined) {
    return null;
  }

  return { judge, improver: available[1] ?? judge };
};

export const readPromptSdlcLocalRunModels = (
  installedWriterIds: readonly string[],
  postedJudge: string | null,
  postedImprover: string | null,
): {
  readonly judge: (typeof PREFERENCE)[number];
  readonly improver: (typeof PREFERENCE)[number];
} | null => {
  const available = listPromptSdlcLocalWriters(installedWriterIds);
  const defaults = choosePromptSdlcLocalModels(installedWriterIds);
  if (defaults === null) {
    return null;
  }
  if (available.length < 2) {
    return defaults;
  }

  const judge = available.find((writer) => writer === postedJudge);
  const improver = available.find((writer) => writer === postedImprover);
  if (judge === undefined || improver === undefined) {
    return null;
  }

  return { judge, improver };
};
