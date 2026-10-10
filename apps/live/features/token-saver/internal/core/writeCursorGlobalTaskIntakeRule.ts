import path from "node:path";

import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliIo } from "./cliFs.types";
import { mergeMarkedBlock } from "./mergeMarkedBlock";
import { buildTaskIntakeStatusInstructionLines } from "./taskIntakeHookText.constant";
import {
  CURSOR_GLOBAL_TASK_INTAKE_RULE_RELATIVE,
  HTML_MARKER_BEGIN,
  HTML_MARKER_END,
} from "./tokenSaverMarkers.constants";
import { writeTextFileAtomic } from "./writeTextFileAtomic";

const FRONT_MATTER = [
  "---",
  "description: AgentWitch task intake (ask or create a task for a new request)",
  "alwaysApply: true",
  "---",
  "",
].join("\n");

/** Upsert the alwaysApply global rule that sends Cursor to `agent-witch task-intake status`. */
export const writeCursorGlobalTaskIntakeRule = (input: {
  readonly io: CliIo;
}): CliWriteResult => {
  const filePath = path.join(
    input.io.homedir(),
    CURSOR_GLOBAL_TASK_INTAKE_RULE_RELATIVE,
  );
  const existing = input.io.exists(filePath)
    ? input.io.readUtf8(filePath)
    : FRONT_MATTER;
  const { next, changed } = mergeMarkedBlock({
    existing,
    blockBody: buildTaskIntakeStatusInstructionLines().join("\n"),
    begin: HTML_MARKER_BEGIN,
    end: HTML_MARKER_END,
  });
  if (!changed && input.io.exists(filePath)) {
    return { ok: true, path: filePath, wrote: false };
  }
  input.io.mkdirp(path.dirname(filePath));
  const { backupPath } = writeTextFileAtomic({
    fs: input.io,
    filePath,
    contents: next,
    backup: input.io.exists(filePath),
  });
  return { ok: true, path: filePath, wrote: true, backupPath };
};
