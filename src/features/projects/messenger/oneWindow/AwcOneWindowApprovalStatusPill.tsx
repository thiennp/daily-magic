import type { OneWindowApprovalStatus } from "@/features/projects/messenger/oneWindow/AwcOneWindowApprovalCard";
import { ONE_WINDOW_FEED_COPY as copy } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

/** Status pill on an approval card: waiting · timed out · approved · denied. */
export default function AwcOneWindowApprovalStatusPill({
  status,
}: {
  readonly status: OneWindowApprovalStatus;
}) {
  return (
    <>
      {status === "waiting" ? (
        <span className="rounded-full bg-awc-warn-soft px-2 py-0.5 text-awc-warn">
          {copy.waitingForYou}
        </span>
      ) : null}
      {status === "timedout" ? (
        <span className="rounded-full bg-awc-tile-2 px-2 py-0.5 text-awc-fg-muted">
          {copy.timedOut}
        </span>
      ) : null}
      {status === "approved" ? (
        <span className="rounded-full bg-awc-ok-soft px-2 py-0.5 text-awc-ok">
          {copy.approved}
        </span>
      ) : null}
      {status === "denied" ? (
        <span className="rounded-full bg-awc-bad-soft px-2 py-0.5 text-awc-bad">
          {copy.denied}
        </span>
      ) : null}
    </>
  );
}
