"use client";

import type { useAgentWitchSocket } from "@/features/agent/hooks/useAgentWitchSocket";
import type { useWsTestPromptHandlers } from "@/features/agent/hooks/useWsTestPromptHandlers";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import { resolveEndedRunRetryPrefill } from "@/features/agent/utils/resolveEndedRunRetryPrefill";
import { getAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";

/**
 * 73820cb1 (Testi run 4 @298): an agy PTY run leaves the live shell open, and
 * an open shell keeps the floater in session view. "Finish session" and the
 * trail pencils cleared the ended run but left the shell, so the floater
 * showed a phantom "In progress" / "Preparing agent" with no run behind it.
 * Finishing now closes that shell too, so the wizard comes back. Retry starts
 * the same task again as a fresh run (the same path as Start); without a
 * prompt it just finishes the ended session.
 * afae8216: a floater re-opened on a failed run (from Tasks/Home) has an
 * empty form; Retry then refills the ended run's ask and project and returns
 * to the form, so Start re-runs it. Nothing is sent without that Start.
 */
export const useWsTestPanelSessionEndActions = (input: {
  readonly socket: ReturnType<typeof useAgentWitchSocket>;
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly activeDeviceId: string;
  readonly promptHandlers: ReturnType<typeof useWsTestPromptHandlers>;
}): {
  readonly finishSession: () => void;
  readonly retryEndedRun: () => void;
} => {
  const finishSession = (): void => {
    input.socket.finishLiveTerminalSession();
    if (input.socket.macShell.status !== "idle") {
      input.socket.macShell.closeShell();
    }
  };

  return {
    finishSession,
    retryEndedRun: () => {
      const canStartAgain =
        input.composer.resolvedPrompt.trim().length > 0 &&
        !input.composer.isSendDisabled(
          input.socket.connectionStatus,
          input.activeDeviceId,
        );
      if (canStartAgain) {
        input.promptHandlers.onSend();
        return;
      }
      const prefill =
        input.composer.resolvedPrompt.trim().length === 0
          ? resolveEndedRunRetryPrefill(
              getAgentRunLocalCache(input.socket.liveTerminalRunId ?? ""),
            )
          : null;
      finishSession();
      if (prefill !== null) {
        input.composer.setPrompt(prefill.prompt);
        if (prefill.projectId !== null) {
          input.composer.setSelectedProjectId(prefill.projectId);
        }
      }
    },
  };
};
