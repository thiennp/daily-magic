"use client";

import { useMemo, useState, type ReactNode } from "react";

import AgentRunSemanticOutputView from "@/features/dispatch/AgentRunSemanticOutputView";
import {
  formatAgentRunSemanticOutput,
  hasAgentRunSemanticOutput,
} from "@/features/dispatch/utils/formatAgentRunSemanticOutput";

interface AgentLiveTerminalOutputTabsProps {
  readonly output: string;
  readonly terminalBody: ReactNode;
}

export default function AgentLiveTerminalOutputTabs({
  output,
  terminalBody,
}: AgentLiveTerminalOutputTabsProps) {
  const formatted = useMemo(
    () => formatAgentRunSemanticOutput(output),
    [output],
  );
  const [view, setView] = useState<"summary" | "terminal">(
    hasAgentRunSemanticOutput(formatted) ? "summary" : "terminal",
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
          Terminal
        </button>
      </div>
      {view === "summary" ? (
        <AgentRunSemanticOutputView
          formatted={formatted}
          fallbackPlain={output}
        />
      ) : (
        terminalBody
      )}
    </div>
  );
}
