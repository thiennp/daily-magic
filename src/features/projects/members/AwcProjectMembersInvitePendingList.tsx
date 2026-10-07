"use client";

import { useState } from "react";

import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import type { PendingInviteCopyPromptResult } from "@/features/projects/access/invites/fetchPendingInviteCopyPrompt";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";
import { copyTextFromLoader } from "@/features/projects/utils/copyTextFromLoader";

interface AwcProjectMembersInvitePendingListProps {
  readonly invites: readonly AwcProjectAccessInvite[];
  readonly onRevoke: (inviteId: string) => void;
  readonly onTurnOffAutoApprove?: (inviteId: string) => void;
  /** Short Copy prompt for an invite this tab created; null = cannot re-copy. */
  readonly copyPromptFor?: (inviteId: string) => string | null;
  /**
   * 107: fetch the prompt from the server on click (any device) for rows with
   * copyAvailable. Rows without it show Copy disabled with a short hint.
   */
  readonly fetchCopyPrompt?: (
    inviteId: string,
  ) => Promise<PendingInviteCopyPromptResult>;
}

type RowCopyState =
  | { readonly inviteId: string; readonly kind: "busy" | "copied" }
  | {
      readonly inviteId: string;
      readonly kind: "error";
      readonly message: string;
    };

const ROW =
  "flex items-center gap-2.5 rounded-[10px] border border-awc-line bg-awc-surface-2 px-2.5 py-2.5 text-sm";
const AV =
  "grid size-8 shrink-0 place-items-center rounded-full border-[1.5px] border-dashed border-awc-border-strong bg-transparent text-[13px] font-semibold text-awc-fg-muted";
const GHOST =
  "awc-focus-ring shrink-0 rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-[13px] font-semibold text-awc-fg-muted transition hover:bg-awc-fill";
const GHOST_OFF =
  "shrink-0 cursor-not-allowed rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-[13px] font-semibold text-awc-fg-subtle opacity-60";
const CHIP =
  "inline-flex items-center rounded-full bg-awc-tile-2 px-2 py-px text-[11.5px] font-semibold text-awc-fg-muted";

/** Pending assistant invites — Invite sent / Auto-approve chip / Copy / Cancel (+ Turn off). */
export default function AwcProjectMembersInvitePendingList({
  invites,
  onRevoke,
  onTurnOffAutoApprove,
  copyPromptFor,
  fetchCopyPrompt,
}: AwcProjectMembersInvitePendingListProps) {
  const [copyState, setCopyState] = useState<RowCopyState | null>(null);
  const stateFor = (inviteId: string): RowCopyState | null =>
    copyState?.inviteId === inviteId ? copyState : null;
  /** Session prompt wins; else fetch on click (then copy). */
  const copyPrompt = async (inviteId: string, prompt: string | null) => {
    const failure: { message: string | null } = { message: null };
    let load: Promise<string | null>;
    if (prompt !== null) {
      load = Promise.resolve(prompt);
    } else if (fetchCopyPrompt !== undefined) {
      load = fetchCopyPrompt(inviteId).then((result) => {
        if (result.ok) return result.prompt;
        failure.message = result.errorMessage;
        return null;
      });
    } else {
      return;
    }
    setCopyState({ inviteId, kind: "busy" });
    const copied = await copyTextFromLoader(load);
    if (!copied) {
      setCopyState({
        inviteId,
        kind: "error",
        message: failure.message ?? C.invitePendingCopyFailed,
      });
      return;
    }
    setCopyState({ inviteId, kind: "copied" });
    window.setTimeout(
      () =>
        setCopyState((current) =>
          current?.inviteId === inviteId && current.kind === "copied"
            ? null
            : current,
        ),
      2000,
    );
  };
  return (
    <>
      <ul className="flex flex-col gap-2 px-1">
        {invites.length === 0 ? (
          <li className="px-3.5 py-2 text-[13px] text-awc-fg-muted">
            {C.inviteEmpty}
          </li>
        ) : (
          invites.map((invite) => {
            const prompt = copyPromptFor?.(invite.inviteId) ?? null;
            const canFetch =
              fetchCopyPrompt !== undefined && invite.copyAvailable === true;
            const rowState = stateFor(invite.inviteId);
            return (
              <li key={invite.inviteId} className={ROW}>
                <span className={AV} aria-hidden>
                  +
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-awc-fg">
                    {C.invitePendingTitle}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[12.5px] text-awc-fg-subtle">
                    {invite.autoApprove ? (
                      <span className={CHIP}>{C.invitePendingSubOn}</span>
                    ) : (
                      C.invitePendingSubOff
                    )}
                  </span>
                  {rowState?.kind === "error" ? (
                    <span
                      role="status"
                      className="mt-0.5 block text-[12px] text-awc-fg-muted"
                    >
                      {rowState.message}
                    </span>
                  ) : null}
                </span>
                <span className="flex shrink-0 gap-1.5">
                  {prompt !== null || canFetch ? (
                    <button
                      type="button"
                      className={GHOST}
                      aria-label="Copy prompt"
                      data-invite-copy={invite.inviteId}
                      disabled={rowState?.kind === "busy"}
                      onClick={() => void copyPrompt(invite.inviteId, prompt)}
                    >
                      {rowState?.kind === "copied"
                        ? C.invitePendingCopied
                        : rowState?.kind === "busy"
                          ? C.invitePendingCopying
                          : C.invitePendingCopy}
                    </button>
                  ) : fetchCopyPrompt !== undefined ? (
                    <button
                      type="button"
                      className={GHOST_OFF}
                      disabled
                      aria-label={`Copy prompt. ${C.invitePendingCopyUnavailable}`}
                      title={C.invitePendingCopyUnavailable}
                      data-invite-copy-unavailable={invite.inviteId}
                    >
                      {C.invitePendingCopy}
                    </button>
                  ) : null}
                  {invite.autoApprove && onTurnOffAutoApprove ? (
                    <button
                      type="button"
                      className={GHOST}
                      aria-label="Turn off auto-approve"
                      onClick={() => onTurnOffAutoApprove(invite.inviteId)}
                    >
                      {C.invitePendingTurnOff}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className={GHOST}
                    aria-label="Cancel invite"
                    onClick={() => onRevoke(invite.inviteId)}
                  >
                    {C.invitePendingCancel}
                  </button>
                </span>
              </li>
            );
          })
        )}
      </ul>
      <ul className="space-y-1 px-3.5 text-[12px] text-awc-fg-muted">
        <li className="flex gap-1.5">
          <span className="text-awc-ok-dot" aria-hidden>
            ●
          </span>
          <span>{C.compatGrok}</span>
        </li>
        <li className="flex gap-1.5">
          <span className="text-awc-fg-subtle" aria-hidden>
            ○
          </span>
          <span>{C.compatOther}</span>
        </li>
      </ul>
    </>
  );
}
