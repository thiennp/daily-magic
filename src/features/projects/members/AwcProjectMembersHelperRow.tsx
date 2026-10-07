"use client";

import { useState } from "react";

import AwcProjectAccessMemberGrokWebhookForm from "@/features/projects/access/AwcProjectAccessMemberGrokWebhookForm";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

interface HelperMember {
  readonly id: string;
  readonly userId: string;
  readonly projectDisplayName: string | null;
}

interface AwcProjectMembersHelperRowProps {
  readonly projectId: string;
  readonly member: HelperMember;
  readonly onMessage: (membershipId: string) => void;
  readonly onRename: (membershipId: string, name: string) => Promise<boolean>;
  readonly onRemove: (membershipId: string) => void;
}

const ROW =
  "flex w-full items-center gap-3 rounded-[10px] border border-transparent px-3.5 py-2.5 text-left text-sm transition-all hover:border-awc-line hover:bg-awc-surface-2";

/** Flat nav-style assistant row with expand actions (Message / Rename / Webhook / Remove). */
export default function AwcProjectMembersHelperRow({
  projectId,
  member,
  onMessage,
  onRename,
  onRemove,
}: AwcProjectMembersHelperRowProps) {
  const [open, setOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [draft, setDraft] = useState(member.projectDisplayName ?? "");
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [webhookOpen, setWebhookOpen] = useState(false);
  const name = member.projectDisplayName?.trim() || member.userId.slice(0, 8);

  return (
    <li className="flex flex-col">
      <button
        type="button"
        className={ROW}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-awc-tile-2 text-[13px] font-semibold text-awc-fg-muted">
          {name.slice(0, 2).toUpperCase()}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold text-awc-fg">
            {name}
          </span>
          {/* userId muted under Ready state — keep for a11y expand context */}
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-[12.5px] text-awc-fg-subtle">
          <span
            className="inline-block size-[7px] rounded-full bg-awc-ok-dot"
            aria-hidden
          />
          {C.helpersReady}
        </span>
        <span
          className="awc-focus-ring grid size-7 shrink-0 place-items-center rounded-lg text-[15px] font-semibold leading-none text-awc-fg-muted"
          aria-hidden
        >
          ⋯
        </span>
      </button>
      {open ? (
        <div className="flex flex-col gap-2 px-3.5 pb-3 pl-[3.75rem]">
          {!renaming && !confirmRemove ? (
            <div className="flex flex-wrap gap-2">
              <button type="button" className="text-[13px] font-medium text-awc-fg underline-offset-2 hover:underline dark:text-gray-200" onClick={() => onMessage(member.id)}>{C.menuChat}</button>
              <button type="button" className="text-[13px] font-medium text-awc-fg underline-offset-2 hover:underline dark:text-gray-200" onClick={() => { setDraft(member.projectDisplayName ?? ""); setRenaming(true); }}>{C.menuRename}</button>
              <button type="button" className="text-[13px] font-medium text-awc-fg underline-offset-2 hover:underline dark:text-gray-200" onClick={() => setWebhookOpen((v) => !v)}>{C.menuWebhook}</button>
              <button type="button" className="text-[13px] font-medium text-error-600 underline-offset-2 hover:underline dark:text-error-400" onClick={() => setConfirmRemove(true)}>{C.menuRemove}</button>
            </div>
          ) : null}
          {renaming ? (
            <form className="flex flex-wrap items-center gap-2" onSubmit={(e) => { e.preventDefault(); void onRename(member.id, draft).then((ok) => { if (ok) setRenaming(false); }); }}>
              <label className="sr-only" htmlFor={`rename-${member.id}`}>{C.renameAria}</label>
              <input id={`rename-${member.id}`} value={draft} onChange={(e) => setDraft(e.target.value)} className="min-w-0 flex-1 rounded-lg border border-awc-border bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-950" />
              <button type="submit" className="text-[13px] font-semibold text-awc-fg dark:text-white">{C.renameSave}</button>
              <button type="button" className="text-[13px] text-awc-fg-muted" onClick={() => setRenaming(false)}>{C.renameCancel}</button>
            </form>
          ) : null}
          {confirmRemove ? (
            <div className="flex flex-col gap-2">
              <p className="text-[13px] text-awc-fg-muted dark:text-gray-300">{C.revokeText(name)}</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="text-[13px] font-semibold text-error-600 dark:text-error-400" onClick={() => onRemove(member.id)}>{C.revokeConfirm(name)}</button>
                <button type="button" className="text-[13px] text-awc-fg-muted" onClick={() => setConfirmRemove(false)}>{C.revokeCancel}</button>
              </div>
            </div>
          ) : null}
          {webhookOpen ? (
            <AwcProjectAccessMemberGrokWebhookForm projectId={projectId} membershipId={member.id} />
          ) : null}
        </div>
      ) : null}
    </li>
  );
}
