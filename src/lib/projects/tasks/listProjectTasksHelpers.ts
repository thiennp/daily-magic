import { encodeProjectActivityCursor } from "@/lib/projects/acl/activity/projectActivityCursor";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { encodeProjectTaskPriorityCursor } from "@/lib/projects/tasks/projectTaskPriorityCursor";

export const EMPTY_PAGE = { ok: true, tasks: [], nextCursor: null } as const;

/** mine → caller's active seat id (null when the caller has no seat). */
export const resolveOwnerFilter = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly mine: boolean;
  readonly ownerMembershipId: string | null;
}): Promise<{ readonly seatId: string | null; readonly none: boolean }> => {
  if (input.ownerMembershipId !== null) {
    return { seatId: input.ownerMembershipId, none: false };
  }
  if (!input.mine) return { seatId: null, none: false };
  const seat = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  return { seatId: seat?.id ?? null, none: seat === null };
};

export const nextCursorOf = (
  sort: "updated" | "priority",
  last: Record<string, unknown>,
): string =>
  sort === "priority"
    ? encodeProjectTaskPriorityCursor({
        rank: Number(last.priority_rank),
        at: String(last.cursor_at),
        id: String(last.id),
      })
    : encodeProjectActivityCursor({
        at: String(last.cursor_at),
        id: String(last.id),
      });
