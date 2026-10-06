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
  const initialRows = await listProjectMembershipsForProject(input.projectId);
  const initialBase = await buildMembershipViews(initialRows);
  const wrote =
    input.isOwner &&
    (await ensureProjectLinkedComputerSeat({
      projectId: input.projectId,
      ownerUserId: input.ownerUserId,
      deviceId: input.projectDeviceId,
      members: initialBase,
    }));
  const base = wrote
    ? await buildMembershipViews(
        await listProjectMembershipsForProject(input.projectId),
      )
    : initialBase;
  const live = await resolveAccessComputerLiveDeviceIds(base);
  const enriched = await enrichProjectAccessComputerMembers(base, live);
  return input.isOwner
    ? enrichProjectAccessBotWakeLinks(input.projectId, enriched)
    : enriched;
};
