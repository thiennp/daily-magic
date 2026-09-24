import { isNonEmptyString, isType } from "guardz";

import { listAgentWitchDevicesForUser } from "@/lib/agentWitch/listAgentWitchDevicesForUser";
import { getAgentRunForParticipant } from "@/lib/dispatch/getAgentRunForParticipant";
import { listAgentRunsForUser } from "@/lib/dispatch/listAgentRunsForUser";

import { executeAgentAccessSendTask } from "@/lib/agentAccess/executeAgentAccessSendTask";
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
import { summarizeAgentAccessRun } from "@/lib/agentAccess/summarizeAgentAccessRun";

const runIdArgs = isType<{ readonly runId: string }>({
  runId: isNonEmptyString,
});

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

  if (input.name === "list_runs") {
    const runs = await listAgentRunsForUser(actor.id, { limit: 20 });
    return agentAccessTextResult({
      ok: true,
      runs: runs.map(summarizeAgentAccessRun),
    });
  }

  if (input.name === "get_run" && runIdArgs(input.args)) {
    const run = await getAgentRunForParticipant(input.args.runId, actor.id);
    return run === null
      ? agentAccessTextResult(
          { ok: false, error: "Run not found.", code: "not_found" },
          true,
        )
      : agentAccessTextResult({ ok: true, run: summarizeAgentAccessRun(run) });
  }

  if (input.name === "get_run") {
    return agentAccessTextResult(
      { ok: false, error: "runId is required.", code: "invalid_arguments" },
      true,
    );
  }

  return agentAccessTextResult(
    { ok: false, error: "Unknown tool.", code: "unknown_tool" },
    true,
  );
};
