"use client";

import { useRouter } from "next/navigation";

import AgentLiveTerminalNextActions from "@/features/agent/AgentLiveTerminalNextActions";
import AgentRunContinueMessageField from "@/features/reports/AgentRunContinueMessageField";
import { canContinueAgentRunOnStoredMac } from "@/features/reports/utils/canContinueAgentRunOnStoredMac";
import { splitAgentRunResultForDisplay } from "@/features/reports/utils/splitAgentRunResultForDisplay";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

interface AgentRunResultOutputProps {
  readonly resultOutput: string;
  readonly deviceId: string | null;
}

export default function AgentRunResultOutput({
  resultOutput,
  deviceId,
}: AgentRunResultOutputProps) {
  const router = useRouter();
  const { body, nextActions } = splitAgentRunResultForDisplay(resultOutput);
  const canContinue = canContinueAgentRunOnStoredMac(deviceId);

  const continueWithPrompt = (prompt: string) => {
    if (!canContinueAgentRunOnStoredMac(deviceId)) {
      return;
    }

    router.push(
      buildAgentComposerHref({
        prompt,
        continueSession: true,
        deviceId,
      }),
    );
  };

  return (
    <>
      <h2 className="mt-6 text-sm font-medium text-gray-800 dark:text-white/90">
        Result
      </h2>
      {body.length > 0 ? (
        <pre className="mt-2 max-h-96 overflow-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          {body}
        </pre>
      ) : null}
      <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/50">
        {canContinue ? (
          <>
            {nextActions.length > 0 ? (
              <AgentLiveTerminalNextActions
                actions={nextActions}
                bare
                disabled={false}
                onSelect={continueWithPrompt}
              />
            ) : (
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Continue conversation
              </p>
            )}
            <AgentRunContinueMessageField onSubmit={continueWithPrompt} />
          </>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Continue is unavailable because this job has no saved Mac.
          </p>
        )}
      </div>
    </>
  );
}
