import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { parseAgentAccessRegisterBody } from "@/lib/agentAccess/parseAgentAccessRegisterBody";
import { registerAgentAccessAccount } from "@/lib/agentAccess/registerAgentAccessAccount";
import { hashAgentAccessClientIp } from "@/lib/agentAccess/readClientIp";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";

export const executeAgentAccessRegisterTool = async (
  args: unknown,
  ip: string,
): Promise<AgentAccessToolCallResult> => {
  const parsed = parseAgentAccessRegisterBody(args);

  if (!parsed.ok) {
    return agentAccessTextResult(
      {
        ok: false,
        error: parsed.error,
        code: parsed.code,
      },
      true,
    );
  }

  const outcome = await registerAgentAccessAccount({
    body: parsed.body,
    ipHash: hashAgentAccessClientIp(ip),
  });

  return agentAccessTextResult(
    outcome.ok
      ? outcome.body
      : { ok: false, error: outcome.error, code: outcome.code },
    !outcome.ok,
  );
};
