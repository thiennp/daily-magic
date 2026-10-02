export type InboxDispatchPeerOption = {
  readonly membershipId: string;
  readonly projectDisplayName: string;
};

/** Active agent members with a nickname — exclude empty / non-agents. */
export const inboxDispatchPeerOptions = (
  members: readonly {
    readonly id: string;
    readonly projectDisplayName: string | null;
    readonly isAgent: boolean;
  }[],
): readonly InboxDispatchPeerOption[] => {
  const options: InboxDispatchPeerOption[] = [];
  for (const member of members) {
    if (!member.isAgent) {
      continue;
    }
    const name = member.projectDisplayName?.trim() ?? "";
    if (name.length === 0) {
      continue;
    }
    options.push({ membershipId: member.id, projectDisplayName: name });
  }
  return options;
};
