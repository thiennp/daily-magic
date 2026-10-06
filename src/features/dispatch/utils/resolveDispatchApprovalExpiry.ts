import { DISPATCH_APPROVAL_EXPIRY_COPY as C } from "@/features/dispatch/dispatchApprovalExpiryCopy.constant";
import type { DispatchApprovalExpiryView } from "@/features/dispatch/dispatchApprovalExpiry.type";

const MINUTE_MS = 60_000;

/**
 * Pure: minutes left on a pending run approval (rounded up, so "1 min" shows
 * until the very end). Missing or bad expiry → none (old servers).
 */
export const resolveDispatchApprovalExpiry = (input: {
  readonly approvalExpiresAt: string | null;
  readonly requester: string;
  readonly nowMs: number;
}): DispatchApprovalExpiryView => {
  if (input.approvalExpiresAt === null) return { kind: "none" };
  const expiresMs = Date.parse(input.approvalExpiresAt);
  if (Number.isNaN(expiresMs)) return { kind: "none" };
  const leftMs = expiresMs - input.nowMs;
  if (leftMs <= 0) {
    return {
      kind: "ended",
      title: C.expiredTitle,
      body: C.expiredBody.replace("{requester}", input.requester),
    };
  }
  const minutes = Math.ceil(leftMs / MINUTE_MS);
  return {
    kind: "open",
    line: C.expiresLine.replace("{minutes}", String(minutes)),
  };
};
