import path from "node:path";

import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliIo } from "./cliFs.types";
import {
  CLAUDE_GLOBAL_SETTINGS_RELATIVE,
  CLAUDE_HOOK_COMMAND,
  TOKEN_SAVER_MARKER,
} from "./tokenSaverMarkers.constants";
import { writeTextFileAtomic } from "./writeTextFileAtomic";

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const HOOK_ENTRY = {
  hooks: [
    {
      type: "command",
      command: CLAUDE_HOOK_COMMAND,
      timeout: 3,
      // marker for idempotent upsert / uninstall
      [TOKEN_SAVER_MARKER]: true,
    },
  ],
};

const hasOurHook = (entries: unknown): boolean =>
  Array.isArray(entries) &&
  entries.some(
    (entry) =>
      isRecord(entry) &&
      Array.isArray(entry.hooks) &&
      entry.hooks.some(
        (h) =>
          isRecord(h) &&
          (h.command === CLAUDE_HOOK_COMMAND || h[TOKEN_SAVER_MARKER] === true),
      ),
  );

/** Upsert UserPromptSubmit hook in `~/.claude/settings.json` (install-time). */
export const writeClaudeGlobalHook = (input: {
  readonly io: CliIo;
}): CliWriteResult => {
  const filePath = path.join(
    input.io.homedir(),
    CLAUDE_GLOBAL_SETTINGS_RELATIVE,
  );
  let root: Record<string, unknown> = {};
  if (input.io.exists(filePath)) {
    try {
      const parsed: unknown = JSON.parse(input.io.readUtf8(filePath));
      if (isRecord(parsed)) {
        root = { ...parsed };
      }
    } catch {
      root = {};
    }
  }
  const hooks = isRecord(root.hooks) ? { ...root.hooks } : {};
  const existing = hooks.UserPromptSubmit;
  if (hasOurHook(existing)) {
    return { ok: true, path: filePath, wrote: false };
  }
  const list = Array.isArray(existing) ? [...existing] : [];
  list.push(HOOK_ENTRY);
  hooks.UserPromptSubmit = list;
  const { backupPath } = writeTextFileAtomic({
    fs: input.io,
    filePath,
    contents: `${JSON.stringify({ ...root, hooks }, null, 2)}\n`,
    backup: input.io.exists(filePath),
  });
  return { ok: true, path: filePath, wrote: true, backupPath };
};
