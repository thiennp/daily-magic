import { forkPublishedCapability } from "@/lib/capabilities/forkPublishedCapability";
import {
  CAPABILITY_FORK_RATE_LIMIT,
  isCapabilityForkRateLimited,
} from "@/lib/capabilities/capabilityForkAudit";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

interface RouteContext {
  readonly params: Promise<{
    readonly capabilityId: string;
  }>;
}

export async function POST(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  if (await isCapabilityForkRateLimited(actor.id)) {
    return Response.json(
      {
        error: `Save limit reached (${CAPABILITY_FORK_RATE_LIMIT} per hour).`,
      },
      { status: 429 },
    );
  }

  const { capabilityId } = await context.params;
  const result = await forkPublishedCapability(capabilityId, actor.id);

  if (!result.ok) {
    if (result.reason === "own_capability") {
      return Response.json(
        { error: "This assistant is already in your library." },
        { status: 400 },
      );
    }

    if (result.reason === "forbidden") {
      return Response.json({ error: "Forbidden." }, { status: 403 });
    }

    return Response.json({ error: "Assistant not found." }, { status: 404 });
  }

  return Response.json({ ok: true, capability: result.capability });
}
