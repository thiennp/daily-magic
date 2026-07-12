import { listHarnessMarketplaceForViewer } from "@/lib/harness/listHarnessMarketplaceForViewer";
import { listOnlineHarnessOwnerIds } from "@/lib/harness/listOnlineHarnessOwnerIds";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const listings = await listHarnessMarketplaceForViewer(
    actor.id,
    listOnlineHarnessOwnerIds(),
  );

  return Response.json({ ok: true, listings });
}
