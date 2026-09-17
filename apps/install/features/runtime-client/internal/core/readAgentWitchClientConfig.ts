import fs from "node:fs";

import { resolveAgentWitchLocalLayout } from "@agent-witch/install-layout";

import type { AgentWitchClientConfig } from "./agentWitchClientConfig.type";
import { parseAgentWitchClientConfigFromRecord } from "./parseAgentWitchClientConfigFromRecord";

export const readAgentWitchClientConfig = (
  profileEmailOverride?: string | null,
): AgentWitchClientConfig | null => {
  const layout = resolveAgentWitchLocalLayout(profileEmailOverride);

  if (!fs.existsSync(layout.configPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(layout.configPath, "utf8"),
    );
    const result = parseAgentWitchClientConfigFromRecord({
      parsed,
      layout,
      env: {
        CLAUDE_COMMAND: process.env.CLAUDE_COMMAND,
        CODEX_COMMAND: process.env.CODEX_COMMAND,
        CURSOR_COMMAND: process.env.CURSOR_COMMAND,
        ANTIGRAVITY_COMMAND: process.env.ANTIGRAVITY_COMMAND,
      },
      cwd: process.cwd(),
    });

    if (!result.ok) {
      if (result.reason === "not_object") {
        throw new Error("Config must be a JSON object.");
      }
      console.error(
        `[agent-witch] Missing pairingToken in ${layout.configPath}. Re-run the install script.`,
      );
      return null;
    }

    return result.config;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown config error";
    console.error(
      `[agent-witch] Invalid config at ${layout.configPath}: ${message}`,
    );
    return null;
  }
};
