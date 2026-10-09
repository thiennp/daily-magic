import path from "node:path";

import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliIo } from "./cliFs.types";
import { buildCursorGlobalKnowledgeRuleContent } from "./cursorGlobalKnowledgeRuleContent";
import { mergeMarkedBlock } from "./mergeMarkedBlock";
import {
  CURSOR_GLOBAL_KNOWLEDGE_RULE_RELATIVE,
  HTML_MARKER_BEGIN,
  HTML_MARKER_END,
} from "./tokenSaverMarkers.constants";
import { writeTextFileAtomic } from "./writeTextFileAtomic";

const markedBodyFromDesired = (desired: string): string =>
  desired
    .slice(
      desired.indexOf(HTML_MARKER_BEGIN) + HTML_MARKER_BEGIN.length,
      desired.indexOf(HTML_MARKER_END),
    )
    .trim();

/** Upsert alwaysApply global rule so local agents know AWB `/knowledge/update`. */
export const writeCursorGlobalKnowledgeRule = (input: {
  readonly io: CliIo;
}): CliWriteResult => {
  const filePath = path.join(
    input.io.homedir(),
    CURSOR_GLOBAL_KNOWLEDGE_RULE_RELATIVE,
  );
  const desired = buildCursorGlobalKnowledgeRuleContent();
  if (!input.io.exists(filePath)) {
    input.io.mkdirp(path.dirname(filePath));
    writeTextFileAtomic({ fs: input.io, filePath, contents: desired });
    return { ok: true, path: filePath, wrote: true };
  }
  const { next, changed } = mergeMarkedBlock({
    existing: input.io.readUtf8(filePath),
    blockBody: markedBodyFromDesired(desired),
    begin: HTML_MARKER_BEGIN,
    end: HTML_MARKER_END,
  });
  if (!changed) {
    return { ok: true, path: filePath, wrote: false };
  }
  const { backupPath } = writeTextFileAtomic({
    fs: input.io,
    filePath,
    contents: next,
    backup: true,
  });
  return { ok: true, path: filePath, wrote: true, backupPath };
};
