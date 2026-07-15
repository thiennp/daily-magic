import { getAgentAutomationById } from "@/lib/automations/agentAutomationQueries";
import {
  deleteAgentAutomation,
  updateAgentAutomation,
} from "@/lib/automations/updateAgentAutomation";
import { parseUpdateAgentAutomationBody } from "@/lib/automations/parseAgentAutomationBody";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

const requireOwnedAutomation = async (
  automationId: string,
  ownerUserId: string,
) => {
  const automation = await getAgentAutomationById(automationId);

  if (automation === null || automation.ownerUserId !== ownerUserId) {
    return null;
  }

  return automation;
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { id } = await context.params;
  const automation = await requireOwnedAutomation(id, actor.id);

  if (automation === null) {
    return Response.json(
      { ok: false, errorMessage: "Not found." },
      { status: 404 },
    );
  }

  return Response.json({ ok: true, automation });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { id } = await context.params;
  const body: unknown = await request.json().catch(() => null);
  const parsed = parseUpdateAgentAutomationBody(body);

  if (parsed === null) {
    return Response.json(
      { ok: false, errorMessage: "Invalid automation update." },
      { status: 400 },
    );
  }

  const automation = await updateAgentAutomation(id, actor.id, parsed);

  if (automation === null) {
    return Response.json(
      { ok: false, errorMessage: "Not found." },
      { status: 404 },
    );
  }

  return Response.json({ ok: true, automation });
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { id } = await context.params;
  const deleted = await deleteAgentAutomation(id, actor.id);

  if (!deleted) {
    return Response.json(
      { ok: false, errorMessage: "Not found." },
      { status: 404 },
    );
  }

  return Response.json({ ok: true });
}
