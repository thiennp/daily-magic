import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { ackProjectMessage } from "@/lib/projects/acl/messaging/ackProjectMessage";
import { listProjectInbox } from "@/lib/projects/acl/messaging/listProjectInbox";
import { listProjectPeers } from "@/lib/projects/acl/messaging/listProjectPeers";

const readProjectId = (args: unknown): string | null => {
  if (
    args !== null &&
    typeof args === "object" &&
    typeof (args as { projectId?: unknown }).projectId === "string"
  ) {
    return (args as { projectId: string }).projectId;
  }
  return null;
};

export const executeProjectAclInboxPeerTools = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name === "list_project_inbox") {
    const projectId = readProjectId(input.args);
    if (projectId === null) {
      return agentAccessTextResult(
        { ok: false, error: "projectId required.", code: "invalid_arguments" },
        true,
      );
    }
    const args = (input.args ?? {}) as Record<string, unknown>;
    const result = await listProjectInbox({
      projectId,
      actorUserId: input.actor.id,
      since: typeof args.since === "string" ? args.since : null,
      limit: typeof args.limit === "number" ? args.limit : undefined,
    });
    if (!result.ok) {
      return agentAccessTextResult(
        { ok: false, error: result.code, code: result.code },
        true,
      );
    }
    return agentAccessTextResult({ ok: true, messages: result.messages });
  }

  if (input.name === "ack_project_message") {
    const messageId =
      input.args !== null &&
      typeof input.args === "object" &&
      typeof (input.args as { messageId?: unknown }).messageId === "string"
        ? (input.args as { messageId: string }).messageId
        : null;
    if (messageId === null) {
      return agentAccessTextResult(
        { ok: false, error: "messageId required.", code: "invalid_arguments" },
        true,
      );
    }
    const result = await ackProjectMessage({
      messageId,
      actorUserId: input.actor.id,
    });
    if (!result.ok) {
      return agentAccessTextResult(
        { ok: false, error: result.code, code: result.code },
        true,
      );
    }
    return agentAccessTextResult({ ok: true, messageId: result.messageId });
  }

  if (input.name === "list_project_peers") {
    const projectId = readProjectId(input.args);
    if (projectId === null) {
      return agentAccessTextResult(
        { ok: false, error: "projectId required.", code: "invalid_arguments" },
        true,
      );
    }
    const result = await listProjectPeers({
      projectId,
      actorUserId: input.actor.id,
    });
    if (!result.ok) {
      return agentAccessTextResult(
        { ok: false, error: result.code, code: result.code },
        true,
      );
    }
    return agentAccessTextResult({
      ok: true,
      self: result.self,
      peers: result.peers,
    });
  }

  return null;
};
