import type { useAgentRunQueue } from "@/features/agent/hooks/useAgentRunQueue";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import { buildAgentLiveTerminalFeedbackEnqueuePayload } from "@/features/agent/utils/buildAgentLiveTerminalFeedbackEnqueuePayload";
import type { AgentLiveTerminalFeedbackAction } from "@/features/agent/utils/resolveAgentLiveTerminalFeedbackAction";

export const applyAgentLiveTerminalFeedbackAction = (input: {
  readonly action: AgentLiveTerminalFeedbackAction;
  readonly message: string;
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly submitInput: (response: string) => void;
  readonly sendFollowUp: (message: string) => void;
  readonly queueMessage: (message: string) => void;
  readonly enqueueRun: ReturnType<typeof useAgentRunQueue>["enqueueRun"];
  readonly setQueueNotice: (message: string | null) => void;
  readonly setIsSubmitting: (value: boolean) => void;
}): void => {
  if (input.action.kind === "noop") {
    return;
  }

  if (input.action.kind === "answer-input") {
    input.submitInput(input.message);
    return;
  }

  if (input.action.kind === "queue-while-working") {
    input.queueMessage(input.message);
    return;
  }

  if (input.action.kind === "send-follow-up") {
    input.sendFollowUp(input.message);
    return;
  }

  input.setIsSubmitting(true);
  void input
    .enqueueRun(
      buildAgentLiveTerminalFeedbackEnqueuePayload(
        input.composer,
        input.message,
      ),
    )
    .then((queued) => {
      if (queued) {
        input.setQueueNotice("Queued — will send when your Mac is connected.");
      }
    })
    .finally(() => {
      input.setIsSubmitting(false);
    });
};
