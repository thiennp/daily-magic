import { AWC_PROJECT_COMPUTER_MEMBER_COPY } from "@/features/projects/access/awcProjectComputerMemberCopy.constant";
import type { AskBoxSendTarget } from "@/features/projects/askBox/public-api/types";

type DockComputerMember = {
  readonly id: string;
  readonly projectDisplayName: string | null;
  readonly memberKind?: "human" | "bot" | "computer" | string;
  readonly assignable?: boolean;
  readonly connectVersionStatus?: "ok" | "too_old" | string;
};

/**
 * Task-only Send-to chips for assignable `memberKind: computer` seats.
 * Clean label (This computer) — no "· computer" jargon.
 */
export const dockTaskComputerTargets = (
  members: readonly DockComputerMember[],
): readonly AskBoxSendTarget[] => {
  const out: AskBoxSendTarget[] = [];
  for (const member of members) {
    if (member.memberKind !== "computer") continue;
    if (
      member.assignable !== true ||
      member.connectVersionStatus === "too_old"
    ) {
      continue;
    }
    const name = member.projectDisplayName?.trim() ?? "";
    out.push({
      key: member.id,
      label:
        name.length > 0 ? name : AWC_PROJECT_COMPUTER_MEMBER_COPY.fallbackName,
      kind: "computer",
    });
  }
  return out;
};
