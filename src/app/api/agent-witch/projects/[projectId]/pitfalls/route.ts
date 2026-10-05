import {
  formatProjectPitfallsForBot,
  listProjectPitfalls,
  projectPitfallFailureResponse,
  upsertProjectPitfall,
} from "@/features/project-pitfalls/public-api/infrastructure";
import { resolveAgentWitchRequestActorUserId } from "@/lib/agentWitch/resolveAgentWitchRequestActorUserId";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ readonly projectId: string }> };

const isTruthyParam = (value: string | null): boolean =>
  value === "true" || value === "1";

/** GET: merged pitfalls (?includeRetired=true, ?format=bot → `id|avoidance`). */
export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const actorUserId = await resolveAgentWitchRequestActorUserId(request);
  if (actorUserId instanceof Response) return actorUserId;
  const { projectId } = await context.params;
  const params = new URL(request.url).searchParams;
  const result = await listProjectPitfalls({
    actorUserId,
    projectId,
    includeRetired: isTruthyParam(params.get("includeRetired")),
  });
  if (!result.ok) return projectPitfallFailureResponse(result);
  const count = result.pitfalls.length;
  if (params.get("format") === "bot") {
    const text = formatProjectPitfallsForBot(result.pitfalls);
    return Response.json({ ok: true, projectId, format: "bot", count, text });
  }
  return Response.json({
    ok: true,
    projectId,
    count,
    pitfalls: result.pitfalls,
    syncedAt: new Date().toISOString(),
  });
}

/** PUT/POST: upsert full content; a seed id becomes this project's override. */
export async function PUT(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const actorUserId = await resolveAgentWitchRequestActorUserId(request);
  if (actorUserId instanceof Response) return actorUserId;
  const { projectId } = await context.params;
  const body: unknown = await request.json().catch(() => null);
  const result = await upsertProjectPitfall({ actorUserId, projectId, body });
  if (!result.ok) return projectPitfallFailureResponse(result);
  return Response.json({ ok: true, pitfall: result.pitfall });
}

export const POST = PUT;
