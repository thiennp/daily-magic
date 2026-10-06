import path from "node:path";

import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliIo } from "./cliFs.types";
import { mergeMarkedBlock } from "./mergeMarkedBlock";
import {
  CODEX_GLOBAL_AGENTS_RELATIVE,
  MARKER_BEGIN,
  MARKER_END,
} from "./tokenSaverMarkers.constants";
import { writeTextFileAtomic } from "./writeTextFileAtomic";

const AGENTS_BODY = [
  "On the first user message of a session, call the AgentWitch MCP tool",
  "`check_context` with the current cwd.",
  "If status is miss or none (declined), stay silent. If hit, follow the tip.",
].join("\n");

/** Upsert marked check_context instruction in `~/.codex/AGENTS.md`. */
export const writeCodexGlobalAgents = (input: {
  readonly io: CliIo;
}): CliWriteResult => {
  const filePath = path.join(input.io.homedir(), CODEX_GLOBAL_AGENTS_RELATIVE);
  const existing = input.io.exists(filePath) ? input.io.readUtf8(filePath) : "";
  const { next, changed } = mergeMarkedBlock({
    existing,
    blockBody: AGENTS_BODY,
    begin: MARKER_BEGIN,
    end: MARKER_END,
  });
  if (!changed) {
    return { ok: true, path: filePath, wrote: false };
  }
  const { backupPath } = writeTextFileAtomic({
    fs: input.io,
    filePath,
    contents: next,
    backup: existing.length > 0,
  });
  return { ok: true, path: filePath, wrote: true, backupPath };
};
