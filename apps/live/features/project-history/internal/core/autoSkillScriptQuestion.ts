import { embedSkillBundle } from "@agent-witch/shared/projectSkills";

import type { AutoSkillDraftResult } from "./autoSkillDraft";
import type { AutoSkillScriptInfoPayload } from "./autoSkillCloud";
import { replayScripts } from "./autoSkillReplay";

type OkDraft = Extract<AutoSkillDraftResult, { ok: true }>;

export type ScriptQuestionParts = {
  /** SKILL.md, with the verified script bundle embedded when there is one. */
  readonly draftBody: string;
  readonly scriptInfo?: AutoSkillScriptInfoPayload;
};

/**
 * Replay the proposed scripts in a temp copy of the project, then attach the
 * permission list and replay summary to the question. Without scripts (none
 * proposed, or the proposal failed validation) the skill ships as plain text.
 */
export const buildScriptQuestionParts = async (
  draft: OkDraft,
  folderPath: string | undefined,
): Promise<ScriptQuestionParts> => {
  if (draft.scripts === undefined) {
    return { draftBody: draft.markdown };
  }
  const { proposals, bundle } = draft.scripts;
  const replay = await replayScripts(proposals, folderPath).catch(() => []);
  const byName = new Map(replay.map((r) => [r.script, r] as const));
  return {
    draftBody: embedSkillBundle(draft.markdown, bundle),
    scriptInfo: {
      scripts: proposals.map((p) => {
        const r = byName.get(p.name);
        return {
          name: p.name,
          description: p.description,
          permissions: p.permissions,
          params: p.params.map(({ name, required }) => ({ name, required })),
          replay: {
            status: r?.status ?? "not_replayed",
            exitCode: r?.exitCode ?? null,
            ms: r?.ms ?? null,
            note: r?.note ?? (r === undefined ? "replay unavailable" : null),
          },
        };
      }),
    },
  };
};
