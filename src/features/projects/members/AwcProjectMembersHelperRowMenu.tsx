"use client";

import { useState } from "react";

import AwcProjectMembersHelperWakeBlock from "@/features/projects/members/AwcProjectMembersHelperWakeBlock";
import type { AssistantWakeHealth } from "@/features/projects/members/utils/formatAssistantWakeHealth";
import type { RailAssistantWakeStatus } from "@/features/projects/members/utils/resolveRailAssistantWakeStatus";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

interface AwcProjectMembersHelperRowMenuProps {
  readonly projectId: string;
  readonly member: { readonly id: string; readonly projectDisplayName: string | null };
  readonly name: string;
  readonly wake: {
    readonly status: RailAssistantWakeStatus;
    readonly health: AssistantWakeHealth | null | undefined;
    readonly pasteOpen: boolean;
    readonly onOpenPaste: () => void;
    readonly onRetry: () => void;
  };
  readonly onWakeSaved: (membershipId: string) => void;
  readonly onMessage: (membershipId: string) => void;
  readonly onRename: (membershipId: string, name: string) => Promise<boolean>;
  readonly onRemove: (membershipId: string) => void;
}

const LINK = "text-[13px] font-medium text-awc-fg underline-offset-2 hover:underline dark:text-gray-200";

/** Expanded assistant row: Message / Rename / Remove, then the always-visible Wake link block (DF-036 D3). */
export default function AwcProjectMembersHelperRowMenu(p: AwcProjectMembersHelperRowMenuProps) {
  const { member, name } = p;
  const [renaming, setRenaming] = useState(false);
  const [draft, setDraft] = useState(member.projectDisplayName ?? "");
  const [confirmRemove, setConfirmRemove] = useState(false);
  return (
    <div className="flex flex-col gap-2 px-3.5 pb-3 pl-[3.75rem]">
      {!renaming && !confirmRemove ? (
        <div className="flex flex-wrap gap-2">
          <button type="button" className={LINK} onClick={() => p.onMessage(member.id)}>{C.menuChat}</button>
          <button type="button" className={LINK} onClick={() => { setDraft(member.projectDisplayName ?? ""); setRenaming(true); }}>{C.menuRename}</button>
          <button type="button" className="text-[13px] font-medium text-awc-bad underline-offset-2 hover:underline" onClick={() => setConfirmRemove(true)}>{C.menuRemove}</button>
        </div>
      ) : null}
      {renaming ? (
        <form className="flex flex-wrap items-center gap-2" onSubmit={(e) => { e.preventDefault(); void p.onRename(member.id, draft).then((ok) => { if (ok) setRenaming(false); }); }}>
          <label className="sr-only" htmlFor={`rename-${member.id}`}>{C.renameAria}</label>
          <input id={`rename-${member.id}`} maxLength={32} value={draft} onChange={(e) => setDraft(e.target.value)} className="min-w-0 flex-1 rounded-lg border border-awc-border bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-950" />
          <button type="submit" className="text-[13px] font-semibold text-awc-fg dark:text-white">{C.renameSave}</button>
          <button type="button" className="text-[13px] text-awc-fg-muted" onClick={() => setRenaming(false)}>{C.renameCancel}</button>
        </form>
      ) : null}
      {confirmRemove ? (
        <div className="flex flex-col gap-2">
          <p className="text-[13px] text-awc-fg-muted dark:text-gray-300">{C.revokeText(name)}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="text-[13px] font-semibold text-awc-bad" onClick={() => p.onRemove(member.id)}>{C.revokeConfirm(name)}</button>
            <button type="button" className="text-[13px] text-awc-fg-muted" onClick={() => setConfirmRemove(false)}>{C.revokeCancel}</button>
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
