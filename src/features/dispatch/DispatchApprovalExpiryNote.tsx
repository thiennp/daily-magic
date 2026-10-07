import type { DispatchApprovalExpiryView } from "@/features/dispatch/dispatchApprovalExpiry.type";

interface DispatchApprovalExpiryNoteProps {
  readonly id: string;
  readonly expiry: DispatchApprovalExpiryView;
}

/**
 * S0 run approval card: time left in the 15-minute window, or why Approve and
 * Deny are off once it ended (visible reason for the disabled buttons).
 */
export default function DispatchApprovalExpiryNote({
  id,
  expiry,
}: DispatchApprovalExpiryNoteProps) {
  if (expiry.kind === "none") return null;
  if (expiry.kind === "open") {
    return (
      <p id={id} className="mt-3 text-sm text-awc-fg-muted dark:text-gray-400">
        {expiry.line}
      </p>
    );
  }
  return (
    <div id={id} role="status" className="mt-3 text-sm">
      <p className="font-medium text-awc-fg dark:text-white/90">
        {expiry.title}
      </p>
      <p className="mt-0.5 text-awc-fg-muted dark:text-gray-400">{expiry.body}</p>
    </div>
  );
}
