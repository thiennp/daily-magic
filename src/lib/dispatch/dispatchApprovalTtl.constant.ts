export const DISPATCH_APPROVAL_TTL_MS = 15 * 60 * 1000;

export const buildDispatchApprovalExpiresAt = (): string =>
  new Date(Date.now() + DISPATCH_APPROVAL_TTL_MS).toISOString();
