import type { AgentMacShellPanelProps } from "@/features/agent/types/AgentMacShellPanelProps.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { AgentLiveTerminalFeedbackPreferredMode } from "@/features/agent/utils/resolveAgentLiveTerminalFeedbackAction";

export default interface AgentLiveTerminalPanelProps extends AgentMacShellPanelProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly activeRunId?: string | null;
  readonly sessionDeviceId?: string | null;
  readonly pendingCommandLine?: string | null;
  readonly feedbackVisible: boolean;
  readonly feedbackPendingQuestion: string | null;
  readonly feedbackPendingPartialOutput?: string | null;
  readonly feedbackQueuedCount: number;
  readonly feedbackQueueNotice: string | null;
  readonly isFeedbackSubmitting: boolean;
  readonly feedbackAutoFocus?: boolean;
  readonly isSteppedComposer?: boolean;
  readonly onSubmitFeedback: (
    message: string,
    preferredMode?: AgentLiveTerminalFeedbackPreferredMode,
  ) => void;
  readonly onFinishSession: () => void;
  readonly onStopRun: () => void;
  readonly onDeleteRun: () => void;
}
