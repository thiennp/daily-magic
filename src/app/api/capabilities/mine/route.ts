import { listPublishedCapabilitiesForOwner } from "@/lib/capabilities/capabilityQueries";
import publishCapabilityWithHarness from "@/lib/capabilities/publishCapabilityWithHarness";
import {
  parseCreateCapabilityBody,
  parseOptionalCapabilityVisibility,
} from "@/lib/capabilities/parseCapabilityBody";
import { requireAuth } from "@/lib/auth/requireAuth";
import { readProjectIdFromUnknown } from "@/lib/projects/readProjectIdFromUnknown";

export const dynamic = "force-dynamic";

const logCapabilityCreateFailure = (error: unknown): void => {
  const name = error instanceof Error ? error.name : "Error";
  const message = error instanceof Error ? error.message : "unknown";
  console.error("capabilities.mine.create_failed", { name, message });
};

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

  const visibilityResult = parseOptionalCapabilityVisibility(body);
  if (!visibilityResult.ok) {
    return Response.json(
      { error: visibilityResult.error, code: visibilityResult.code },
      { status: 400 },
    );
  }

  const parsed = parseCreateCapabilityBody(body);

  if (!parsed?.name) {
    return Response.json(
      { error: "name is required for a new assistant offering." },
      { status: 400 },
    );
  }

  try {
    const result = await publishCapabilityWithHarness(
      actor.id,
      parsed,
      parsed.harnessItems,
      readProjectIdFromUnknown(body) ?? "",
    );

    if (!result.ok) {
      return Response.json(
        { error: result.error, code: result.code },
        { status: result.status },
      );
    }

    return Response.json({
      ok: true,
      capability: result.capability,
      harnessInstalled: result.harnessInstalled,
      harnessInstallMessage: result.harnessInstallMessage,
      projectId: result.projectId,
    });
  } catch (createError: unknown) {
    logCapabilityCreateFailure(createError);
    return Response.json(
      {
        error: "Could not create assistant offering.",
        code: "capability_create_failed",
      },
      { status: 500 },
    );
  }
}
