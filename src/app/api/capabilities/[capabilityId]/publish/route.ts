import { publishCapabilityVersion } from "@/lib/capabilities/publishCapabilityVersion";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  context: { params: Promise<{ capabilityId: string }> },
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

  const published = await publishCapabilityVersion(
    capabilityId,
    actor.id,
    "Republished",
  );

  return Response.json({ ok: true, capability: published });
}
