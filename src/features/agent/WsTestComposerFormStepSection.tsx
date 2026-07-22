"use client";

import SendTaskComposerActiveProjectBadge from "@/features/agent/SendTaskComposerActiveProjectBadge";
import SendTaskComposerStepTrail from "@/features/agent/SendTaskComposerStepTrail";
import WsTestComposerFormStep from "@/features/agent/WsTestComposerFormStep";
import type { SendTaskComposerStepTrailViewItem } from "@/features/agent/types/SendTaskComposerStepTrailViewItem.type";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface WsTestComposerFormStepSectionProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly writerAgent: HarnessWriterAgent;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly isWriterAgentLocked: boolean;
  readonly isSteppedComposer: boolean;
  readonly macDispatchDeviceId: string;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
  readonly showTopSpacing: boolean;
  readonly stepTrail: readonly SendTaskComposerStepTrailViewItem[];
}

export default function WsTestComposerFormStepSection({
  composer,
  writerAgent,
  onWriterAgentChange,
  isWriterAgentLocked,
  isSteppedComposer,
  macDispatchDeviceId,
  connectionStatus,
  isSendDisabled,
  onSend,
  onClear,
  onQueue,
  showTopSpacing,
  stepTrail,
}: WsTestComposerFormStepSectionProps) {
  return (
    <div className={showTopSpacing ? "mt-6" : undefined}>
      {isSteppedComposer ? (
        <SendTaskComposerStepTrail items={stepTrail} />
      ) : null}
      <div className="mb-4">
        <SendTaskComposerActiveProjectBadge
          project={composer.selectedProject}
          isLoading={composer.isProjectsLoading}
        />
      </div>
      <WsTestComposerFormStep
        composer={composer}
        writerAgent={writerAgent}
        onWriterAgentChange={onWriterAgentChange}
        isWriterAgentLocked={isWriterAgentLocked}
        isSteppedComposer={isSteppedComposer}
        macDispatchDeviceId={macDispatchDeviceId}
        connectionStatus={connectionStatus}
        isSendDisabled={isSendDisabled}
        onSend={onSend}
        onClear={onClear}
        onQueue={onQueue}
        showTopSpacing={showTopSpacing}
      />
    </div>
  );
}
