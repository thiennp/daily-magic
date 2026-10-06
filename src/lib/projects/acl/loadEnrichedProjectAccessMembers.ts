import { buildMembershipViews } from "@/lib/projects/acl/buildProjectAccessViews";
import { enrichProjectAccessBotWakeLinks } from "@/lib/projects/acl/enrichProjectAccessBotWakeLinks";
import { enrichProjectAccessComputerMembers } from "@/lib/projects/acl/enrichProjectAccessComputerMembers";
import { ensureProjectLinkedComputerSeat } from "@/lib/projects/acl/ensureProjectLinkedComputerSeat";
import { listProjectMembershipsForProject } from "@/lib/projects/acl/listProjectMembershipsForProject";
import { resolveAccessComputerLiveDeviceIds } from "@/lib/projects/acl/resolveAccessComputerLiveDeviceIds";
import type { MembershipView } from "@/lib/projects/acl/buildProjectAccessViews";

/** List + enrich access members; owner path backfills linked-device computer seat. */
export const loadEnrichedProjectAccessMembers = async (input: {
  readonly projectId: string;
  readonly isOwner: boolean;
  readonly ownerUserId: string;
  readonly projectDeviceId: string | null;
}): Promise<readonly MembershipView[]> => {
  let rows = await listProjectMembershipsForProject(input.projectId);
  let base = await buildMembershipViews(rows);
  if (input.isOwner) {
    const wrote = await ensureProjectLinkedComputerSeat({
      projectId: input.projectId,
      ownerUserId: input.ownerUserId,
      deviceId: input.projectDeviceId,
      members: base,
    });
    if (wrote) {
      rows = await listProjectMembershipsForProject(input.projectId);
      base = await buildMembershipViews(rows);
    }
  }
  const live = await resolveAccessComputerLiveDeviceIds(base);
  const enriched = await enrichProjectAccessComputerMembers(base, live);
  return input.isOwner
    ? enrichProjectAccessBotWakeLinks(input.projectId, enriched)
    : enriched;
};
