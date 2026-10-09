"use client";

import { useState } from "react";

import {
  findOpenTasksForAssistant,
  resolveCreateTaskTarget,
} from "@/features/projects/messenger/oneWindow/oneWindowCreateTask";
import type { OneWindowMentionAssistant } from "@/features/projects/messenger/oneWindow/oneWindowMentions";
import type { OneWindowSendMessage } from "@/features/projects/messenger/oneWindow/oneWindowSendTarget";
import useProjectTaskRecords from "@/features/projects/tasks/useProjectTaskRecords";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

export type PendingExistingTask = {
  readonly text: string;
  readonly membershipId: string;
  readonly mentioned: boolean;
  readonly tasks: readonly ProjectTaskRecord[];
};

/**
 * "Create a task" (on by default): look for the target assistant's open task
 * first. None → create one; some → park the send until the user picks.
 */
export const useOneWindowCreateTask = (input: {
  readonly projectId: string;
  readonly assistants: readonly OneWindowMentionAssistant[];
  readonly mentionsEnabled: boolean;
  readonly feedKey: string;
  readonly onSendMessage: OneWindowSendMessage;
  readonly onSendTask: (draft: MessengerTaskDraft) => Promise<boolean>;
}) => {
  const [checked, setChecked] = useState(true);
  const [pending, setPending] = useState<PendingExistingTask | null>(null);
  const { records, reload } = useProjectTaskRecords(input.projectId);

  const createNew = async (
    p: Pick<PendingExistingTask, "text" | "membershipId" | "mentioned">,
    fallback: (text: string) => Promise<boolean>,
  ): Promise<boolean> => {
    // An @mention already becomes a task on the normal send path.
    if (p.mentioned) return fallback(p.text);
    const ok = await input.onSendTask({
      assigneeMembershipId: p.membershipId,
      summary: p.text,
    });
    if (ok) reload();
    return ok;
  };

  /** Resolves true when the draft can be cleared. */
  const run = async (
    text: string,
    fallback: (text: string) => Promise<boolean>,
  ): Promise<boolean> => {
    const target = checked ? resolveCreateTaskTarget({ ...input, text }) : null;
    if (target === null) return fallback(text);
    const tasks = findOpenTasksForAssistant(records, target.membershipId);
    if (tasks.length > 0) {
      setPending({ text, ...target, tasks });
      return false;
    }
    return createNew({ text, ...target }, fallback);
  };

  const confirmExisting = async (): Promise<boolean> => {
    if (pending === null) return false;
    const ok = await input.onSendMessage(
      pending.text,
      true,
      pending.membershipId,
    );
    if (ok) setPending(null);
    return ok;
  };
  const createAnyway = async (
    fallback: (text: string) => Promise<boolean>,
  ): Promise<boolean> => {
    if (pending === null) return false;
    const ok = await createNew(pending, fallback);
    if (ok) setPending(null);
    return ok;
  };

  return {
    records,
    checked,
    setChecked,
    pending,
    run,
    confirmExisting,
    createAnyway,
    cancel: () => setPending(null),
  };
};
