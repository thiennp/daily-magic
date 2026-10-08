"use client";

import { useAgentRunQueue } from "@/features/agent/hooks/useAgentRunQueue";
import { useSendTaskSessionEndRequests } from "@/features/agent/hooks/useSendTaskSessionEndRequests";
import { useOpenMacShellFromQuery } from "@/features/agent/hooks/useOpenMacShellFromQuery";
import { useClearStaleMacDispatchError } from "@/features/agent/hooks/useClearStaleMacDispatchError";
import { useRefreshMacDevicesOnDispatchOfflineError } from "@/features/agent/hooks/useRefreshMacDevicesOnDispatchOfflineError";
import { useWsTestMacSession } from "@/features/agent/hooks/useWsTestMacSession";
import { useWsTestPanelLifecycle } from "@/features/agent/hooks/useWsTestPanelLifecycle";
import { useWsTestPanelSessionEndActions } from "@/features/agent/hooks/useWsTestPanelSessionEndActions";
import { useWsTestPanelSteppedComposer } from "@/features/agent/hooks/useWsTestPanelSteppedComposer";
import { useWsTestPromptHandlers } from "@/features/agent/hooks/useWsTestPromptHandlers";
import { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import { useWsTestWriterAgentSelection } from "@/features/agent/hooks/useWsTestWriterAgentSelection";
import { useAgentWitchSocket } from "@/features/agent/hooks/useAgentWitchSocket";
import { resolveWsTestPanelSessionTargets } from "@/features/agent/utils/resolveWsTestPanelSessionTargets";

export const useWsTestPanelController = (input: {
  readonly isSteppedComposer: boolean;
}) => {
  const socket = useAgentWitchSocket();
  const composer = useWsTestTaskComposer();
  const {
    writerAgent,
    pickWriterAgent,
    setWriterAgent,
    hasRememberedWriterAgentSelection,
    forgetWriterAgentPickInView,
  } = useWsTestWriterAgentSelection({ socket, composer });
  const { isSessionLive, sessionTargets } = resolveWsTestPanelSessionTargets({
    socket,
    composer,
    writerAgent,
  });
  const { queueCount, queueMessage, enqueueRun, flushQueue, refreshCount } =
    useAgentRunQueue();
  const macSession = useWsTestMacSession({
    socket,
    composer,
    sessionTargets,
    enqueueRun,
  });
  const promptHandlers = useWsTestPromptHandlers({
    composer,
    activeWriterAgent: sessionTargets.activeWriterAgent,
    activeDeviceId: sessionTargets.activeDeviceId,
    sendClaudePrompt: socket.sendClaudePrompt,
    enqueueRun,
  });
  const sessionEndActions = useWsTestPanelSessionEndActions({
    socket,
    composer,
    activeDeviceId: sessionTargets.activeDeviceId,
    promptHandlers,
  });
  const startWriterSession = (nextWriterAgent: typeof writerAgent) => {
    setWriterAgent(nextWriterAgent);
    socket.startWriterSession(nextWriterAgent, sessionTargets.activeDeviceId);
  };
  const steppedComposer = useWsTestPanelSteppedComposer({
    isSteppedComposer: input.isSteppedComposer,
    isSessionActive: macSession.isSessionActive,
    composer,
    writerAgent: sessionTargets.activeWriterAgent,
    hasRememberedWriterAgentSelection,
    activeDeviceId: sessionTargets.activeDeviceId,
    showMacPicker: !composer.isTeamDispatch,
    isMacDeviceLocked: sessionTargets.isMacDeviceLocked,
    onWriterAgentChange: pickWriterAgent,
    onStartWriterAgent: startWriterSession,
    onFinishSession: sessionEndActions.finishSession,
  });

  useSendTaskSessionEndRequests({
    isSessionLive,
    finishSession: sessionEndActions.finishSession,
    onPickAnotherWriter: () => {
      forgetWriterAgentPickInView();
      steppedComposer.panelActions.handleWriterStepBack();
    },
  });
  useWsTestPanelLifecycle({
    connectionStatus: socket.connectionStatus,
    flushQueue,
    refreshCount,
    sendClaudePrompt: socket.sendClaudePrompt,
    writerAgent,
    projectId: composer.selectedProjectId,
  });
  useOpenMacShellFromQuery({
    connectionStatus: socket.connectionStatus,
    openShell: socket.macShell.openShell,
  });
  useRefreshMacDevicesOnDispatchOfflineError({
    lastResponse: socket.lastResponse,
    refreshMacDevices: composer.refreshMacDevices,
  });
  useClearStaleMacDispatchError({
    lastResponse: socket.lastResponse,
    clearLastResponse: socket.clearLastResponse,
    selectedDeviceCanDispatch: composer.selectedDeviceCanDispatch,
    isTeamDispatch: composer.isTeamDispatch,
  });

  return {
    socket,
    composer,
    sessionTargets,
    queueCount,
    queueMessage,
    promptHandlers,
    startWriterSession,
    setWriterAgent: pickWriterAgent,
    ...macSession,
    ...steppedComposer,
    ...sessionEndActions,
  };
};
