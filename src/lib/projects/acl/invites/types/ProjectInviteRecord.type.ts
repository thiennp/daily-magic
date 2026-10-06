import type { ProjectInvitePlatformValue } from "@/lib/projects/acl/invites/projectInvitePlatform.constant";
import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";

export default interface ProjectInviteRecord {
  readonly id: string;
  readonly projectId: string;
  readonly createdByUserId: string;
  readonly teamLabel: string | null;
  readonly scopes: readonly ProjectAclScope[];
  readonly maxUses: number;
  readonly usesRemaining: number;
  /** Owner opt-in: redeem auto-approves (default false). */
  readonly autoApprove: boolean;
  readonly expiresAt: string;
  readonly revokedAt: string | null;
  readonly createdAt: string;
  /** grok | muse; null = legacy / unknown (071). Optional on fixtures. */
  readonly platform?: ProjectInvitePlatformValue | null;
}
