import { canViewHarnessCatalog } from "@/lib/harness/canViewHarnessCatalog";
import { getHarnessCatalogSnapshot } from "@/lib/harness/harnessCatalogMutations";
import { listOnlineHarnessOwnerIds } from "@/lib/harness/listOnlineHarnessOwnerIds";
import { getUserById } from "@/lib/auth/userRepository";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

interface RouteContext {
  readonly params: Promise<{
    readonly ownerUserId: string;
  }>;
}

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { ownerUserId } = await context.params;
  const snapshot = await getHarnessCatalogSnapshot(ownerUserId);

  if (snapshot === null) {
    return Response.json({ error: "Harness not found." }, { status: 404 });
  }

  const canView = await canViewHarnessCatalog(
    actor.id,
    ownerUserId,
    snapshot.visibility,
  );

  if (!canView) {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }

  const owner = await getUserById(ownerUserId);

  return Response.json({
    ok: true,
    borrow: {
      ownerUserId,
      ownerEmail: owner?.email ?? ownerUserId,
      ownerName: owner?.name ?? null,
      hostname: snapshot.hostname,
      visibility: snapshot.visibility,
      reportedAt: snapshot.reportedAt,
      isOnline: listOnlineHarnessOwnerIds().has(ownerUserId),
      manifest: snapshot.manifestJson,
    },
  });
}
