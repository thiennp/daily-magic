import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import {
  DEFAULT_ANTIGRAVITY_COMMAND,
  DEFAULT_CLAUDE_COMMAND,
  DEFAULT_CODEX_COMMAND,
  DEFAULT_CURSOR_COMMAND,
} from "./agentWitchClientConfigDefaults.constants";
import { resolveAgentWitchClientWsUrl } from "./resolveAgentWitchClientWsUrl";
import { resolvePreEstimateWriterMode } from "./preEstimate/resolvePreEstimateWriterMode";
import { resolveWriterExecutionBackend } from "./writerApi/resolveWriterExecutionBackend";
import type { AgentWitchClientConfig } from "./agentWitchClientConfig.type";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export interface AgentWitchClientConfigEnv {
  readonly CLAUDE_COMMAND?: string;
  readonly CODEX_COMMAND?: string;
  readonly CURSOR_COMMAND?: string;
  readonly ANTIGRAVITY_COMMAND?: string;
}

export interface ParseAgentWitchClientConfigFromRecordInput {
  readonly parsed: unknown;
  readonly layout: AgentWitchLocalLayout;
  readonly env: AgentWitchClientConfigEnv;
  readonly cwd: string;
}

export type ParseAgentWitchClientConfigFromRecordResult =
  | { readonly ok: true; readonly config: AgentWitchClientConfig }
  | {
      readonly ok: false;
      readonly reason: "not_object" | "missing_pairing_token";
    };

export const parseAgentWitchClientConfigFromRecord = (
  input: ParseAgentWitchClientConfigFromRecordInput,
): ParseAgentWitchClientConfigFromRecordResult => {
  if (!isRecord(input.parsed)) {
    return { ok: false, reason: "not_object" };
  }

  const parsed = input.parsed;
  const configWsUrl =
    typeof parsed.wsUrl === "string" ? parsed.wsUrl.trim() : "";
  const wsUrl = resolveAgentWitchClientWsUrl({
    installDir: input.layout.installDir,
    configWsUrl,
  });
  const workspace =
    typeof parsed.workspace === "string" && parsed.workspace.length > 0
      ? parsed.workspace
      : input.cwd;
  const claudeCommand =
    typeof parsed.claudeCommand === "string" && parsed.claudeCommand.length > 0
      ? parsed.claudeCommand
      : (input.env.CLAUDE_COMMAND ?? DEFAULT_CLAUDE_COMMAND);
  const codexCommand =
    typeof parsed.codexCommand === "string" && parsed.codexCommand.length > 0
      ? parsed.codexCommand
      : (input.env.CODEX_COMMAND ?? DEFAULT_CODEX_COMMAND);
  const cursorCommand =
    typeof parsed.cursorCommand === "string" && parsed.cursorCommand.length > 0
      ? parsed.cursorCommand
      : (input.env.CURSOR_COMMAND ?? DEFAULT_CURSOR_COMMAND);
  const antigravityCommand =
    typeof parsed.antigravityCommand === "string" &&
    parsed.antigravityCommand.length > 0
      ? parsed.antigravityCommand
      : (input.env.ANTIGRAVITY_COMMAND ?? DEFAULT_ANTIGRAVITY_COMMAND);
  const pairingToken =
    typeof parsed.pairingToken === "string" && parsed.pairingToken.length > 0
      ? parsed.pairingToken.trim()
      : "";
  const configEmail =
    typeof parsed.email === "string" && parsed.email.trim().length > 0
      ? parsed.email.trim().toLowerCase()
      : input.layout.profileEmail;

  if (pairingToken.length === 0) {
    return { ok: false, reason: "missing_pairing_token" };
  }

  return {
    ok: true,
    config: {
      email: configEmail,
      wsUrl,
      workspace,
      claudeCommand,
      codexCommand,
      cursorCommand,
      antigravityCommand,
      pairingToken,
      writerExecutionBackend: resolveWriterExecutionBackend(
        parsed.writerExecutionBackend,
      ),
      preEstimateWriterMode: resolvePreEstimateWriterMode(
        parsed.preEstimateWriterMode,
      ),
      layout: input.layout,
    },
  };
};
