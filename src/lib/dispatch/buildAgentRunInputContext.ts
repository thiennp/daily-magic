import type { AgentRunInputContext } from "@/lib/dispatch/agentRunInputContext.type";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { findAgentWitchDeviceById } from "@/lib/agentWitch/findAgentWitchDeviceById";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const WRITER_AGENT_LABELS: Readonly<Record<string, string>> = {
  "claude-cli": "Claude Code",
  codex: "Codex",
  cursor: "Cursor",
  "cursor-cloud": "Cursor Cloud",
  antigravity: "Antigravity",
};

const TASK_TITLE_MAX_CHARS = 160;
const PROMPT_WRAPPER_SEPARATOR = /\n---\n/;

/** First meaningful line of the original task, without our appended rules. */
export const resolveAgentRunTaskTitle = (prompt: string): string | null => {
  const original = prompt.split(PROMPT_WRAPPER_SEPARATOR)[0] ?? "";
  const firstLine = original
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.length > 0);
  if (firstLine === undefined) return null;
  return firstLine.length > TASK_TITLE_MAX_CHARS
    ? `${firstLine.slice(0, TASK_TITLE_MAX_CHARS - 1)}…`
    : firstLine;
};

export const buildAgentRunInputContext = async (
  run: Pick<
    AgentRunRecord,
    "writerAgent" | "projectId" | "prompt" | "deviceId"
  >,
): Promise<AgentRunInputContext> => {
  const [project, device] = await Promise.all([
    run.projectId === null ? null : getUserProjectById(run.projectId),
    run.deviceId === null ? null : findAgentWitchDeviceById(run.deviceId),
  ]);
  return {
    agentLabel: WRITER_AGENT_LABELS[run.writerAgent] ?? run.writerAgent,
    computerName: device?.displayName ?? device?.deviceLabel ?? null,
    projectName: project?.name ?? null,
    taskTitle: resolveAgentRunTaskTitle(run.prompt),
  };
};
