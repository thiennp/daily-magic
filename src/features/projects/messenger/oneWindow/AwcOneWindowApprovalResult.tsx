import type { OneWindowApprovalCardModel } from "@/features/projects/messenger/oneWindow/AwcOneWindowApprovalCard";
import { ONE_WINDOW_FEED_COPY as copy } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

/** "Approved/Denied by you at …" result line shown once a card is decided. */
export default function AwcOneWindowApprovalResult({
  model,
}: {
  readonly model: OneWindowApprovalCardModel;
}) {
  return model.status === "approved" || model.status === "denied" ? (
    <p className="mt-3 text-[13px]" role="status" aria-live="polite">
      <b
        className={model.status === "approved" ? "text-awc-ok" : "text-awc-bad"}
      >
        {(model.status === "approved"
          ? copy.approvedBy
          : copy.deniedBy
        ).replace("{time}", model.decidedAt ?? "")}
      </b>{" "}
      <span className="text-awc-fg-muted">
        {model.kind === "run"
          ? model.status === "approved"
            ? copy.runApprovedAfter
            : copy.runDeniedAfter
          : model.status === "approved"
            ? copy.joinApprovedAfter
            : copy.joinDeniedAfter}
      </span>
    </p>
  ) : null;
}
