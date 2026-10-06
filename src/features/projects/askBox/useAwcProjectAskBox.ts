"use client";

import { useState } from "react";

import {
  ASK_BOX_ALL_KEY,
  type AskBoxSendTarget,
} from "@/features/projects/askBox/askBoxSendTarget";
import {
  resolveAskBoxSend,
  type AskBoxDraft,
} from "@/features/projects/askBox/resolveAskBoxSend";
import { sendMessengerMessage } from "@/features/projects/messenger/utils/sendMessengerMessage";
import { sendMessengerTask } from "@/features/projects/messenger/utils/sendMessengerTask";

export type AskBoxNotice = { readonly tone: "ok" | "error"; readonly text: string };

const EMPTY_DRAFT: AskBoxDraft = {
  text: "",
  to: ASK_BOX_ALL_KEY,
  needsReply: true,
  assignAsTask: false,
  kind: "",
  refs: { prUrl: "", commitSha: "", localPath: "", allowClaimId: "" },
};

/** Ask box state → existing messenger send / inbox dispatch for this project. */
export const useAwcProjectAskBox = (input: {
  readonly projectId: string;
  readonly targets: readonly AskBoxSendTarget[];
  readonly onSent: (threadKey: string) => void;
}) => {
  const { projectId, targets, onSent } = input;
  const [draft, setDraft] = useState<AskBoxDraft>(EMPTY_DRAFT);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<AskBoxNotice | null>(null);

  const update = (patch: Partial<AskBoxDraft>): void => {
    setDraft((current) => ({ ...current, ...patch }));
  };
  const setAssignAsTask = (assignAsTask: boolean): void => {
    const firstAssistant = targets.find((t) => t.key !== ASK_BOX_ALL_KEY);
    const pickOne = assignAsTask && draft.to === ASK_BOX_ALL_KEY && firstAssistant;
    update(pickOne ? { assignAsTask, to: firstAssistant.key } : { assignAsTask });
  };

  const submit = async (): Promise<void> => {
    const plan = resolveAskBoxSend(draft, targets);
    if (plan.kind === "none" || sending) return;
    if (plan.kind === "error") {
      setNotice({ tone: "error", text: plan.message });
      return;
    }
    setSending(true);
    const result =
      plan.kind === "message"
        ? await sendMessengerMessage({ projectId, threadKey: plan.threadKey, text: plan.text, needsReply: plan.needsReply })
        : await sendMessengerTask({ projectId, draft: plan.draft });
    setSending(false);
    if (!result.ok) {
      setNotice({ tone: "error", text: result.errorMessage });
      return;
    }
    setNotice({ tone: "ok", text: plan.successMessage });
    update({ text: "", kind: "", refs: EMPTY_DRAFT.refs });
    onSent(plan.threadKey);
  };

  return { draft, sending, notice, update, setAssignAsTask, submit };
};
