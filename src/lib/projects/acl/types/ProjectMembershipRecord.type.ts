import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";

export type ProjectMembershipRole = "owner" | "member";
export type ProjectMembershipStatus = "active" | "revoked" | "naming_required";

export default interface ProjectMembershipRecord {
  readonly id: string;
  readonly projectId: string;
  readonly userId: string;
  readonly role: ProjectMembershipRole;
  readonly status: ProjectMembershipStatus;
  readonly teamLabel: string | null;
  readonly scopes: readonly ProjectAclScope[];
  readonly projectDisplayName: string | null;
  readonly createdAt: string;
  readonly revokedAt: string | null;
}
