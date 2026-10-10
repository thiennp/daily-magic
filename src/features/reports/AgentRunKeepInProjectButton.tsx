"use client";

import { useAgentRunKeepInProject } from "@/features/reports/hooks/public-api/presentation";

interface AgentRunKeepInProjectButtonProps {
  readonly runId: string;
  readonly projectId: string | null;
}

export default function AgentRunKeepInProjectButton({
  runId,
  projectId,
}: AgentRunKeepInProjectButtonProps) {
  const { visible, isSaving, message, keepInProject } =
    useAgentRunKeepInProject(runId, projectId);

  if (!visible) {
    return null;
  }

  return (
    <div className="mt-4 rounded-lg border border-brand-200 bg-brand-50/50 p-4 dark:border-brand-800 dark:bg-brand-950/30">
      <p className="text-sm text-awc-fg dark:text-white/90">
        This run used components that were only pulled into the task.
      </p>
      <button
        type="button"
        className="mt-3 rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-awc-blue-700 disabled:opacity-60"
        disabled={isSaving}
        onClick={() => {
          void keepInProject();
        }}
      >
        Keep in project
      </button>
      {message !== null ? (
        <p className="mt-2 text-xs text-awc-fg-muted dark:text-gray-400">
          {message}
        </p>
      ) : null}
    </div>
  );
}
