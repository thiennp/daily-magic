import type { useAgentRunQueue } from "@/features/agent/hooks/useAgentRunQueue";
import type { useAgentWitchSocket } from "@/features/agent/hooks/useAgentWitchSocket";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import { buildWsTestSendOptions } from "@/features/agent/utils/buildWsTestSendOptions";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const useWsTestPromptHandlers = (input: {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly activeWriterAgent: HarnessWriterAgent;
  readonly activeDeviceId: string;
  readonly sendClaudePrompt: ReturnType<
    typeof useAgentWitchSocket
  >["sendClaudePrompt"];
  readonly enqueueRun: ReturnType<typeof useAgentRunQueue>["enqueueRun"];
}): {
  readonly onSend: () => void;
  readonly onQueue: () => void;
  readonly onClear: () => void;
} => ({
  onSend: () => {
    input.sendClaudePrompt(
      input.composer.resolvedPrompt,
      buildWsTestSendOptions(
        input.composer,
        input.activeWriterAgent,
        input.activeDeviceId,
      ),
    );
    input.composer.resetComposer();
  },
  onQueue: () => {
    void input.enqueueRun({
      prompt: input.composer.resolvedPrompt,
      ...(input.composer.isTeamDispatch
        ? {
            executorUserId: input.composer.selectedTargetUserId,
            groupId: input.composer.selectedGroupId,
            capabilityId: input.composer.selectedCapabilityId,
          }
        : input.composer.libraryCapabilityId.length > 0
          ? { capabilityId: input.composer.libraryCapabilityId }
          : {}),
    });
  },
  onClear: () => {
    input.composer.resetComposer();
  },
});
