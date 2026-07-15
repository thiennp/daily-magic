import { listOnlineHarnessOwnerIds } from "@/lib/harness/listOnlineHarnessOwnerIds";
import { listMarketplaceForViewer } from "@/lib/marketplace/listMarketplaceForViewer";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const listings = await listMarketplaceForViewer(
    actor.id,
    listOnlineHarnessOwnerIds(),
  );

  return Response.json({ ok: true, listings });
}
