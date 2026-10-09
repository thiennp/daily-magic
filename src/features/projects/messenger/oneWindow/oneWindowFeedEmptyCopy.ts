import type { OneWindowFeedFilter } from "@/features/projects/messenger/oneWindow/AwcOneWindowFilterBar";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

/** Empty-state title and body for the active feed filter. */
export const resolveOneWindowEmptyCopy = (
  filter: OneWindowFeedFilter,
): { readonly title: string; readonly body: string } => {
  const copy = ONE_WINDOW_FEED_COPY;
  if (filter === "needs") {
    return { title: copy.emptyNeedsTitle, body: copy.emptyNeedsBody };
  }
  if (filter === "approvals") {
    return { title: copy.emptyApprovalsTitle, body: copy.emptyApprovalsBody };
  }
  return { title: copy.emptyTitle, body: copy.emptyBody };
};
