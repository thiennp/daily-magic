import path from "node:path";

import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliIo } from "./cliFs.types";
import { mergeMarkedBlock } from "./mergeMarkedBlock";
import {
  CODEX_GLOBAL_CONFIG_RELATIVE,
  MARKER_BEGIN,
  MARKER_END,
  MCP_SERVER_NAME,
  MCP_STDIO_ARGS,
  MCP_STDIO_COMMAND,
} from "./tokenSaverMarkers.constants";
import { writeTextFileAtomic } from "./writeTextFileAtomic";

/** Upsert marked `[mcp_servers.agent-witch]` in `~/.codex/config.toml`. */
export const writeCodexGlobalConfig = (input: {
  readonly io: CliIo;
}): CliWriteResult => {
  const filePath = path.join(input.io.homedir(), CODEX_GLOBAL_CONFIG_RELATIVE);
  const argsToml = MCP_STDIO_ARGS.map((a) => `"${a}"`).join(", ");
  const body = [
    `[mcp_servers.${MCP_SERVER_NAME}]`,
    `command = "${MCP_STDIO_COMMAND}"`,
    `args = [${argsToml}]`,
  ].join("\n");
  const existing = input.io.exists(filePath) ? input.io.readUtf8(filePath) : "";
  const { next, changed } = mergeMarkedBlock({
    existing,
    blockBody: body,
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
