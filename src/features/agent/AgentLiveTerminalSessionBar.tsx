"use client";

import Button from "@/components/ui/button/Button";
import { HARNESS_WRITER_LABELS } from "@/features/harness/constants/harnessFormOptions";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface AgentLiveTerminalSessionBarProps {
  readonly sessionWriterAgent: HarnessWriterAgent;
  readonly sessionDeviceName: string | null;
  readonly onFinishSession: () => void;
}

export default function AgentLiveTerminalSessionBar({
  sessionWriterAgent,
  sessionDeviceName,
  onFinishSession,
}: AgentLiveTerminalSessionBarProps) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 dark:border-brand-500/30 dark:bg-brand-500/10">
      <p className="text-sm text-gray-700 dark:text-gray-200">
        Mac session on{" "}
        <span className="font-medium">{sessionDeviceName ?? "your Mac"}</span>{" "}
        with{" "}
        <span className="font-medium">
          {HARNESS_WRITER_LABELS[sessionWriterAgent]}
        </span>
        . Send more tasks to continue, or finish when you are done.
      </p>
      <Button size="sm" variant="outline" onClick={onFinishSession}>
        Finish session
      </Button>
    </div>
  );
}
