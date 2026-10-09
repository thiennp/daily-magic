"use client";

import {
  useOneWindowComposerSend,
  type OneWindowComposerSendInput,
} from "@/features/projects/messenger/oneWindow/useOneWindowComposerSend";
import { useOneWindowCreateTask } from "@/features/projects/messenger/oneWindow/useOneWindowCreateTask";

/** The composer send plus the "Create a task" step in front of it. */
export const useOneWindowComposerSendWithTask = (
  input: OneWindowComposerSendInput & {
    readonly projectId: string;
    readonly feedKey: string;
  },
) => {
  const send = useOneWindowComposerSend(input);
  const create = useOneWindowCreateTask({
    projectId: input.projectId,
    assistants: input.assistants,
    mentionsEnabled: input.mentionsEnabled,
    feedKey: input.feedKey,
    onSendMessage: input.onSendMessage,
    onSendTask: input.onSendTask,
  });
  return {
    send,
    create,
    submit: (text: string) => create.run(text, send),
  };
};
