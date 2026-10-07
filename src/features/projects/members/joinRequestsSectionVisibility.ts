/**
 * DF-017: once a project's rail has shown an open join request, keep the
 * Join requests section (and the pending list's local resolved / error state)
 * mounted even after Approve / Deny drains `pending` to []. Otherwise the
 * last request's "Approved · …" / "Denied" row vanishes on the post-action
 * reload. A section that was never non-empty still renders nothing.
 */
export const nextJoinRequestsStickyProject = (input: {
  readonly projectId: string;
  readonly pendingCount: number;
  readonly stickyProjectId: string | null;
}): string | null =>
  input.pendingCount > 0 ? input.projectId : input.stickyProjectId;

export const shouldRenderJoinRequestsSection = (input: {
  readonly projectId: string;
  readonly pendingCount: number;
  readonly expiredCount: number;
  readonly stickyProjectId: string | null;
}): boolean =>
  input.pendingCount > 0 ||
  input.expiredCount > 0 ||
  input.stickyProjectId === input.projectId;
