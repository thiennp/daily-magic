import fs from "node:fs";

import {
  resolveAgentWitchLocalLayout,
  type AgentWitchLocalLayout,
} from "./resolveAgentWitchLocalLayout";

export interface AgentWitchRunConfig {
  readonly email: string | null;
  readonly wsUrl: string;
  readonly workspace: string;
  readonly claudeCommand: string;
  readonly codexCommand: string;
  readonly cursorCommand: string;
  readonly antigravityCommand: string;
  readonly pairingToken: string;
  readonly layout: AgentWitchLocalLayout;
}

const DEFAULT_WS_URL = "ws://localhost:3000/api/agent-witch/ws";
const DEFAULT_CLAUDE_COMMAND = "claude";
const DEFAULT_CODEX_COMMAND = "codex";
const DEFAULT_CURSOR_COMMAND = "cursor";
const DEFAULT_ANTIGRAVITY_COMMAND = "agy";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const readAgentWitchRunConfig = (): AgentWitchRunConfig | null => {
  const layout = resolveAgentWitchLocalLayout();

  if (!fs.existsSync(layout.configPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(layout.configPath, "utf8"),
    );

    if (!isRecord(parsed)) {
      return null;
    }

    const wsUrl =
      typeof parsed.wsUrl === "string" && parsed.wsUrl.length > 0
        ? parsed.wsUrl
        : DEFAULT_WS_URL;
    const workspace =
      typeof parsed.workspace === "string" && parsed.workspace.length > 0
        ? parsed.workspace
        : process.cwd();
    const pairingToken =
      typeof parsed.pairingToken === "string" ? parsed.pairingToken.trim() : "";

    return {
      email: layout.profileEmail,
      wsUrl,
      workspace,
      claudeCommand:
        typeof parsed.claudeCommand === "string" &&
        parsed.claudeCommand.length > 0
          ? parsed.claudeCommand
          : DEFAULT_CLAUDE_COMMAND,
      codexCommand:
        typeof parsed.codexCommand === "string" &&
        parsed.codexCommand.length > 0
          ? parsed.codexCommand
          : DEFAULT_CODEX_COMMAND,
      cursorCommand:
        typeof parsed.cursorCommand === "string" &&
        parsed.cursorCommand.length > 0
          ? parsed.cursorCommand
          : DEFAULT_CURSOR_COMMAND,
      antigravityCommand:
        typeof parsed.antigravityCommand === "string" &&
        parsed.antigravityCommand.length > 0
          ? parsed.antigravityCommand
          : DEFAULT_ANTIGRAVITY_COMMAND,
      pairingToken,
      layout,
    };
  } catch {
    return null;
  }
};
