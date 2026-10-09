import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliFs } from "./cliFs.types";
import {
  CURSOR_PROJECT_RULE_RELATIVE,
  PROJECT_REPO_AGENTS_MD,
  PROJECT_REPO_CLAUDE_MD,
} from "./tokenSaverMarkers.constants";
import { writeCursorProjectRule } from "./writeCursorProjectRule";
import { writeGitInfoExclude } from "./writeGitInfoExclude";
import { writeProjectKnowledgeReportFragments } from "./writeProjectKnowledgeReportFragments";

export interface WriteProjectFragmentsResult {
  readonly ok: true;
  readonly cursorRule: CliWriteResult;
  readonly repoKnowledge: ReturnType<
    typeof writeProjectKnowledgeReportFragments
  >;
  readonly gitExclude:
    CliWriteResult | { readonly ok: false; readonly reason: string };
}

/**
 * Post-accept project fragments (D1: never commit; hide via .git/info/exclude).
 * Cursor rule + repo AGENTS.md / CLAUDE.md for Codex, Claude, and other agents.
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
  const repoKnowledge = writeProjectKnowledgeReportFragments({
    fs: input.fs,
    projectRoot: input.projectRoot,
    projectId: input.projectId,
  });
  const gitExclude = writeGitInfoExclude({
    fs: input.fs,
    repoRoot: input.projectRoot,
    relativePaths: [
      CURSOR_PROJECT_RULE_RELATIVE,
      PROJECT_REPO_AGENTS_MD,
      PROJECT_REPO_CLAUDE_MD,
    ],
  });
  return { ok: true, cursorRule, repoKnowledge, gitExclude };
};
