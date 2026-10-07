/**
 * POST /api/projects/:projectId/sync/tasks-meta
 * Allowlisted Neon meta upsert for History reconcile (SPEC §3.2 / §7).
 * Behind AWC_PROJECT_SYNC_MODULE. Meta only — rejects body fields.
 */

import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { isProjectSyncModuleEnabled } from "@/features/projects/sync/projectSyncFlag";
import { upsertProjectTaskNeonMeta } from "@/features/projects/sync/adapters/upsertProjectTaskNeonMeta";
import { gateNeonUpsertAfterIdb } from "@/features/projects/sync/adapters/neonMetaIdbGuard";
import type { IdbFailureKind } from "@/features/projects/sync/adapters/neonMetaIdbGuard";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string }>;
};

type TasksMetaBody = {
  readonly batch?: unknown;
  /** Optional IDB outcome from client reconcile — Soft degrade if failed. */
  readonly idb?: {
    readonly ok: boolean;
    readonly failure?: IdbFailureKind;
  };
};

export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  if (!isProjectSyncModuleEnabled()) {
    return Response.json(
      { ok: false, reason: "project_sync_module_disabled" },
      { status: 404 },
    );
  }

  const { actor, error } = await requireAuth();
  if (error || !actor) return error;

  const { projectId } = await context.params;
  const page = await authorizeProjectPageActor({
    projectId,
    actorUserId: actor.id,
  });
  if (!page.ok) {
    const status = page.reason === "not_found" ? 404 : 403;
    return projectAccessErrorJson(page.reason, status);
  }

  let body: TasksMetaBody;
  try {
    body = (await request.json()) as TasksMetaBody;
  } catch {
    return Response.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  const batch = Array.isArray(body.batch) ? body.batch : null;
  if (batch === null) {
    return Response.json(
      { ok: false, reason: "batch_required" },
      { status: 400 },
    );
  }

  // IDB Soft degrade: failure must never trigger Neon write.
  if (body.idb && body.idb.ok === false) {
    const gated = await gateNeonUpsertAfterIdb({
      idb: {
        ok: false,
        failure: body.idb.failure ?? "read_fail",
      },
      upsert: async () => ({ ok: true as const, upserted: [] }),
    });
    if ("neonUnchanged" in gated && gated.neonUnchanged) {
      return Response.json({
        ok: true,
        idbDegraded: true,
        failure: gated.failure,
        neonUnchanged: true,
        upserted: 0,
      });
    }
  }

  const result = await upsertProjectTaskNeonMeta({
    projectId,
    batch: batch as Readonly<Record<string, unknown>>[],
  });
  if (!result.ok) {
    return Response.json(
      { ok: false, reason: result.reason },
      { status: 400 },
    );
  }
  return Response.json({
    ok: true,
    upserted: result.upserted.length,
    updatedAgentRunIds: result.updatedAgentRunIds,
  });
}
