import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliFs } from "./cliFs.types";
import { CURSOR_PROJECT_RULE_RELATIVE } from "./tokenSaverMarkers.constants";
import { writeCursorProjectRule } from "./writeCursorProjectRule";
import { writeGitInfoExclude } from "./writeGitInfoExclude";

export interface WriteProjectFragmentsResult {
  readonly ok: true;
  readonly cursorRule: CliWriteResult;
  readonly gitExclude:
    CliWriteResult | { readonly ok: false; readonly reason: string };
}

/**
 * Post-accept project fragments (D1: never commit; hide via .git/info/exclude).
 * v1: Cursor alwaysApply rule only.
 * Deferred: Claude `.claude/settings.local.json` projectId; Codex repo AGENTS.md.
 */
export const writeProjectFragments = (input: {
  readonly fs: CliFs;
  readonly projectRoot: string;
  readonly projectId: string;
}): WriteProjectFragmentsResult => {
  const cursorRule = writeCursorProjectRule({
    fs: input.fs,
    projectRoot: input.projectRoot,
    projectId: input.projectId,
  });
  const gitExclude = writeGitInfoExclude({
    fs: input.fs,
    repoRoot: input.projectRoot,
    relativePaths: [CURSOR_PROJECT_RULE_RELATIVE],
  });
  return { ok: true, cursorRule, gitExclude };
};
