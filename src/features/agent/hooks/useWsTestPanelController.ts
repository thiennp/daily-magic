"use client";

import { useAgentRunQueue } from "@/features/agent/hooks/useAgentRunQueue";
import { useContinueFromSourceRunPrefill } from "@/features/agent/hooks/useContinueFromSourceRunPrefill";
import { useDelegatedWriterAgent } from "@/features/agent/hooks/useDelegatedWriterAgent";
import { useOpenMacShellFromQuery } from "@/features/agent/hooks/useOpenMacShellFromQuery";
import { useClearStaleMacDispatchError } from "@/features/agent/hooks/useClearStaleMacDispatchError";
import { useRefreshMacDevicesOnDispatchOfflineError } from "@/features/agent/hooks/useRefreshMacDevicesOnDispatchOfflineError";
import { useWsTestMacSession } from "@/features/agent/hooks/useWsTestMacSession";
import { useWsTestPanelLifecycle } from "@/features/agent/hooks/useWsTestPanelLifecycle";
import { useWsTestPanelSteppedComposer } from "@/features/agent/hooks/useWsTestPanelSteppedComposer";
import { useWsTestPromptHandlers } from "@/features/agent/hooks/useWsTestPromptHandlers";
import { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import { useAgentWitchSocket } from "@/features/agent/hooks/useAgentWitchSocket";
import { resolveAgentSessionTargets } from "@/features/agent/utils/resolveAgentSessionTargets";

export const useWsTestPanelController = (input: {
  readonly isSteppedComposer: boolean;
}) => {
  const socket = useAgentWitchSocket();
  const composer = useWsTestTaskComposer();
  const { writerAgent, setWriterAgent, hasRememberedWriterAgentSelection } =
    useDelegatedWriterAgent();
  useContinueFromSourceRunPrefill({ setWriterAgent });
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
    onWriterAgentChange: setWriterAgent,
    onStartWriterAgent: startWriterSession,
    onFinishSession: socket.finishLiveTerminalSession,
  });

  useWsTestPanelLifecycle({
    connectionStatus: socket.connectionStatus,
    flushQueue,
    refreshCount,
    sendClaudePrompt: socket.sendClaudePrompt,
    writerAgent,
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
    setWriterAgent,
    ...macSession,
    ...steppedComposer,
  };
};
