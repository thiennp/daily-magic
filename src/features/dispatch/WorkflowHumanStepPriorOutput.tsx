"use client";

import { useState } from "react";

const AUTO_EXPAND_MAX_CHARS = 600;

interface WorkflowHumanStepPriorOutputProps {
  readonly outputPreview: string;
}

export default function WorkflowHumanStepPriorOutput({
  outputPreview,
}: WorkflowHumanStepPriorOutputProps) {
  const [isExpanded, setIsExpanded] = useState(
    outputPreview.length <= AUTO_EXPAND_MAX_CHARS,
  );
  const needsToggle = outputPreview.length > AUTO_EXPAND_MAX_CHARS;

  return (
    <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          From your assistant
        </p>
        {needsToggle ? (
          <button
            type="button"
            onClick={() => {
              setIsExpanded((previous) => !previous);
            }}
            className="shrink-0 text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        ) : null}
      </div>
      {isExpanded ? (
        <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {outputPreview}
        </pre>
      ) : (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Tap show more to read the full message.
        </p>
      )}
    </div>
  );
}
