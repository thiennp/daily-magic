"use client";

import { useRouter } from "next/navigation";

import AgentLiveTerminalNextActions from "@/features/agent/AgentLiveTerminalNextActions";
import { splitAgentRunResultForDisplay } from "@/features/reports/utils/splitAgentRunResultForDisplay";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

interface AgentRunResultOutputProps {
  readonly resultOutput: string;
}

export default function AgentRunResultOutput({
  resultOutput,
}: AgentRunResultOutputProps) {
  const router = useRouter();
  const { body, nextActions } = splitAgentRunResultForDisplay(resultOutput);

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
      <AgentLiveTerminalNextActions
        actions={nextActions}
        disabled={false}
        onSelect={(action) => {
          router.push(
            buildAgentComposerHref({
              prompt: action,
              continueSession: true,
            }),
          );
        }}
      />
    </>
  );
}
