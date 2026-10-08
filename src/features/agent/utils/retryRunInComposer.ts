import { readTerminalStore } from "@/features/agent/utils/agentLiveTerminalLocalStoreIO";
import {
  resolveRunRetryComposerOptions,
  type RunRetryComposerOptions,
} from "@/features/agent/utils/resolveRunRetryComposerOptions";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/**
 * 7a3086f1: if this tab still holds the run's floater, reopen it (its Retry
 * keeps every input). Otherwise open a fresh New task prefilled from the run.
 */
export const retryRunInComposer = async (input: {
  readonly runId: string;
  readonly loadRun: (runId: string) => Promise<AgentRunRecord | null>;
  readonly openComposer: (options: RunRetryComposerOptions) => void;
  readonly expandRun: (runId: string) => void;
  readonly floaterRunId?: () => string | null;
}): Promise<void> => {
  const runId = input.runId.trim();
  const floaterRunId =
    input.floaterRunId ??
    (() => readTerminalStore().current?.activeRunId ?? null);
  if (runId.length === 0 || floaterRunId() === runId) {
    input.expandRun(runId);
    return;
  }
  const options = resolveRunRetryComposerOptions(
    await input.loadRun(runId).catch(() => null),
  );
  if (options === null) {
    input.expandRun(runId);
    return;
  }
  input.openComposer(options);
};
