"use client";

import { useState } from "react";

interface WorkflowHumanStepPriorOutputProps {
  readonly outputPreview: string;
}

export default function WorkflowHumanStepPriorOutput({
  outputPreview,
}: WorkflowHumanStepPriorOutputProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900/40">
      <button
        type="button"
        onClick={() => {
          setIsExpanded((previous) => !previous);
        }}
        className="text-xs font-medium uppercase tracking-wide text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        {isExpanded ? "Hide" : "Show"} what the agent just produced
      </button>
      {isExpanded ? (
        <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap text-xs text-gray-700 dark:text-gray-300">
          {outputPreview}
        </pre>
      ) : null}
    </div>
  );
}
