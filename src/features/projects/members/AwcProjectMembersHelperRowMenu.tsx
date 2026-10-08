"use client";

import AwcProjectMembersRenameForm from "@/features/projects/members/AwcProjectMembersRenameForm";
import AwcProjectMembersInfoTip from "@/features/projects/members/AwcProjectMembersInfoTip";
import AwcProjectMembersHelperWakeBlock from "@/features/projects/members/AwcProjectMembersHelperWakeBlock";
import type { HelperRowMode } from "@/features/projects/members/hooks/useHelperRowState";
import type { AssistantWakeHealth } from "@/features/projects/members/utils/formatAssistantWakeHealth";
import type { RailAssistantWakeStatus } from "@/features/projects/members/utils/resolveRailAssistantWakeStatus";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

type Member = {
  readonly id: string;
  readonly projectDisplayName: string | null;
};

interface AwcProjectMembersHelperRowMenuProps {
  readonly projectId: string;
  readonly member: Member;
  readonly name: string;
  /** Picked from the ⋯ menu (DF-036 F12): inline rename or remove confirm. */
  readonly mode: HelperRowMode;
  readonly onEndMode: () => void;
  readonly wake: {
    readonly status: RailAssistantWakeStatus;
    readonly health: AssistantWakeHealth | null | undefined;
    readonly pasteOpen: boolean;
    readonly onOpenPaste: () => void;
    readonly onRetry: () => void;
  };
  readonly onWakeSaved: (membershipId: string) => void;
  readonly onRename: (membershipId: string, name: string) => Promise<boolean>;
  readonly onRemove: (membershipId: string) => void;
}

/** Expanded assistant row: inline rename / remove confirm (from ⋯), then the always-visible Wake link block (D3). */
export default function AwcProjectMembersHelperRowMenu(
  p: AwcProjectMembersHelperRowMenuProps,
) {
  const { member, name } = p;
  return (
    <div className="flex flex-col gap-2 px-3.5 pb-3 pl-[3.75rem]">
      {p.mode === "rename" ? (
        <AwcProjectMembersRenameForm
          member={member}
          onRename={p.onRename}
          onDone={p.onEndMode}
        />
      ) : null}
      {p.mode === "remove" ? (
        <div className="flex flex-col gap-2">
          <p className="text-[13px] text-awc-fg-muted dark:text-gray-300">
            {C.revokeText(name)}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="text-[13px] font-semibold text-awc-bad"
              onClick={() => p.onRemove(member.id)}
            >
              {C.revokeConfirm(name)}
            </button>
            <button
              type="button"
              className="text-[13px] text-awc-fg-muted"
              onClick={p.onEndMode}
            >
              {C.revokeCancel}
            </button>
            <AwcProjectMembersInfoTip id={`remove-tip-${member.id}`}>
              {C.helpersNote}
            </AwcProjectMembersInfoTip>
          </div>
        </div>
      ) : null}
      <AwcProjectMembersHelperWakeBlock
        projectId={p.projectId}
        member={member}
        {...p.wake}
        onWakeSaved={p.onWakeSaved}
      />
    </div>
  );
}
