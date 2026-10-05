import type { DispatchMemberKind } from "@/lib/projects/acl/messaging/lookupDispatchMembershipRecipients";

export const parseDispatchMemberKind = (value: unknown): DispatchMemberKind => {
  if (value === "human") return "human";
  if (value === "computer") return "computer";
  return "bot";
};
