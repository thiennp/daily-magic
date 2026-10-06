import { forkPublishedCapability } from "@/lib/capabilities/forkPublishedCapability";
import {
  CAPABILITY_FORK_RATE_LIMIT,
  isCapabilityForkRateLimited,
} from "@/lib/capabilities/capabilityForkAudit";
import { requireAuth } from "@/lib/auth/requireAuth";
import { readProjectIdFromUnknown } from "@/lib/projects/readProjectIdFromUnknown";
import { requireProjectIdForCreate } from "@/lib/projects/requireProjectIdForCreate";

export const dynamic = "force-dynamic";

interface RouteContext {
  readonly params: Promise<{
    readonly capabilityId: string;
  }>;
}

export async function POST(
  request: Request,
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

  const body: unknown = await request.json().catch(() => ({}));

  const project = await requireProjectIdForCreate({
    actorUserId: actor.id,
    projectId: readProjectIdFromUnknown(body),
  });
  if (!project.ok) {
    return Response.json(
      { error: project.error, code: project.code },
      { status: project.status },
    );
  }

  const { capabilityId } = await context.params;
  const result = await forkPublishedCapability(
    capabilityId,
    actor.id,
    project.projectId,
  );

  if (!result.ok) {
    if (result.reason === "project_required") {
      return Response.json(
        { error: "project_id is required.", code: "project_required" },
        { status: 400 },
      );
    }

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
