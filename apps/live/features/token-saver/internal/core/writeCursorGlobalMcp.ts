import path from "node:path";

import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliIo } from "./cliFs.types";
import {
  CURSOR_GLOBAL_MCP_RELATIVE,
  MCP_SERVER_NAME,
  MCP_STDIO_ARGS,
  MCP_STDIO_COMMAND,
} from "./tokenSaverMarkers.constants";
import { writeTextFileAtomic } from "./writeTextFileAtomic";

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** Upsert `~/.cursor/mcp.json` agent-witch stdio server (global, install-time). */
export const writeCursorGlobalMcp = (input: {
  readonly io: CliIo;
}): CliWriteResult => {
  const filePath = path.join(input.io.homedir(), CURSOR_GLOBAL_MCP_RELATIVE);
  const server = {
    command: MCP_STDIO_COMMAND,
    args: [...MCP_STDIO_ARGS],
  };
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
  const servers = isRecord(root.mcpServers)
    ? { ...root.mcpServers }
    : {};
  const prev = servers[MCP_SERVER_NAME];
  const same =
    isRecord(prev) &&
    prev.command === server.command &&
    Array.isArray(prev.args) &&
    JSON.stringify(prev.args) === JSON.stringify(server.args);
  if (same) {
    return { ok: true, path: filePath, wrote: false };
  }
  servers[MCP_SERVER_NAME] = server;
  const next = { ...root, mcpServers: servers };
  const { backupPath } = writeTextFileAtomic({
    fs: input.io,
    filePath,
    contents: `${JSON.stringify(next, null, 2)}\n`,
    backup: input.io.exists(filePath),
  });
  return { ok: true, path: filePath, wrote: true, backupPath };
};
