import { listPublishedCapabilitiesForOwner } from "@/lib/capabilities/capabilityQueries";
import publishCapabilityWithHarness from "@/lib/capabilities/publishCapabilityWithHarness";
import { parseCreateCapabilityBody } from "@/lib/capabilities/parseCapabilityBody";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

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

  const result = await publishCapabilityWithHarness(
    actor.id,
    parsed,
    parsed.harnessItems,
  );

  return Response.json({
    ok: true,
    capability: result.capability,
    harnessInstalled: result.harnessInstalled,
    harnessInstallMessage: result.harnessInstallMessage,
  });
}
