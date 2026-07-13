import fs from "node:fs";
import path from "node:path";

import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

export const PENDING_RUN_INPUTS_FILE_NAME = "pending-run-inputs.json";

export interface PendingRunInputSession {
  readonly agentRunId: string;
  readonly originalPrompt: string;
  readonly partialOutput: string;
  readonly question: string;
  readonly accumulatedOutput: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const resolvePendingRunInputsPath = (layout: AgentWitchLocalLayout): string => {
  const profileDir = layout.profileEmail
    ? path.join(layout.installDir, "profiles", layout.profileEmail)
    : layout.installDir;

  return path.join(profileDir, PENDING_RUN_INPUTS_FILE_NAME);
};

const readPendingSessions = (
  layout: AgentWitchLocalLayout,
): Record<string, PendingRunInputSession> => {
  const filePath = resolvePendingRunInputsPath(layout);

  if (!fs.existsSync(filePath)) {
    return {};
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!isRecord(parsed)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).flatMap(([agentRunId, value]) => {
        if (!isRecord(value)) {
          return [];
        }

        const originalPrompt =
          typeof value.originalPrompt === "string" ? value.originalPrompt : "";
        const partialOutput =
          typeof value.partialOutput === "string" ? value.partialOutput : "";
        const question =
          typeof value.question === "string" ? value.question : "";
        const accumulatedOutput =
          typeof value.accumulatedOutput === "string"
            ? value.accumulatedOutput
            : partialOutput;

        if (originalPrompt.length === 0 || question.length === 0) {
          return [];
        }

        return [
          [
            agentRunId,
            {
              agentRunId,
              originalPrompt,
              partialOutput,
              question,
              accumulatedOutput,
            },
          ],
        ];
      }),
    );
  } catch {
    return {};
  }
};

const writePendingSessions = (
  layout: AgentWitchLocalLayout,
  sessions: Record<string, PendingRunInputSession>,
): void => {
  const filePath = resolvePendingRunInputsPath(layout);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(sessions, null, 2)}\n`, "utf8");
};

export const listPendingRunInputSessions = (
  layout: AgentWitchLocalLayout,
): readonly PendingRunInputSession[] =>
  Object.values(readPendingSessions(layout));

export const savePendingRunInputSession = (
  layout: AgentWitchLocalLayout,
  session: PendingRunInputSession,
): void => {
  const sessions = readPendingSessions(layout);
  sessions[session.agentRunId] = session;
  writePendingSessions(layout, sessions);
};

export const removePendingRunInputSession = (
  layout: AgentWitchLocalLayout,
  agentRunId: string,
): void => {
  const sessions = readPendingSessions(layout);
  delete sessions[agentRunId];
  writePendingSessions(layout, sessions);
};
