"use client";

import { useState } from "react";

import AwcProjectMembersHelperWakeBlock from "@/features/projects/members/AwcProjectMembersHelperWakeBlock";
import type { HelperRowMode } from "@/features/projects/members/hooks/useHelperRowState";
import type { AssistantWakeHealth } from "@/features/projects/members/utils/formatAssistantWakeHealth";
import type { RailAssistantWakeStatus } from "@/features/projects/members/utils/resolveRailAssistantWakeStatus";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

type Member = { readonly id: string; readonly projectDisplayName: string | null };

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

function RenameForm(p: { readonly member: Member; readonly onRename: AwcProjectMembersHelperRowMenuProps["onRename"]; readonly onDone: () => void }) {
  const [draft, setDraft] = useState(p.member.projectDisplayName ?? "");
  const id = `rename-${p.member.id}`;
  return (
    <form className="flex flex-wrap items-center gap-2" onSubmit={(e) => { e.preventDefault(); void p.onRename(p.member.id, draft).then((ok) => { if (ok) p.onDone(); }); }}>
      <label className="sr-only" htmlFor={id}>{C.renameAria}</label>
      <input id={id} maxLength={32} value={draft} autoFocus onChange={(e) => setDraft(e.target.value)} className="min-w-0 flex-1 rounded-lg border border-awc-border bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-950" />
      <button type="submit" className="text-[13px] font-semibold text-awc-fg dark:text-white">{C.renameSave}</button>
      <button type="button" className="text-[13px] text-awc-fg-muted" onClick={p.onDone}>{C.renameCancel}</button>
    </form>
  );
}

/** Expanded assistant row: inline rename / remove confirm (from ⋯), then the always-visible Wake link block (D3). */
export default function AwcProjectMembersHelperRowMenu(p: AwcProjectMembersHelperRowMenuProps) {
  const { member, name } = p;
  return (
    <div className="flex flex-col gap-2 px-3.5 pb-3 pl-[3.75rem]">
      {p.mode === "rename" ? <RenameForm member={member} onRename={p.onRename} onDone={p.onEndMode} /> : null}
      {p.mode === "remove" ? (
        <div className="flex flex-col gap-2">
          <p className="text-[13px] text-awc-fg-muted dark:text-gray-300">{C.revokeText(name)}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="text-[13px] font-semibold text-awc-bad" onClick={() => p.onRemove(member.id)}>{C.revokeConfirm(name)}</button>
            <button type="button" className="text-[13px] text-awc-fg-muted" onClick={p.onEndMode}>{C.revokeCancel}</button>
          </div>
        </div>
      ) : null}
      <AwcProjectMembersHelperWakeBlock projectId={p.projectId} member={member} {...p.wake} onWakeSaved={p.onWakeSaved} />
    </div>
  );
}
