"use client";

import { useState } from "react";

import type { SendHumanInviteEmailsInput } from "@/features/projects/access/humanInvites/hooks/useHumanInviteEmailActions";
import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";
import { parseHumanInviteEmailList } from "@/features/projects/access/humanInvites/utils/public-api/presentation";

/** DF-025 Email tab: Approve-before-join toggle (default on) + Send invite submit. */
export const useHumanInviteSendForm = (input: {
  readonly email: string;
  readonly role: HumanInviteRole;
  readonly requireEmailMatch: boolean;
  readonly setEmail: (value: string) => void;
  readonly setLocalError: (value: string | null) => void;
  readonly onSent?: (emails: readonly string[]) => void;
  readonly onSendEmails?: (
    body: SendHumanInviteEmailsInput,
  ) => Promise<boolean>;
}) => {
  const [requiresApproval, setRequiresApproval] = useState(true);
  const { onSendEmails } = input;

  const onSubmitSend = () => {
    const parsed = parseHumanInviteEmailList(input.email);
    if (!parsed.ok) {
      input.setLocalError(parsed.errorMessage);
      return;
    }
    input.setLocalError(null);
    void onSendEmails?.({
      emails: parsed.emails,
      role: input.role,
      requireEmailMatch: input.requireEmailMatch,
      requiresApproval,
    }).then((allSent) => {
      if (!allSent) return;
      input.setEmail("");
      input.onSent?.(parsed.emails);
    });
  };

  return {
    requiresApproval,
    onRequiresApprovalChange: onSendEmails ? setRequiresApproval : undefined,
    onSubmitSend: onSendEmails ? onSubmitSend : undefined,
  };
};
