import { buildOwnerPendingAccessViews } from "@/lib/projects/acl/approvalCard/buildOwnerPendingAccessViews";
import { listInviterRequestIds } from "@/lib/projects/acl/listInviterRequestIds";

/** A member sees only the join requests of assistants they invited themselves. */
export const buildInviterPendingAccessViews = async (input: {
  readonly projectId: string;
  readonly userId: string;
}) => {
  const [all, mine] = await Promise.all([
    buildOwnerPendingAccessViews(input.projectId),
    listInviterRequestIds(input),
  ]);
  return {
    pendingRequests: all.pendingRequests.filter((r) => mine.has(r.id)),
    expiredRequests: all.expiredRequests.filter((r) => mine.has(r.id)),
  };
};
