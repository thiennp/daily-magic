import path from "node:path";

import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliIo } from "./cliFs.types";
import {
  CLAUDE_GLOBAL_SETTINGS_RELATIVE,
  CLAUDE_HOOK_COMMAND,
  CLAUDE_STOP_HOOK_COMMAND,
  TOKEN_SAVER_MARKER,
} from "./tokenSaverMarkers.constants";
import { writeTextFileAtomic } from "./writeTextFileAtomic";

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const hookEntry = (command: string, timeout: number) => ({
  hooks: [
    {
      type: "command",
      command,
      timeout,
      // marker for idempotent upsert / uninstall
      [TOKEN_SAVER_MARKER]: true,
    },
  ],
});

/** UserPromptSubmit injects notes (3s); Stop learns from the finished turn (25s). */
const OUR_HOOKS = [
  { event: "UserPromptSubmit", command: CLAUDE_HOOK_COMMAND, timeout: 3 },
  { event: "Stop", command: CLAUDE_STOP_HOOK_COMMAND, timeout: 25 },
] as const;

const hasOurHook = (entries: unknown, command: string): boolean =>
  Array.isArray(entries) &&
  entries.some(
    (entry) =>
      isRecord(entry) &&
      Array.isArray(entry.hooks) &&
      entry.hooks.some(
        (h) =>
          isRecord(h) &&
          (h.command === command || h[TOKEN_SAVER_MARKER] === true),
      ),
  );

/** Upsert the UserPromptSubmit and Stop hooks in `~/.claude/settings.json` (install-time). */
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
  const missing = OUR_HOOKS.filter(
    (ours) => !hasOurHook(hooks[ours.event], ours.command),
  );
  if (missing.length === 0) {
    return { ok: true, path: filePath, wrote: false };
  }
  for (const ours of missing) {
    const existing = hooks[ours.event];
    hooks[ours.event] = [
      ...(Array.isArray(existing) ? existing : []),
      hookEntry(ours.command, ours.timeout),
    ];
  }
  const { backupPath } = writeTextFileAtomic({
    fs: input.io,
    filePath,
    contents: `${JSON.stringify({ ...root, hooks }, null, 2)}\n`,
    backup: input.io.exists(filePath),
  });
  return { ok: true, path: filePath, wrote: true, backupPath };
};
