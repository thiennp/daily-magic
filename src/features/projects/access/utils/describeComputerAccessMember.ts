import { AWC_PROJECT_COMPUTER_MEMBER_COPY } from "@/features/projects/access/awcProjectComputerMemberCopy.constant";

export type ComputerAccessMemberStatus = "online" | "offline" | "needs_update";

/** Fields the access GET fills on `memberKind: "computer"` rows (Mac contract). */
export type ComputerAccessMemberFields = {
  readonly projectDisplayName: string | null;
  readonly ownerUserId?: string;
  readonly ownerDisplayName?: string | null;
  readonly isOnline?: boolean;
  readonly connectVersionStatus?: "ok" | "too_old" | string;
  readonly assignable?: boolean;
  readonly agents?: readonly {
    readonly writerAgent: string;
    readonly label: string;
    readonly isOnline: boolean;
  }[];
};

export type ComputerAccessMemberDescription = {
  readonly name: string;
  readonly ownerLine: string;
  readonly status: ComputerAccessMemberStatus;
  readonly statusLabel: string;
};

const resolveStatus = (
  member: ComputerAccessMemberFields,
): ComputerAccessMemberStatus => {
  if (member.isOnline !== true) {
    return "offline";
  }
  if (
    member.connectVersionStatus === "too_old" ||
    member.assignable === false
  ) {
    return "needs_update";
  }
  return "online";
};

const STATUS_LABEL: Readonly<Record<ComputerAccessMemberStatus, string>> = {
  online: AWC_PROJECT_COMPUTER_MEMBER_COPY.statusOnline,
  offline: AWC_PROJECT_COMPUTER_MEMBER_COPY.statusOffline,
  needs_update: AWC_PROJECT_COMPUTER_MEMBER_COPY.statusNeedsUpdate,
};

const resolveOwnerLine = (
  member: ComputerAccessMemberFields,
  viewerUserId: string | null,
): string => {
  const copy = AWC_PROJECT_COMPUTER_MEMBER_COPY;
  if (viewerUserId && member.ownerUserId === viewerUserId) {
    return copy.yourComputer;
  }
  const ownerName = member.ownerDisplayName?.trim() ?? "";
  return ownerName
    ? `${ownerName}${copy.ownersComputerSuffix}`
    : copy.genericOwner;
};

/** Name, owner sub-line, and Online / Offline / Needs update for a computer row. */
export const describeComputerAccessMember = (
  member: ComputerAccessMemberFields,
  viewerUserId: string | null,
): ComputerAccessMemberDescription => {
  const status = resolveStatus(member);
  const name = member.projectDisplayName?.trim() ?? "";
  return {
    name: name || AWC_PROJECT_COMPUTER_MEMBER_COPY.fallbackName,
    ownerLine: resolveOwnerLine(member, viewerUserId),
    status,
    statusLabel: STATUS_LABEL[status],
  };
};
