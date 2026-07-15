import { getAgentAutomationById } from "@/lib/automations/agentAutomationQueries";
import { verifyAutomationWebhookSecret } from "@/lib/automations/automationWebhookSecret";
import { dispatchAgentAutomation } from "@/lib/automations/dispatchAgentAutomation";
import { parseAutomationTriggerFieldValues } from "@/lib/automations/parseAgentAutomationBody";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";
import { asRowArray, getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

const readWebhookSecretHash = async (
  automationId: string,
): Promise<string | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT webhook_secret_hash
      FROM agent_automations
      WHERE id = ${automationId}
        AND trigger_type = ${AGENT_AUTOMATION_TRIGGER_TYPES.WEBHOOK}
      LIMIT 1
    `,
  );

  const hash = rows[0]?.webhook_secret_hash;
  return typeof hash === "string" && hash.length > 0 ? hash : null;
};

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await context.params;
  const automation = await getAgentAutomationById(id);

  if (
    automation === null ||
    automation.triggerType !== AGENT_AUTOMATION_TRIGGER_TYPES.WEBHOOK
  ) {
    return Response.json(
      { ok: false, errorMessage: "Not found." },
      { status: 404 },
    );
  }

  const secretHash = await readWebhookSecretHash(id);
  const providedSecret =
    request.headers.get("x-automation-secret")?.trim() ??
    request.headers
      .get("authorization")
      ?.replace(/^Bearer\s+/i, "")
      .trim() ??
    "";

  if (
    secretHash === null ||
    providedSecret.length === 0 ||
    !verifyAutomationWebhookSecret(providedSecret, secretHash)
  ) {
    return Response.json(
      { ok: false, errorMessage: "Unauthorized." },
      { status: 401 },
    );
  }

  const body: unknown = await request.json().catch(() => ({}));
  const fieldValueOverrides = parseAutomationTriggerFieldValues(body) ?? {};
  const result = await dispatchAgentAutomation({
    automationId: id,
    runtime: getAgentWitchHub(),
    source: "webhook",
    fieldValueOverrides,
  });

  return Response.json({
    ok: result.ok,
    automation: result.automation,
    agentRunId: result.agentRunId,
    errorMessage: result.errorMessage,
  });
}
