import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { parseAgentAccessRegisterBody } from "@/lib/agentAccess/parseAgentAccessRegisterBody";
import { registerAgentAccessAccount } from "@/lib/agentAccess/registerAgentAccessAccount";
import { hashAgentAccessClientIp } from "@/lib/agentAccess/readClientIp";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";

export const executeAgentAccessRegisterTool = async (
  args: unknown,
  ip: string,
): Promise<AgentAccessToolCallResult> => {
  const body = parseAgentAccessRegisterBody(args);

  if (body === null) {
    return agentAccessTextResult(
      {
        ok: false,
        error: 'method must be "none" or "agentmail".',
        code: "invalid_arguments",
      },
      true,
    );
  }

  const outcome = await registerAgentAccessAccount({
    body,
    ipHash: hashAgentAccessClientIp(ip),
  });

  return agentAccessTextResult(
    outcome.ok
      ? outcome.body
      : { ok: false, error: outcome.error, code: outcome.code },
    !outcome.ok,
  );
};
