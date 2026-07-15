import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { canViewPublishedCapability } from "@/lib/capabilities/canViewPublishedCapability";
import { requireAuth } from "@/lib/auth/requireAuth";
import { buildHarnessMarketplaceBorrowPayload } from "@/lib/harness/buildHarnessMarketplaceBorrowPayload";
import { canViewHarnessSet } from "@/lib/harness/harnessSetSharingQueries";
import {
  HARNESS_BORROW_RATE_LIMIT,
  isHarnessBorrowRateLimited,
  recordHarnessBorrow,
} from "@/lib/harness/harnessBorrowAudit";
import { getHarnessCatalogSnapshot } from "@/lib/harness/harnessCatalogMutations";
import { listOnlineHarnessOwnerIds } from "@/lib/harness/listOnlineHarnessOwnerIds";

export const dynamic = "force-dynamic";

interface RouteContext {
  readonly params: Promise<{
    readonly capabilityId: string;
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

  const { capabilityId } = await context.params;
  const capability = await getPublishedCapabilityById(capabilityId);

  if (capability === null || capability.harnessSetSlug === null) {
    return Response.json({ error: "Listing not found." }, { status: 404 });
  }

  const canView = await canViewPublishedCapability(
    actor.id,
    capability.ownerUserId,
    capability.visibility,
    capability.groupId,
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

  const snapshot = await getHarnessCatalogSnapshot(capability.ownerUserId);

  if (snapshot === null) {
    return Response.json(
      { error: "Owner has not published a setup catalog yet." },
      { status: 404 },
    );
  }

  const canViewSet =
    capability.harnessSetSlug === null
      ? false
      : await canViewHarnessSet(
          actor.id,
          capability.ownerUserId,
          capability.harnessSetSlug,
        );

  if (!canViewSet) {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }

  await recordHarnessBorrow({
    borrowerUserId: actor.id,
    ownerUserId: capability.ownerUserId,
  });

  const borrow = await buildHarnessMarketplaceBorrowPayload(
    capability,
    snapshot,
    actor.id,
    listOnlineHarnessOwnerIds().has(capability.ownerUserId),
  );

  return Response.json({ ok: true, borrow });
}
