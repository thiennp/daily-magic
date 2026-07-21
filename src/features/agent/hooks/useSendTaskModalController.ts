"use client";

import { useCallback, useMemo } from "react";

import { useSendTaskModalActions } from "@/features/agent/hooks/useSendTaskModalActions";
import { useSendTaskModalState } from "@/features/agent/hooks/useSendTaskModalState";
import { resolveSendTaskPresentation } from "@/features/agent/utils/resolveSendTaskPresentation";

export const useSendTaskModalController = (): {
  readonly presentation: ReturnType<typeof resolveSendTaskPresentation>;
  readonly panelKey: string;
  readonly isOpen: boolean;
  readonly openSendTaskModal: ReturnType<
    typeof useSendTaskModalActions
  >["openSendTaskModal"];
  readonly expandRunningSendTask: ReturnType<
    typeof useSendTaskModalActions
  >["expandRunningSendTask"];
  readonly closeSendTaskModal: ReturnType<
    typeof useSendTaskModalActions
  >["closeSendTaskModal"];
  readonly expandSendTaskModal: ReturnType<
    typeof useSendTaskModalActions
  >["expandSendTaskModal"];
  readonly minimizeSendTaskModal: ReturnType<
    typeof useSendTaskModalActions
  >["minimizeSendTaskModal"];
  readonly onSessionActiveChange: (isSessionActive: boolean) => void;
} => {
  const {
    keepAlive,
    setKeepAlive,
    isSessionActive,
    setIsSessionActive,
    panelKey,
    setPanelKey,
    urlWantsOpen,
  } = useSendTaskModalState();
  const actions = useSendTaskModalActions({
    isSessionActive,
    setKeepAlive,
    setPanelKey,
  });
  const presentation = resolveSendTaskPresentation({ urlWantsOpen, keepAlive });

  const onSessionActiveChange = useCallback(
    (nextIsSessionActive: boolean) => {
      setIsSessionActive(nextIsSessionActive);
      if (nextIsSessionActive) {
        setKeepAlive(true);
      }
    },
    [setIsSessionActive, setKeepAlive],
  );

  return useMemo(
    () => ({
      presentation,
      panelKey,
      isOpen: presentation === "expanded",
      onSessionActiveChange,
      ...actions,
    }),
    [actions, onSessionActiveChange, panelKey, presentation],
  );
};
