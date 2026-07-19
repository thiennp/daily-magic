"use client";

import { useMemo, useState } from "react";

import {
  formatAgentRunPartialOutputForDisplay,
  hasFormattedAgentRunPartialOutput,
} from "@/features/agent/utils/formatAgentRunPartialOutputForDisplay";
import AgentRunPartialOutputSections from "@/features/dispatch/AgentRunPartialOutputSections";

interface AgentRunPartialOutputPreviewProps {
  readonly partialOutput: string;
}

const COLLAPSED_PROGRESS_COUNT = 2;
const COLLAPSED_SECTION_COUNT = 2;

export default function AgentRunPartialOutputPreview({
  partialOutput,
}: AgentRunPartialOutputPreviewProps) {
  const formatted = useMemo(
    () => formatAgentRunPartialOutputForDisplay(partialOutput),
    [partialOutput],
  );
  const [isExpanded, setIsExpanded] = useState(false);

  if (!hasFormattedAgentRunPartialOutput(formatted)) {
    return null;
  }

  const shouldCollapse =
    formatted.progressUpdates.length > COLLAPSED_PROGRESS_COUNT ||
    formatted.sections.length > COLLAPSED_SECTION_COUNT;
  const visibleProgress = isExpanded
    ? formatted.progressUpdates
    : formatted.progressUpdates.slice(0, COLLAPSED_PROGRESS_COUNT);
  const visibleSections = isExpanded
    ? formatted.sections
    : formatted.sections.slice(0, COLLAPSED_SECTION_COUNT);

  return (
    <div className="mt-3 space-y-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Context so far
      </p>
      {visibleProgress.map((update, index) => (
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
      {visibleSections.length > 0 ? (
        <AgentRunPartialOutputSections sections={visibleSections} />
      ) : null}
      {shouldCollapse ? (
        <button
          type="button"
          onClick={() => {
            setIsExpanded((previous) => !previous);
          }}
          className="text-xs font-medium text-brand-700 hover:underline dark:text-brand-300"
        >
          {isExpanded ? "Show less context" : "Show full context"}
        </button>
      ) : null}
    </div>
  );
}
