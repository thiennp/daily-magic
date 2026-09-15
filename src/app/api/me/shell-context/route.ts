import { listGroupsForMember } from "@/lib/auth/listGroupsForMember";
import { requireAuth } from "@/lib/auth/requireAuth";
import { isPrivilegedGlobalRole } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const groups = await listGroupsForMember(actor.id);
  const teamNavEnabled = groups.length > 0;
  const showAdminNav =
    teamNavEnabled || isPrivilegedGlobalRole(actor.globalRole);

  return Response.json({
    ok: true,
    teamNavEnabled,
    showAdminNav,
  });
}
