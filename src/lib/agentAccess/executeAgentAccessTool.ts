import { listAgentWitchDevicesForUser } from "@/lib/agentWitch/listAgentWitchDevicesForUser";

import { executeAgentAccessRunTool } from "@/lib/agentAccess/executeAgentAccessRunTool";
import { executeAgentAccessSendTask } from "@/lib/agentAccess/executeAgentAccessSendTask";
import { executeAgentAccessWorkflowTool } from "@/lib/agentAccess/executeAgentAccessWorkflowTool";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { parseAgentAccessRegisterBody } from "@/lib/agentAccess/parseAgentAccessRegisterBody";
import { registerAgentAccessAccount } from "@/lib/agentAccess/registerAgentAccessAccount";
import { hashAgentAccessClientIp } from "@/lib/agentAccess/readClientIp";
import {
  agentAccessTextResult,
  isAgentAccessActor,
  requireAgentAccessActor,
} from "@/lib/agentAccess/requireAgentAccessActor";
import { summarizeAgentAccessMac } from "@/lib/agentAccess/summarizeAgentAccessMac";

const registerAccount = async (
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

export const executeAgentAccessTool = async (input: {
  readonly name: string;
  readonly args: unknown;
  readonly authorization: string | null;
  readonly ip: string;
}): Promise<AgentAccessToolCallResult> => {
  if (input.name === "register_account") {
    return registerAccount(input.args, input.ip);
  }

  const actor = await requireAgentAccessActor(input.authorization);

  if (!isAgentAccessActor(actor)) {
    return actor;
  }

  if (input.name === "whoami") {
    return agentAccessTextResult({
      ok: true,
      account: {
        id: actor.id,
        email: actor.email,
        displayName: actor.name,
        registrationMethod: actor.registrationMethod,
      },
    });
  }

  if (input.name === "list_macs") {
    const devices = await listAgentWitchDevicesForUser(actor.id);
    return agentAccessTextResult({
      ok: true,
      macs: devices.map(summarizeAgentAccessMac),
    });
  }

  if (input.name === "send_task") {
    return executeAgentAccessSendTask(actor, input.args);
  }

  const workflowResult = await executeAgentAccessWorkflowTool({
    actor,
    name: input.name,
    args: input.args,
  });

  if (workflowResult !== null) {
    return workflowResult;
  }

  const runResult = await executeAgentAccessRunTool(
    actor,
    input.name,
    input.args,
  );

  if (runResult !== null) {
    return runResult;
  }

  return agentAccessTextResult(
    { ok: false, error: "Unknown tool.", code: "unknown_tool" },
    true,
  );
};
