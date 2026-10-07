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
  /** grok | muse; null = legacy / unknown (075). Optional on fixtures. */
  readonly platform?: ProjectInvitePlatformValue | null;
  /** 107: an encrypted token copy is stored, so the owner can Copy again. */
  readonly copyAvailable?: boolean;
  /** 112 (DF-038): inviting bot's membership; set = bot-made invite. */
  readonly createdByMembershipId?: string | null;
  /** 112 (DF-038): project owner the bot-made invite is bound to. */
  readonly boundOwnerUserId?: string | null;
}
