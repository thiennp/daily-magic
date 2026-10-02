import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";

export type ProjectAccessRequestStatus =
  "pending" | "approved" | "denied" | "expired";

export default interface ProjectAccessRequestRecord {
  readonly id: string;
  readonly projectId: string;
  readonly requesterUserId: string;
  readonly invitedByUserId: string | null;
  readonly reason: string | null;
  readonly requestedScopes: readonly ProjectAclScope[];
  readonly status: ProjectAccessRequestStatus;
  readonly decidedByUserId: string | null;
  readonly decidedAt: string | null;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly inviteId: string | null;
  readonly teamLabel: string | null;
  /** Agent nickname suggestion from invite redeem; owner may override on Approve. */
  readonly suggestedProjectDisplayName: string | null;
}
