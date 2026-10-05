import type { HumanJoinedMemberRow } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

/** Access membership shape used for People Joined (S0 may omit memberKind). */
export type AccessMemberForHumanFilter = {
  readonly id: string;
  readonly userId: string;
  readonly role?: string;
  readonly status?: string;
  readonly isAgent: boolean;
  readonly memberKind?: "human" | "bot" | string;
  readonly email?: string | null;
  readonly displayName?: string | null;
  readonly createdAt?: string;
};

/**
 * Prefer memberKind=human when present; else stub with !isAgent
 * (S0 MembershipView lacks memberKind — coordinate with Invite for payload).
 */
export const filterJoinedHumanMembers = (
  members: readonly AccessMemberForHumanFilter[],
): readonly HumanJoinedMemberRow[] =>
  members
    .filter((member) => {
      if (member.status !== undefined && member.status !== "active") {
        return false;
      }
      if (member.memberKind === "human") {
        return true;
      }
      if (member.memberKind === "bot") {
        return false;
      }
      return !member.isAgent;
    })
    .filter((member) => {
      const role = member.role ?? "member";
      return role === "member" || role === "viewer";
    })
    .map((member) => ({
      membershipId: member.id,
      userId: member.userId,
      email: member.email ?? null,
      displayName: member.displayName ?? null,
      role: (member.role ?? "member") as HumanJoinedMemberRow["role"],
      memberKind: "human" as const,
      membershipState: "active" as const,
      joinedAt: member.createdAt ?? null,
    }));
