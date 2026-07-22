import type { RefObject } from "react";

import type { useWsTestComposerPanelActions } from "@/features/agent/hooks/useWsTestComposerPanelActions";
import type { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestPromptHandlers } from "@/features/agent/hooks/useWsTestPromptHandlers";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { useAgentWitchSocket } from "@/features/agent/hooks/useAgentWitchSocket";
import type { AgentMacShellPanelProps } from "@/features/agent/types/AgentMacShellPanelProps.type";
import type { SendTaskComposerStepTrailViewItem } from "@/features/agent/types/SendTaskComposerStepTrailViewItem.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { AgentLiveTerminalFeedbackPreferredMode } from "@/features/agent/utils/resolveAgentLiveTerminalFeedbackAction";
import type { resolveAgentSessionTargets } from "@/features/agent/utils/resolveAgentSessionTargets";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export interface WsTestPanelComposerSectionProps extends AgentMacShellPanelProps {
  readonly isSessionActive: boolean;
  readonly isSteppedComposer: boolean;
  readonly terminalSectionRef: RefObject<HTMLElement | null>;
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly sessionTargets: ReturnType<typeof resolveAgentSessionTargets>;
  readonly connectionStatus: ReturnType<
    typeof useAgentWitchSocket
  >["connectionStatus"];
  readonly promptHandlers: ReturnType<typeof useWsTestPromptHandlers>;
  readonly wizard: ReturnType<typeof useWsTestComposerWizard>;
  readonly panelActions: ReturnType<typeof useWsTestComposerPanelActions>;
  readonly stepTrail: readonly SendTaskComposerStepTrailViewItem[];
  readonly liveTerminalOutput: string;
  readonly liveTerminalStatus: AgentLiveTerminalStatus;
  readonly liveTerminalPendingCommandLine: string | null;
  readonly liveTerminalRunId: string | null;
  readonly feedbackVisible: boolean;
  readonly feedbackPendingQuestion: string | null;
  readonly feedbackPendingPartialOutput: string | null;
  readonly feedbackQueuedCount: number;
  readonly feedbackQueueNotice: string | null;
  readonly isFeedbackSubmitting: boolean;
  readonly onSubmitFeedback: (
    message: string,
    preferredMode?: AgentLiveTerminalFeedbackPreferredMode,
  ) => void;
  readonly sessionErrorMessage: string | null;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly onStartWriterAgent: (writerAgent: HarnessWriterAgent) => void;
  readonly onFinishSession: () => void;
  readonly onStopRun: () => void;
}
