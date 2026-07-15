import { AGENT_AUTOMATION_LAST_RUN_STATUSES } from "@/lib/automations/AgentAutomationLastRunStatus.constant";
import { getAgentAutomationById } from "@/lib/automations/agentAutomationQueries";
import {
  linkAgentRunToAutomation,
  recordAgentAutomationRun,
} from "@/lib/automations/recordAgentAutomationRun";
import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import { updateAgentRunStatus } from "@/lib/dispatch/agentRunQueries";
import createAgentRun from "@/lib/dispatch/createAgentRun";

export const dynamic = "force-dynamic";

const parseLocalRunBody = (
  body: unknown,
): {
  readonly agentRunId: string;
  readonly exitCode: number;
  readonly output: string;
  readonly prompt: string;
} | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const record = body as Record<string, unknown>;
  const agentRunId =
    typeof record.agentRunId === "string" ? record.agentRunId.trim() : "";
  const prompt = typeof record.prompt === "string" ? record.prompt : "";
  const output = typeof record.output === "string" ? record.output : "";
  const exitCode = record.exitCode;

  if (
    agentRunId.length === 0 ||
    prompt.length === 0 ||
    typeof exitCode !== "number"
  ) {
    return null;
  }

  return { agentRunId, exitCode, output, prompt };
};

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const { id } = await context.params;
  const automation = await getAgentAutomationById(id);

  if (automation === null || automation.executorUserId !== auth.device.userId) {
    return Response.json(
      { ok: false, errorMessage: "Not found." },
      { status: 404 },
    );
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = parseLocalRunBody(body);

  if (parsed === null) {
    return Response.json(
      { ok: false, errorMessage: "Invalid local run payload." },
      { status: 400 },
    );
  }

  const status =
    parsed.exitCode === 0 ? AgentRunStatus.COMPLETED : AgentRunStatus.FAILED;

  await createAgentRun({
    id: parsed.agentRunId,
    groupId: null,
    requesterUserId: automation.ownerUserId,
    executorUserId: automation.executorUserId,
    deviceId: auth.device.id,
    prompt: parsed.prompt,
    status: AgentRunStatus.RUNNING,
    dispatchPolicy: DispatchPolicy.OPEN,
    capabilityId: automation.capabilityId,
    capabilityVersionId: null,
  });

  const run = await updateAgentRunStatus(parsed.agentRunId, status, {
    resultOutput: parsed.output,
    resultExitCode: parsed.exitCode,
  });

  await linkAgentRunToAutomation(parsed.agentRunId, automation.id);

  const updated = await recordAgentAutomationRun({
    automationId: automation.id,
    automation,
    status:
      parsed.exitCode === 0
        ? AGENT_AUTOMATION_LAST_RUN_STATUSES.OK
        : AGENT_AUTOMATION_LAST_RUN_STATUSES.FAILED,
    errorMessage: parsed.exitCode === 0 ? null : parsed.output.slice(0, 500),
  });

  return Response.json({ ok: true, automation: updated, run });
}
