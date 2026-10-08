"use client";

import { useState } from "react";

import { useSendTaskModalUrlFlags } from "@/features/agent/hooks/useSendTaskModalUrlFlags";
import { hasPersistedInProgressAgentLiveTerminalSession } from "@/features/agent/utils/hasPersistedInProgressAgentLiveTerminalSession";
import { resolveSendTaskKeepAliveOnUrlClose } from "@/features/agent/utils/resolveSendTaskPresentation";
import {
  resolveSendTaskModalPanelKey,
  shouldKeepDockedPanelOnExpand,
} from "@/features/agent/utils/resolveSendTaskModalPanelKey";

export const useSendTaskModalState = (): {
  readonly keepAlive: boolean;
  readonly setKeepAlive: (value: boolean) => void;
  readonly isSessionActive: boolean;
  readonly setIsSessionActive: (value: boolean) => void;
  readonly panelKey: string;
  readonly setPanelKey: (value: string) => void;
  readonly urlWantsOpen: boolean;
} => {
  const {
    urlWantsOpen,
    shouldRestoreLiveSession,
    capabilityFromUrl,
    sourceRunId,
    isResumeLive,
  } = useSendTaskModalUrlFlags();
  const [keepAlive, setKeepAlive] = useState(
    () => urlWantsOpen || hasPersistedInProgressAgentLiveTerminalSession(),
  );
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [panelKey, setPanelKey] = useState(() =>
    resolveSendTaskModalPanelKey({
      shouldRestoreLiveSession,
      capabilityFromUrl,
      sourceRunId,
    }),
  );
  const [wasUrlOpen, setWasUrlOpen] = useState(urlWantsOpen);

  if (urlWantsOpen !== wasUrlOpen) {
    const previousWasUrlOpen = wasUrlOpen;
    setWasUrlOpen(urlWantsOpen);
    if (
      urlWantsOpen &&
      shouldKeepDockedPanelOnExpand({ keepAlive, isResumeLive, sourceRunId })
    ) {
      setKeepAlive(true);
    } else if (urlWantsOpen) {
      setKeepAlive(true);
      setPanelKey(
        resolveSendTaskModalPanelKey({
          shouldRestoreLiveSession,
          capabilityFromUrl,
          sourceRunId,
        }),
      );
    } else if (
      resolveSendTaskKeepAliveOnUrlClose({
        wasUrlOpen: previousWasUrlOpen,
        keepAlive,
        isSessionActive,
        // keepAlive is only cleared while the URL is open by an explicit Close.
        closedByUser: !keepAlive,
      })
    ) {
      setKeepAlive(true);
    }
  }

  return {
    keepAlive,
    setKeepAlive,
    isSessionActive,
    setIsSessionActive,
    panelKey,
    setPanelKey,
    urlWantsOpen,
  };
};
