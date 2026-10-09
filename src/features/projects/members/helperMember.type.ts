import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";

export type HelperMember = Pick<
  AccessMembershipView,
  | "id"
  | "userId"
  | "projectDisplayName"
  | "wakeLinkSet"
  | "deliveryMode"
  | "canManageBot"
  | "isolatedFromOtherBots"
  | "guidanceOutdated"
>;
