"use client";

import { useCallback, useState } from "react";

import { sendMessengerMessage } from "@/features/projects/messenger/utils/sendMessengerMessage";
import { sendMessengerTask } from "@/features/projects/messenger/utils/sendMessengerTask";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";

export const useAwcProjectMessengerThreadSend = (input: {
  readonly projectId: string;
  readonly threadKey: string | null;
  readonly reload: () => Promise<void>;
  readonly onError: (message: string) => void;
}) => {
  const { projectId, threadKey, reload, onError } = input;
  const [sending, setSending] = useState(false);

  const send = useCallback(
    async (text: string, needsReply: boolean): Promise<boolean> => {
      if (threadKey === null) return false;
      setSending(true);
      const result = await sendMessengerMessage({
        projectId,
        threadKey,
        text,
        needsReply,
      });
      setSending(false);
      if (!result.ok) {
        onError(result.errorMessage);
        return false;
      }
      await reload();
      return true;
    },
    [onError, projectId, reload, threadKey],
  );

  const sendTask = useCallback(
    async (draft: MessengerTaskDraft): Promise<boolean> => {
      setSending(true);
      const result = await sendMessengerTask({ projectId, draft });
      setSending(false);
      if (!result.ok) {
        onError(result.errorMessage);
        return false;
      }
      await reload();
      return true;
    },
    [onError, projectId, reload],
  );

  return { sending, send, sendTask };
};
