"use client";

import WorkflowTrialRunGatePanel from "@/features/agent/WorkflowTrialRunGatePanel";
import WsTestPromptSection from "@/features/agent/WsTestPromptSection";
import type { useWsTestComposerPanelActions } from "@/features/agent/hooks/public-api/types";
import type { useWsTestComposerWizard } from "@/features/agent/hooks/public-api/types";
import type { useWsTestPromptHandlers } from "@/features/agent/hooks/public-api/types";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/public-api/types";
import type { useAgentWitchSocket } from "@/features/agent/hooks/public-api/types";
import type { SendTaskComposerStepTrailViewItem } from "@/features/agent/types/public-api/types";
import type { resolveAgentSessionTargets } from "@/features/agent/utils/resolveAgentSessionTargets";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface WsTestPanelDelegationSectionProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly sessionTargets: ReturnType<typeof resolveAgentSessionTargets>;
  readonly connectionStatus: ReturnType<
    typeof useAgentWitchSocket
  >["connectionStatus"];
  readonly writerAgent: HarnessWriterAgent;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly promptHandlers: ReturnType<typeof useWsTestPromptHandlers>;
  readonly isSteppedComposer: boolean;
  readonly wizard: ReturnType<typeof useWsTestComposerWizard>;
  readonly panelActions: ReturnType<typeof useWsTestComposerPanelActions>;
  readonly stepTrail: readonly SendTaskComposerStepTrailViewItem[];
  readonly onStartWriterAgent: (writerAgent: HarnessWriterAgent) => void;
}

export default function WsTestPanelDelegationSection({
  composer,
  sessionTargets,
  connectionStatus,
  writerAgent,
  onWriterAgentChange,
  promptHandlers,
  isSteppedComposer,
  wizard,
  panelActions,
  stepTrail,
  onStartWriterAgent,
}: WsTestPanelDelegationSectionProps) {
  const shouldShowWorkflowTrialGate =
    (composer.isLibraryPlaybook || composer.isWorkflowTask) &&
    !composer.workflowTrialRunEligibility.allowed;

  if (shouldShowWorkflowTrialGate) {
    const eligibility = composer.workflowTrialRunEligibility;
    if (!eligibility.allowed) {
      return <WorkflowTrialRunGatePanel reason={eligibility.reason} />;
    }
  }

  return (
    <WsTestPromptSection
      composer={composer}
      writerAgent={writerAgent}
      onWriterAgentChange={onWriterAgentChange}
      isWriterAgentLocked={sessionTargets.isWriterAgentLocked}
      isMacDeviceLocked={sessionTargets.isMacDeviceLocked}
      macDispatchDeviceId={sessionTargets.activeDeviceId}
      connectionStatus={connectionStatus}
      isSendDisabled={composer.isSendDisabled(
        connectionStatus,
        sessionTargets.activeDeviceId,
      )}
      isSteppedComposer={isSteppedComposer}
      wizard={wizard}
      panelActions={panelActions}
      stepTrail={stepTrail}
      onSend={promptHandlers.onSend}
      onQueue={promptHandlers.onQueue}
      onClear={promptHandlers.onClear}
      onStartWriterAgent={onStartWriterAgent}
    />
  );
}
