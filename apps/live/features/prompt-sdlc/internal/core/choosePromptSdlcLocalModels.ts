import type { HarnessWriterAgent } from "../../../../adapters/promptSdlcAwcCore";

export const PROMPT_SDLC_MANUAL_ACTOR = "manual";

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

export type PromptSdlcLocalActor =
  (typeof PREFERENCE)[number] | typeof PROMPT_SDLC_MANUAL_ACTOR;

export const labelPromptSdlcLocalModel = (writer: string): string => {
  if (writer === PROMPT_SDLC_MANUAL_ACTOR) {
    return "You";
  }
  return writer in PROMPT_SDLC_LOCAL_MODEL_LABELS
    ? PROMPT_SDLC_LOCAL_MODEL_LABELS[
        writer as keyof typeof PROMPT_SDLC_LOCAL_MODEL_LABELS
      ]
    : writer;
};

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

const acceptedActor = (
  available: readonly (typeof PREFERENCE)[number][],
  posted: string | null,
): PromptSdlcLocalActor | null => {
  if (posted === PROMPT_SDLC_MANUAL_ACTOR) {
    return PROMPT_SDLC_MANUAL_ACTOR;
  }
  return available.find((writer) => writer === posted) ?? null;
};

export const readPromptSdlcLocalRunModels = (
  installedWriterIds: readonly string[],
  postedJudge: string | null,
  postedImprover: string | null,
): {
  readonly judge: PromptSdlcLocalActor;
  readonly improver: PromptSdlcLocalActor;
} | null => {
  const available = listPromptSdlcLocalWriters(installedWriterIds);
  const judge = acceptedActor(available, postedJudge);
  const improver = acceptedActor(available, postedImprover);
  if (judge === null || improver === null) {
    return null;
  }

  return { judge, improver };
};
