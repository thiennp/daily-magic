import path from "node:path";

import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliFs } from "./cliFs.types";
import { buildCursorProjectRuleContent } from "./cursorProjectRuleContent";
import {
  CURSOR_PROJECT_RULE_RELATIVE,
  HTML_MARKER_BEGIN,
  HTML_MARKER_END,
} from "./tokenSaverMarkers.constants";
import { mergeMarkedBlock } from "./mergeMarkedBlock";
import { writeTextFileAtomic } from "./writeTextFileAtomic";

const markedBodyFromDesired = (desired: string): string =>
  desired
    .slice(
      desired.indexOf(HTML_MARKER_BEGIN) + HTML_MARKER_BEGIN.length,
      desired.indexOf(HTML_MARKER_END),
    )
    .trim();

/**
 * Idempotent Cursor alwaysApply rule. A new file gets frontmatter + block;
 * an existing file only has our marked block replaced or appended (unmarked
 * user lines kept, backup on change).
 */
export const writeCursorProjectRule = (input: {
  readonly fs: CliFs;
  readonly projectRoot: string;
  readonly projectId: string;
}): CliWriteResult => {
  const filePath = path.join(input.projectRoot, CURSOR_PROJECT_RULE_RELATIVE);
  const desired = buildCursorProjectRuleContent(input.projectId);
  if (!input.fs.exists(filePath)) {
    writeTextFileAtomic({ fs: input.fs, filePath, contents: desired });
    return { ok: true, path: filePath, wrote: true };
  }
  const { next, changed } = mergeMarkedBlock({
    existing: input.fs.readUtf8(filePath),
    blockBody: markedBodyFromDesired(desired),
    begin: HTML_MARKER_BEGIN,
    end: HTML_MARKER_END,
  });
  if (!changed) {
    return { ok: true, path: filePath, wrote: false };
  }
  const { backupPath } = writeTextFileAtomic({
    fs: input.fs,
    filePath,
    contents: next,
    backup: true,
  });
  return { ok: true, path: filePath, wrote: true, backupPath };
};
