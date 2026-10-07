"use client";

import { useState } from "react";

import type { PendingInviteCopyPromptResult } from "@/features/projects/access/invites/fetchPendingInviteCopyPrompt";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";
import { copyTextFromLoader } from "@/features/projects/utils/copyTextFromLoader";

export type InviteRowCopyState =
  | { readonly inviteId: string; readonly kind: "busy" | "copied" }
  | { readonly inviteId: string; readonly kind: "error"; readonly message: string };

/** Copy again on an unused invite row: the session prompt wins, else fetch it (107), then copy. */
export const useInviteRowCopy = (
  fetchCopyPrompt?: (inviteId: string) => Promise<PendingInviteCopyPromptResult>,
) => {
  const [copyState, setCopyState] = useState<InviteRowCopyState | null>(null);
  const stateFor = (inviteId: string): InviteRowCopyState | null =>
    copyState?.inviteId === inviteId ? copyState : null;

  const copyPrompt = async (inviteId: string, prompt: string | null): Promise<void> => {
    const failure: { message: string | null } = { message: null };
    const load =
      prompt !== null
        ? Promise.resolve(prompt)
        : fetchCopyPrompt?.(inviteId).then((result) => {
            if (result.ok) return result.prompt;
            failure.message = result.errorMessage;
            return null;
          });
    if (load === undefined) return;
    setCopyState({ inviteId, kind: "busy" });
    const copied = await copyTextFromLoader(load);
    if (!copied) {
      setCopyState({ inviteId, kind: "error", message: failure.message ?? C.invitePendingCopyFailed });
      return;
    }
    setCopyState({ inviteId, kind: "copied" });
    window.setTimeout(
      () =>
        setCopyState((current) =>
          current?.inviteId === inviteId && current.kind === "copied" ? null : current,
        ),
      2000,
    );
  };

  return { stateFor, copyPrompt };
};
