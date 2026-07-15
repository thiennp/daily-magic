import { createAgentAutomation } from "@/lib/automations/createAgentAutomation";
import { listAgentAutomationsForOwner } from "@/lib/automations/agentAutomationQueries";
import { parseCreateAgentAutomationBody } from "@/lib/automations/parseAgentAutomationBody";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const automations = await listAgentAutomationsForOwner(actor.id);

  return Response.json({ ok: true, automations });
}

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = parseCreateAgentAutomationBody(body);

  if (parsed === null) {
    return Response.json(
      { ok: false, errorMessage: "Invalid automation payload." },
      { status: 400 },
    );
  }

  const result = await createAgentAutomation(actor.id, parsed);

  if (result === null) {
    return Response.json(
      { ok: false, errorMessage: "Workflow not found in your library." },
      { status: 404 },
    );
  }

  return Response.json({
    ok: true,
    automation: result.automation,
    webhookSecret: result.webhookSecret,
    webhookUrl:
      result.webhookSecret !== null
        ? `/api/automations/${result.automation.id}/trigger`
        : null,
  });
}
