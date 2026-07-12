import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { parseUpdateCapabilityBody } from "@/lib/capabilities/parseUpdateCapabilityBody";
import { updatePublishedCapability } from "@/lib/capabilities/updatePublishedCapability";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ readonly capabilityId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { capabilityId } = await context.params;
  const existing = await getPublishedCapabilityById(capabilityId);

  if (existing === null || existing.ownerUserId !== actor.id) {
    return Response.json({ error: "Assistant not found." }, { status: 404 });
  }

  const body: unknown = await request.json();
  const parsed = parseUpdateCapabilityBody(body);

  if (!parsed) {
    return Response.json(
      { error: "Provide at least one field to update." },
      { status: 400 },
    );
  }

  const updated = await updatePublishedCapability(
    capabilityId,
    actor.id,
    parsed,
  );

  if (updated === null) {
    return Response.json(
      { error: "Could not update assistant." },
      { status: 400 },
    );
  }

  return Response.json({ ok: true, capability: updated });
}
