import type { ProjectMembershipDeliveryMode } from "@/lib/projects/acl/membershipDeliveryMode.constant";
import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";

export type ProjectMembershipRole = "owner" | "member" | "viewer";
export type ProjectMembershipStatus = "active" | "revoked" | "naming_required";
export type ProjectMemberKind = "human" | "bot" | "computer";

export default interface ProjectMembershipRecord {
  readonly id: string;
  readonly projectId: string;
  readonly userId: string;
  readonly role: ProjectMembershipRole;
  readonly status: ProjectMembershipStatus;
  /** Always set by mapProjectMembershipRow; optional on fixtures (default bot). */
  readonly memberKind?: ProjectMemberKind;
  readonly teamLabel: string | null;
  readonly scopes: readonly ProjectAclScope[];
  readonly projectDisplayName: string | null;
  /** Set for memberKind=computer; null otherwise. */
  readonly deviceId?: string | null;
  /** webhook (wake) | poll (Checks on demand). Mig 074; default webhook. */
  readonly deliveryMode?: ProjectMembershipDeliveryMode;
  readonly createdAt: string;
  readonly revokedAt: string | null;
  /** Set when admit was invite auto-approve; invite id prefix (8). */
  readonly autoApprovedViaInviteLabel?: string | null;
}
