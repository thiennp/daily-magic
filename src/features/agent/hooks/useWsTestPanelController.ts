"use client";

import { useAgentRunQueue } from "@/features/agent/hooks/useAgentRunQueue";
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
import { resolveAgentSessionTargets } from "@/features/agent/utils/resolveAgentSessionTargets";

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
  } = useWsTestWriterAgentSelection({ socket, composer });
  const sessionTargets = resolveAgentSessionTargets({
    sessionWriterAgent: socket.sessionWriterAgent,
    writerAgent,
    sessionDeviceId: socket.sessionDeviceId,
    selectedDeviceId: composer.selectedDeviceId,
    availableDeviceIds: composer.macDevices.map((device) => device.id),
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
