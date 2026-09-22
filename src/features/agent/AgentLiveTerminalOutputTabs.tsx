"use client";

import { useMemo, useState, type ReactNode } from "react";

import AgentLiveRunOutcomeChip from "@/features/agent/AgentLiveRunOutcomeChip";
import AgentRunSemanticOutputView from "@/features/dispatch/AgentRunSemanticOutputView";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";
import {
  formatAgentRunSemanticOutput,
  hasAgentRunSemanticOutput,
} from "@/features/dispatch/utils/formatAgentRunSemanticOutput";

interface AgentLiveTerminalOutputTabsProps {
  readonly output: string;
  readonly terminalBody: ReactNode;
  readonly runOutcome?: AgentLiveRunOutcome | null;
  readonly humanSummary?: string | null;
}

export default function AgentLiveTerminalOutputTabs({
  output,
  terminalBody,
  runOutcome = null,
  humanSummary = null,
}: AgentLiveTerminalOutputTabsProps) {
  const formatted = useMemo(
    () => formatAgentRunSemanticOutput(output),
    [output],
  );
  const useHonestySummary = runOutcome !== null;
  const [view, setView] = useState<"summary" | "terminal">(
    useHonestySummary || hasAgentRunSemanticOutput(formatted)
      ? "summary"
      : "terminal",
  );

  return (
    <div className="mt-3">
      <div className="flex gap-2">
        <button
          type="button"
          className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
            view === "summary"
              ? "bg-brand-100 text-brand-800 dark:bg-brand-950/40 dark:text-brand-200"
              : "text-gray-600 dark:text-gray-400"
          }`}
          onClick={() => {
            setView("summary");
          }}
        >
          Summary
        </button>
        <button
          type="button"
          className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
            view === "terminal"
              ? "bg-brand-100 text-brand-800 dark:bg-brand-950/40 dark:text-brand-200"
              : "text-gray-600 dark:text-gray-400"
          }`}
          onClick={() => {
            setView("terminal");
          }}
        >
          Expand log
        </button>
      </div>
      {view === "summary" ? (
        useHonestySummary && runOutcome !== null ? (
          <div className="mt-2 space-y-2">
            <AgentLiveRunOutcomeChip
              kind={runOutcome.kind}
              label={runOutcome.chipLabel}
            />
            {humanSummary !== null && humanSummary.length > 0 ? (
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {humanSummary}
              </p>
            ) : null}
          </div>
        ) : (
          <AgentRunSemanticOutputView
            formatted={formatted}
            fallbackPlain={undefined}
          />
        )
      ) : (
        terminalBody
      )}
    </div>
  );
}
