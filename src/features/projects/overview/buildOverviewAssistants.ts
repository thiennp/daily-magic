import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";
import { isComputerAccessMember } from "@/features/projects/access/utils/isComputerAccessMember";
import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";

export type OverviewAssistantRow = {
  readonly membershipId: string;
  readonly name: string;
  readonly initials: string;
  readonly status: "working" | "idle" | "silent" | "checks_on_demand" | null;
  readonly lastAt: string | null;
  /** False for a closed assistant the viewer did not invite: no Message button. */
  readonly canMessage: boolean;
};

const initialsFrom = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
};

const buildOverviewAssistants = (
  members: readonly AccessMembershipView[],
  threads: AwcMessengerThreadList | null,
): readonly OverviewAssistantRow[] => {
  const assistants = members.filter(
    (m) => m.isAgent && !isComputerAccessMember(m),
  );
  return assistants.map((member) => {
    const name =
      member.projectDisplayName?.trim() ||
      member.displayName?.trim() ||
      member.userId.slice(0, 8);
    const thread = threads?.bots.find((b) => b.membershipId === member.id);
    return {
      membershipId: member.id,
      name,
      initials: initialsFrom(name),
      status: thread?.status ?? null,
      lastAt: thread?.lastMessageAt ?? null,
      canMessage: member.canMessage !== false,
    };
  });
};

export default buildOverviewAssistants;
