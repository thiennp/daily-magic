import type { ProjectMembershipDeliveryMode } from "@/lib/projects/acl/membershipDeliveryMode.constant";

/** How the assistant proved who it belongs to before asking to join. */
export type AssistantConnectVia = "device_code" | "sign_in";

/**
 * Owner approval card data (Non-Grok S3), one shape for device-code and
 * sign-in (remote MCP) joins. Read-only: never grants access by itself.
 */
export type PendingApprovalCardMeta = {
  /** Client / platform name the assistant connected with (e.g. "Claude"). */
  readonly assistantKind: string | null;
  /** True when a person claimed the assistant (agent_access_tokens.owner_user_id). */
  readonly ownerClaimed: boolean;
  /** Claimed person's display name; null when unclaimed or unnamed. */
  readonly ownerPersonName: string | null;
  readonly connectVia: AssistantConnectVia | null;
  /** Mode the membership gets on Approve (same rule as the join writer). */
  readonly expectedDeliveryMode: ProjectMembershipDeliveryMode;
  /**
   * True only when the request's join_platform or the invite named a
   * platform. Without one the card must not promise a mode.
   */
  readonly modeKnown: boolean;
  readonly isExpired: boolean;
};
