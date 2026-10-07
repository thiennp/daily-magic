"use client";

import { useCallback, useState } from "react";

import {
  approveHumanInviteApi,
  denyHumanInviteApi,
  sendHumanInviteEmailApi,
} from "@/features/projects/access/humanInvites/humanInviteEmailApi";
import {
  HUMAN_INVITE_EMAIL_COPY as copy,
  fillHumanInviteEmailCopy,
} from "@/features/projects/access/humanInvites/humanInviteEmailCopy.constant";
import type { SendHumanInviteEmailBody } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type SendHumanInviteEmailsInput = Omit<
  SendHumanInviteEmailBody,
  "email"
> & {
  readonly emails: readonly string[];
};

const sentMessage = (emails: readonly string[]): string =>
  emails.length === 1
    ? fillHumanInviteEmailCopy(copy.inviteSentTo, { email: emails[0] })
    : fillHumanInviteEmailCopy(copy.invitesSentCount, { count: emails.length });

/** DF-025: Send invite (one POST per email) + Approve/Deny for Wants to join. */
export const useHumanInviteEmailActions = (input: {
  readonly projectId: string;
  readonly reload: () => Promise<void>;
  readonly setMessage: (message: string | null) => void;
}) => {
  const [sendBusy, setSendBusy] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [decidingId, setDecidingId] = useState<string | null>(null);

  const sendEmails = useCallback(
    async (body: SendHumanInviteEmailsInput): Promise<boolean> => {
      setSendBusy(true);
      setSendError(null);
      const sent: string[] = [];
      const failures: string[] = [];
      for (const email of body.emails) {
        const result = await sendHumanInviteEmailApi(input.projectId, {
          email,
          role: body.role,
          requireEmailMatch: body.requireEmailMatch,
          requiresApproval: body.requiresApproval,
        });
        if (result.ok) sent.push(email);
        else failures.push(result.errorMessage ?? copy.sendFailed);
      }
      setSendBusy(false);
      await input.reload();
      if (failures.length === 0) {
        input.setMessage(sentMessage(sent));
        return true;
      }
      setSendError(
        sent.length === 0
          ? failures[0]
          : fillHumanInviteEmailCopy(copy.someInvitesFailed, {
              sent: sent.length,
              failed: failures.length,
              reason: failures[0],
            }),
      );
      return false;
    },
    [input],
  );

  const decide = useCallback(
    async (inviteId: string, decision: "approve" | "deny", name: string) => {
      setDecidingId(inviteId);
      const result =
        decision === "approve"
          ? await approveHumanInviteApi(input.projectId, inviteId)
          : await denyHumanInviteApi(input.projectId, inviteId);
      setDecidingId(null);
      if (!result.ok) {
        input.setMessage(result.errorMessage ?? copy.decideFailed);
        await input.reload();
        return;
      }
      input.setMessage(
        decision === "approve"
          ? fillHumanInviteEmailCopy(copy.approved, { name })
          : copy.denied,
      );
      // Joined list follows the access live poll (no full reload → no unmount).
      await input.reload();
    },
    [input],
  );

  return {
    sendBusy,
    sendError,
    clearSendError: () => setSendError(null),
    sendEmails,
    decidingId,
    approveRequest: (inviteId: string, name: string) =>
      void decide(inviteId, "approve", name),
    denyRequest: (inviteId: string, name: string) =>
      void decide(inviteId, "deny", name),
  };
};
