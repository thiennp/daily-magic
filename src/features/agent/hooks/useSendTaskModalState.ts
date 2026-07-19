"use client";

import { useState } from "react";

import { useSendTaskModalUrlFlags } from "@/features/agent/hooks/useSendTaskModalUrlFlags";
import { resolveSendTaskKeepAliveOnUrlClose } from "@/features/agent/utils/resolveSendTaskPresentation";
import { resolveSendTaskModalPanelKey } from "@/features/agent/utils/resolveSendTaskModalPanelKey";

export const useSendTaskModalState = (): {
  readonly keepAlive: boolean;
  readonly setKeepAlive: (value: boolean) => void;
  readonly isSessionActive: boolean;
  readonly setIsSessionActive: (value: boolean) => void;
  readonly panelKey: string;
  readonly setPanelKey: (value: string) => void;
  readonly urlWantsOpen: boolean;
} => {
  const { urlWantsOpen, shouldRestoreLiveSession, capabilityFromUrl } =
    useSendTaskModalUrlFlags();
  const [keepAlive, setKeepAlive] = useState(urlWantsOpen);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [panelKey, setPanelKey] = useState(() =>
    resolveSendTaskModalPanelKey({
      shouldRestoreLiveSession,
      capabilityFromUrl,
    }),
  );
  const [wasUrlOpen, setWasUrlOpen] = useState(urlWantsOpen);

  if (urlWantsOpen !== wasUrlOpen) {
    const previousWasUrlOpen = wasUrlOpen;
    setWasUrlOpen(urlWantsOpen);
    if (urlWantsOpen) {
      setKeepAlive(true);
      setPanelKey(
        resolveSendTaskModalPanelKey({
          shouldRestoreLiveSession,
          capabilityFromUrl,
        }),
      );
    } else if (
      resolveSendTaskKeepAliveOnUrlClose({
        wasUrlOpen: previousWasUrlOpen,
        keepAlive,
        isSessionActive,
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
