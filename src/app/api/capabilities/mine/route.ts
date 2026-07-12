import { createPublishedCapability } from "@/lib/capabilities/createPublishedCapability";
import { publishCapabilityVersion } from "@/lib/capabilities/publishCapabilityVersion";
import { ensureDefaultAgentCapability } from "@/lib/capabilities/ensureDefaultAgentCapability";
import { listPublishedCapabilitiesForOwner } from "@/lib/capabilities/capabilityQueries";
import { parseCreateCapabilityBody } from "@/lib/capabilities/parseCapabilityBody";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  await ensureDefaultAgentCapability(actor.id);
  const capabilities = await listPublishedCapabilitiesForOwner(actor.id);

  return Response.json({ ok: true, capabilities });
}

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json();
  const parsed = parseCreateCapabilityBody(body);

  if (!parsed?.name) {
    return Response.json(
      { error: "name is required for a new assistant offering." },
      { status: 400 },
    );
  }

  const created = await createPublishedCapability({
    ownerUserId: actor.id,
    name: parsed.name,
    description: parsed.description,
    exampleRequest: parsed.exampleRequest,
    groupId: parsed.groupId,
    type: parsed.type,
    workflowFields: parsed.workflowFields,
  });
  const published = await publishCapabilityVersion(
    created.id,
    actor.id,
    "Initial publish",
  );

  return Response.json({
    ok: true,
    capability: published ?? created,
  });
}
