import type { MembershipView } from "@/lib/projects/acl/buildProjectAccessViews";
import { loadUserProfilesByIds } from "@/lib/projects/acl/isAgentUser";

export type InviterChoice = {
  readonly userId: string;
  readonly label: string;
  readonly isYou: boolean;
};

const labelOf = (m: MembershipView): string =>
  [m.projectDisplayName, m.displayName, m.email]
    .map((name) => name?.trim() ?? "")
    .find((name) => name.length > 0) ?? "Member";

/** People who can be an assistant's inviter: the owner and active human members (not viewers). */
export const buildInviterChoices = async (input: {
  readonly members: readonly MembershipView[];
  readonly ownerUserId: string;
  readonly viewerUserId: string;
}): Promise<readonly InviterChoice[]> => {
  const owner = (await loadUserProfilesByIds([input.ownerUserId])).get(
    input.ownerUserId,
  );
  const people = input.members.filter(
    (m) =>
      m.memberKind === "human" &&
      m.role === "member" &&
      (m.status === undefined || m.status === "active") &&
      m.userId !== input.ownerUserId,
  );
  return [
    {
      userId: input.ownerUserId,
      label: owner?.name?.trim() || owner?.email || "Owner",
      isYou: input.ownerUserId === input.viewerUserId,
    },
    ...people.map((m) => ({
      userId: m.userId,
      label: labelOf(m),
      isYou: m.userId === input.viewerUserId,
    })),
  ];
};
