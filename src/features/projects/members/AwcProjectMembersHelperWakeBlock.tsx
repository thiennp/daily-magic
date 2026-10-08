"use client";

import AwcWakeConnectPasteCard from "@/features/projects/access/AwcWakeConnectPasteCard";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { formatAwcGrokWakeCopy } from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import AwcProjectMembersInfoTip from "@/features/projects/members/AwcProjectMembersInfoTip";
import { ASSISTANT_WAKE_BLOCK_COPY as B } from "@/features/projects/members/assistantWakeBlockCopy.constant";
import { ASSISTANT_WAKE_HEALTH_COPY as W } from "@/features/projects/members/assistantWakeHealthCopy.constant";
import type { AssistantWakeHealth } from "@/features/projects/members/utils/formatAssistantWakeHealth";
import type { RailAssistantWakeStatus } from "@/features/projects/members/utils/resolveRailAssistantWakeStatus";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

interface AwcProjectMembersHelperWakeBlockProps {
  readonly projectId: string;
  readonly member: {
    readonly id: string;
    readonly projectDisplayName: string | null;
  };
  readonly status: RailAssistantWakeStatus;
  readonly health: AssistantWakeHealth | null | undefined;
  readonly pasteOpen: boolean;
  readonly onOpenPaste: () => void;
  readonly onRetry: () => void;
  readonly onWakeSaved: (membershipId: string) => void;
}

const statusLine = (
  status: RailAssistantWakeStatus,
  health: AssistantWakeHealth | null | undefined,
): string => {
  if ((status === "ready" || status === "cant_reach") && health)
    return health.line;
  if (status === "checks_on_demand") return B.checksIn;
  if (status === "cant_check") return B.cantCheck;
  if (status === "checking") return B.checking;
  return B.notConnected;
};

/** DF-036 D3: always-visible "Wake link" block — status line + paste box or the one next step. */
export default function AwcProjectMembersHelperWakeBlock(
  p: AwcProjectMembersHelperWakeBlockProps,
) {
  const { status, health } = p;
  const showPaste = p.pasteOpen || status === "not_connected";
  const offerPaste = status === "cant_reach" && health?.offerPaste === true;
  const action =
    status === "cant_check"
      ? { label: B.retry, run: p.onRetry, primary: false }
      : offerPaste
        ? { label: W.pasteNew, run: p.onOpenPaste, primary: true }
        : status === "checks_on_demand"
          ? { label: B.addWakeLink, run: p.onOpenPaste, primary: false }
          : status === "ready" || status === "cant_reach"
            ? { label: B.changeWakeLink, run: p.onOpenPaste, primary: false }
            : null;
  return (
    <div className="flex flex-col gap-1.5 pt-1" data-wake-block={status}>
      <div className="flex items-center gap-1.5">
        <h4 className="text-[12px] font-semibold text-awc-fg">
          {C.menuWebhook}
        </h4>
        {showPaste ? (
          <AwcProjectMembersInfoTip id={`wake-tip-${p.member.id}`}>
            {formatAwcGrokWakeCopy(B.intro, p.member.projectDisplayName)}
          </AwcProjectMembersInfoTip>
        ) : null}
      </div>
      <p
        className={`text-[12.5px] ${status === "cant_reach" ? "text-awc-bad" : "text-awc-fg-subtle"}`}
        role="status"
      >
        {statusLine(status, health)}
      </p>
      {showPaste ? (
        <AwcWakeConnectPasteCard
          projectId={p.projectId}
          membershipId={p.member.id}
          memberName={p.member.projectDisplayName}
          onSaved={p.onWakeSaved}
        />
      ) : action ? (
        <button
          type="button"
          className={`self-start ${action.primary ? AWC_PROJECT_ACCESS_CTA.primary : AWC_PROJECT_ACCESS_CTA.secondary}`}
          onClick={action.run}
        >
          {action.label}
        </button>
      ) : null}
    </div>
  );
}
