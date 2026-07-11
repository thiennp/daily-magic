import { getActiveDeviceIdForUser } from "@/lib/dispatch/deviceDispatchPolicyQueries";
import { loadEffectiveDispatchPolicyBreakdown } from "@/lib/dispatch/loadEffectiveDispatchPolicyBreakdown";
import { listGroupsForMember } from "@/lib/auth/listGroupsForMember";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const url = new URL(request.url);
  const deviceIdParam = url.searchParams.get("deviceId");
  const groupIdParam = url.searchParams.get("groupId");

  if (groupIdParam !== null && groupIdParam.length > 0) {
    const groups = await listGroupsForMember(actor.id);
    const isMember = groups.some((group) => group.id === groupIdParam);
    if (!isMember) {
      return Response.json({ error: "Forbidden." }, { status: 403 });
    }
  }

  const deviceId =
    deviceIdParam !== null && deviceIdParam.length > 0
      ? deviceIdParam
      : await getActiveDeviceIdForUser(actor.id);

  const breakdown = await loadEffectiveDispatchPolicyBreakdown({
    executorUserId: actor.id,
    deviceId,
    groupId: groupIdParam,
  });

  return Response.json({
    ok: true,
    breakdown,
    deviceId,
    groupId: groupIdParam,
  });
}
