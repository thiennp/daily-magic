import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { guardProjectApiKeyToolUse } from "@/lib/agentAccess/guardProjectApiKeyToolUse";
import { guardProjectKeyAckMessage } from "@/lib/agentAccess/guardProjectKeyAckMessage";
import type { ProjectApiKeyAuth } from "@/lib/projects/acl/projectApiKeys/resolveProjectApiKeyActor";

/** Every gate a project key (`awc_proj_`) call must pass: allowlist + projectId, then message ownership. */
export const guardProjectKeyCall = async (input: {
  readonly name: string;
  readonly args: unknown;
  readonly projectAuth: ProjectApiKeyAuth;
}): Promise<AgentAccessToolCallResult | null> =>
  guardProjectApiKeyToolUse(input) ??
  (await guardProjectKeyAckMessage({
    name: input.name,
    args: input.args,
    keyProjectId: input.projectAuth.projectId,
  }));
