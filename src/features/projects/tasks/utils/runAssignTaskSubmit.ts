import { sendMessengerTask } from "@/features/projects/messenger/utils/sendMessengerTask";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";

/** Send the Assign dialog task (task.assign) and report pending/error/done. */
export const runAssignTaskSubmit = (input: {
  readonly projectId: string;
  readonly draft: MessengerTaskDraft;
  readonly setPending: (value: boolean) => void;
  readonly setError: (value: string | null) => void;
  readonly onAssigned: () => void;
  readonly onClose: () => void;
}): void => {
  input.setPending(true);
  input.setError(null);
  void sendMessengerTask({
    projectId: input.projectId,
    draft: input.draft,
  }).then((result) => {
    input.setPending(false);
    if (!result.ok) {
      input.setError(result.errorMessage);
      return;
    }
    input.onAssigned();
    input.onClose();
  });
};
