/** One pickable assignee: a bot, or one coding tool on one computer. */
export type AssignAgentOption = {
  readonly optionId: string;
  readonly membershipId: string;
  readonly memberKind: "bot" | "computer";
  /** Coding tool this option runs; absent for bots and unreported computers. */
  readonly writerAgent?: string;
  readonly name: string;
  readonly subtitle: string;
  readonly disabled: boolean;
  readonly statusLabel: string | null;
};

type AssignAgentMember = {
  readonly id: string;
  readonly projectDisplayName: string | null;
  readonly isAgent: boolean;
  readonly memberKind?: "human" | "bot" | "computer" | string;
  readonly assignable?: boolean;
  readonly connectVersionStatus?: "ok" | "too_old" | string;
  readonly agents?: readonly {
    readonly writerAgent: string;
    readonly label: string;
    readonly isOnline: boolean;
    readonly needsSignIn?: boolean;
  }[];
};

const computerOptions = (
  member: AssignAgentMember,
  computerName: string,
): readonly AssignAgentOption[] => {
  const ready =
    member.assignable === true && member.connectVersionStatus !== "too_old";
  if (member.agents === undefined || member.agents.length === 0) {
    return ready
      ? [
          {
            optionId: member.id,
            membershipId: member.id,
            memberKind: "computer",
            name: computerName,
            subtitle: "Computer",
            disabled: false,
            statusLabel: null,
          },
        ]
      : [];
  }
  return member.agents.map((agent) => {
    const usable = ready && agent.isOnline;
    return {
      optionId: `${member.id}:${agent.writerAgent}`,
      membershipId: member.id,
      memberKind: "computer",
      writerAgent: agent.writerAgent,
      name: agent.label,
      subtitle: computerName,
      disabled: !usable,
      statusLabel: !agent.isOnline
        ? "Offline"
        : !ready
          ? "Needs update"
          : agent.needsSignIn === true
            ? "Sign in needed"
            : null,
    };
  });
};

/**
 * Assign picker rows. Every coding tool on a computer is its own named agent
 * (offline whenever its computer is); bots stay as they are.
 */
export const buildAssignAgentOptions = (
  members: readonly AssignAgentMember[],
): readonly AssignAgentOption[] =>
  members.flatMap((member) => {
    const name = member.projectDisplayName?.trim() ?? "";
    if (name.length === 0) return [];
    if (member.memberKind === "computer") {
      return computerOptions(member, name);
    }
    return member.isAgent
      ? [
          {
            optionId: member.id,
            membershipId: member.id,
            memberKind: "bot" as const,
            name,
            subtitle: "Bot",
            disabled: false,
            statusLabel: null,
          },
        ]
      : [];
  });
