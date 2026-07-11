import { getHarnessCatalogSnapshot } from "@/lib/harness/harnessCatalogMutations";
import { requestHarnessManifestPublish } from "@/lib/harness/requestHarnessManifestPublish";
import { getUserHarnessSharingVisibility } from "@/lib/harness/harnessSharingVisibilityQueries";
import { listOnlineAgentUserIds } from "@/lib/dispatch/listOnlineAgentUserIds";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const [visibility, snapshot] = await Promise.all([
    getUserHarnessSharingVisibility(actor.id),
    getHarnessCatalogSnapshot(actor.id),
  ]);
  const isAgentOnline = listOnlineAgentUserIds([actor.id]).has(actor.id);

  return Response.json({
    ok: true,
    visibility,
    isAgentOnline,
    catalog: snapshot
      ? {
          hostname: snapshot.hostname,
          reportedAt: snapshot.reportedAt,
          updatedAt: snapshot.updatedAt,
        }
      : null,
  });
}

export async function POST(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const result = requestHarnessManifestPublish(actor.id);

  if (!result.ok) {
    return Response.json({ error: result.errorMessage }, { status: 503 });
  }

  return Response.json({ ok: true, publishRequested: true });
}
