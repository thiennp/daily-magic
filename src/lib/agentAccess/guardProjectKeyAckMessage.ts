import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { asRowArray, getSql } from "@/lib/db";

/**
 * ack_project_message carries only a messageId, so the project-key projectId guard never sees a
 * project. A project key may ack only messages of its own project.
 */
export const guardProjectKeyAckMessage = async (input: {
  readonly name: string;
  readonly args: unknown;
  readonly keyProjectId: string;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name !== "ack_project_message") return null;
  const messageId =
    input.args !== null && typeof input.args === "object"
      ? (input.args as { messageId?: unknown }).messageId
      : undefined;
  if (typeof messageId !== "string") return null;
  const rows = asRowArray(
    await getSql()`
      SELECT project_id FROM project_messages WHERE id = ${messageId} LIMIT 1
    `,
  );
  if (rows.length === 0 || String(rows[0].project_id) === input.keyProjectId) {
    return null;
  }
  return agentAccessTextResult(
    {
      ok: false,
      error: "Project API key is not valid for this message's project.",
      code: "forbidden",
    },
    true,
  );
};
