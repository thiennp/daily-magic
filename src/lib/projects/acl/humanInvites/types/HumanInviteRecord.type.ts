import type { HumanInviteRole } from "@/lib/projects/acl/humanInvites/humanInvite.constants";

export default interface HumanInviteRecord {
  readonly id: string;
  readonly projectId: string;
  readonly createdByUserId: string;
  readonly email: string | null;
  readonly role: HumanInviteRole;
  readonly maxUses: number;
  readonly usesRemaining: number;
  readonly expiresAt: string;
  readonly revokedAt: string | null;
  readonly redeemedAt: string | null;
  readonly redeemedByUserId: string | null;
  readonly createdAt: string;
}
