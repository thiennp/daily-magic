"use client";

import { useMemo, useState } from "react";

import {
  ASK_BOX_ALL_KEY,
  askBoxSendTargets,
} from "@/features/projects/askBox/askBoxSendTarget";
import {
  resolveAskBoxSend,
  type AskBoxDraft,
} from "@/features/projects/askBox/resolveAskBoxSend";
import type { AwcMessengerBotThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";
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

const resolveTo = (
  to: string,
  targets: ReturnType<typeof askBoxSendTargets>,
): string =>
  targets.some((target) => target.key === to)
    ? to
    : (targets[0]?.key ?? ASK_BOX_ALL_KEY);

/** Ask box state → existing messenger send / inbox dispatch for this project. */
export const useAwcProjectAskBox = (input: {
  readonly projectId: string;
  readonly bots: readonly AwcMessengerBotThread[];
  readonly computers?: readonly { readonly key: string; readonly label: string }[];
  readonly onSent: (threadKey: string) => void;
}) => {
  const { projectId, bots, computers = [], onSent } = input;
  const [draft, setDraft] = useState<AskBoxDraft>(EMPTY_DRAFT);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<AskBoxNotice | null>(null);

  const targets = useMemo(
    () =>
      askBoxSendTargets(bots, {
        assignAsTask: draft.assignAsTask,
        computers,
      }),
    [bots, computers, draft.assignAsTask],
  );
  const to = resolveTo(draft.to, targets);
  const draftForSend = to === draft.to ? draft : { ...draft, to };

  const update = (patch: Partial<AskBoxDraft>): void => {
    setDraft((current) => ({ ...current, ...patch }));
  };
  const setAssignAsTask = (assignAsTask: boolean): void => {
    update({ assignAsTask });
  };

  const submit = async (): Promise<void> => {
    const plan = resolveAskBoxSend(draftForSend, targets);
    if (plan.kind === "none" || sending) return;
    if (plan.kind === "error") {
      setNotice({ tone: "error", text: plan.message });
      return;
    }
    setSending(true);
    const result =
      plan.kind === "message"
        ? await sendMessengerMessage({
            projectId,
            threadKey: plan.threadKey,
            text: plan.text,
            needsReply: plan.needsReply,
          })
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

  return {
    draft: draftForSend,
    targets,
    sending,
    notice,
    update,
    setAssignAsTask,
    submit,
  };
};
