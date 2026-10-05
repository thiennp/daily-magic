export type InboxDispatchPeerOption = {
  readonly membershipId: string;
  readonly projectDisplayName: string;
  readonly memberKind: "bot" | "computer";
};

type InboxDispatchPeerMember = {
  readonly id: string;
  readonly projectDisplayName: string | null;
  readonly isAgent: boolean;
  readonly memberKind?: "human" | "bot" | "computer" | string;
  readonly assignable?: boolean;
  readonly connectVersionStatus?: "ok" | "too_old" | string;
};

const peerLabel = (
  name: string,
  memberKind: "bot" | "computer",
): string => (memberKind === "computer" ? `${name} · computer` : name);

/**
 * Assign picker peers: active bots (isAgent) and assignable computers.
 * Computers use `id` as membership id; never skipped solely for isAgent=false.
 * Skip computer when not assignable or Connect too_old.
 */
export const inboxDispatchPeerOptions = (
  members: readonly InboxDispatchPeerMember[],
): readonly InboxDispatchPeerOption[] => {
  const options: InboxDispatchPeerOption[] = [];
  for (const member of members) {
    const name = member.projectDisplayName?.trim() ?? "";
    if (name.length === 0) {
      continue;
    }
    if (member.memberKind === "computer") {
      if (
        member.assignable !== true ||
        member.connectVersionStatus === "too_old"
      ) {
        continue;
      }
      options.push({
        membershipId: member.id,
        projectDisplayName: peerLabel(name, "computer"),
        memberKind: "computer",
      });
      continue;
    }
    if (!member.isAgent) {
      continue;
    }
    options.push({
      membershipId: member.id,
      projectDisplayName: peerLabel(name, "bot"),
      memberKind: "bot",
    });
  }
  return options;
};
