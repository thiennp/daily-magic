import type { RailAvatar } from "@/features/projects/members/AwcProjectMembersRailHeading";
import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";
import { isRailAssistantMember } from "@/features/projects/members/utils/countRailMembers";

const initialsOf = (label: string): string =>
  label.trim().slice(0, 2).toUpperCase() || "?";

/** People first (you, then joined), then assistants; the header stacks the first four. */
export const buildRailAvatars = (
  ownerLabel: string,
  members: readonly AccessMembershipView[],
): readonly RailAvatar[] => [
  { initials: initialsOf(ownerLabel), assistant: false },
  ...members
    .filter((m) => !m.isAgent)
    .map((m) => ({
      initials: initialsOf(m.displayName ?? m.userId),
      assistant: false,
    })),
  ...members.filter(isRailAssistantMember).map((m) => ({
    initials: initialsOf(m.projectDisplayName ?? m.userId),
    assistant: true,
  })),
];
