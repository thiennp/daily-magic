import type { HumanInviteRole } from "@/lib/projects/acl/humanInvites/humanInvite.constants";
import type {
  HumanInviteDelivery,
  HumanInviteStatus,
} from "@/lib/projects/acl/humanInvites/humanInviteEmail.constant";

export default interface HumanInviteRecord {
  readonly id: string;
  readonly projectId: string;
  readonly createdByUserId: string;
  readonly email: string | null;
  readonly requireEmailMatch: boolean;
  readonly role: HumanInviteRole;
  readonly maxUses: number;
  readonly usesRemaining: number;
  readonly expiresAt: string;
  readonly revokedAt: string | null;
  readonly redeemedAt: string | null;
  readonly redeemedByUserId: string | null;
  readonly createdAt: string;
  /** 108: DB status (pending | accepted=waiting Approve | approved | revoked | expired). */
  readonly status: HumanInviteStatus;
  readonly delivery: HumanInviteDelivery;
  readonly requiresApproval: boolean;
  readonly emailSentAt: string | null;
  readonly acceptedAt: string | null;
  readonly acceptedByUserId: string | null;
  readonly acceptedDisplayName: string | null;
  /** Accepter's verified account email; only on the owner's awaiting list. */
  readonly acceptedByEmail?: string | null;
  readonly decidedAt: string | null;
}
