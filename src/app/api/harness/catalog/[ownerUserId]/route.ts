import { canViewHarnessCatalog } from "@/lib/harness/canViewHarnessCatalog";
import { filterBorrowableManifest } from "@/lib/harness/filterBorrowableManifest";
import {
  HARNESS_BORROW_RATE_LIMIT,
  isHarnessBorrowRateLimited,
  recordHarnessBorrow,
} from "@/lib/harness/harnessBorrowAudit";
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
    return Response.json({ error: "Catalog not found." }, { status: 404 });
  }

  const canView = await canViewHarnessCatalog(
    actor.id,
    ownerUserId,
    snapshot.visibility,
  );

  if (!canView) {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }

  if (await isHarnessBorrowRateLimited(actor.id)) {
    return Response.json(
      {
        error: `Borrow limit reached (${HARNESS_BORROW_RATE_LIMIT} per hour).`,
      },
      { status: 429 },
    );
  }

  await recordHarnessBorrow({
    borrowerUserId: actor.id,
    ownerUserId,
  });

  const owner = await getUserById(ownerUserId);
  const manifest = await filterBorrowableManifest(
    snapshot.manifestJson,
    actor.id,
    ownerUserId,
    snapshot.visibility,
  );

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
      manifest,
    },
  });
}
