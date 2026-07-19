"use client";

import {
  formatAgentRunPartialOutputForDisplay,
  hasFormattedAgentRunPartialOutput,
} from "@/features/agent/utils/formatAgentRunPartialOutputForDisplay";

interface AgentRunPartialOutputPreviewProps {
  readonly partialOutput: string;
}

export default function AgentRunPartialOutputPreview({
  partialOutput,
}: AgentRunPartialOutputPreviewProps) {
  const formatted = formatAgentRunPartialOutputForDisplay(partialOutput);

  if (!hasFormattedAgentRunPartialOutput(formatted)) {
    return null;
  }

  return (
    <div className="mt-3 space-y-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
      {formatted.progressUpdates.map((update, index) => (
        <div key={`${update.title}-${index}`}>
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            {update.title}
          </p>
          {update.detail.length > 0 ? (
            <p className="mt-1 text-xs whitespace-pre-wrap text-gray-600 dark:text-gray-300">
              {update.detail}
            </p>
          ) : null}
        </div>
      ))}
      {formatted.remainingText.length > 0 ? (
        <p className="text-xs whitespace-pre-wrap text-gray-700 dark:text-gray-300">
          {formatted.remainingText}
        </p>
      ) : null}
    </div>
  );
}
