"use client";

import { useCallback, useState } from "react";

import { AGENT_WITCH_PAIRING_TOKEN_STORAGE_KEY } from "@/lib/agentWitch/constants/pairingTokenStorageKey.constant";

export interface UseAgentPairingTokenResult {
  readonly pairingToken: string;
  readonly setPairingToken: (value: string) => void;
  readonly savePairingToken: () => void;
}

const readSavedPairingToken = (): string => {
  if (typeof window === "undefined") {
    return "";
  }

  return (
    window.localStorage.getItem(AGENT_WITCH_PAIRING_TOKEN_STORAGE_KEY) ?? ""
  );
};

export function useAgentPairingToken(): UseAgentPairingTokenResult {
  const [pairingToken, setPairingToken] = useState(readSavedPairingToken);

  const savePairingToken = useCallback(() => {
    const trimmedToken = pairingToken.trim();
    if (trimmedToken.length === 0) {
      window.localStorage.removeItem(AGENT_WITCH_PAIRING_TOKEN_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(
      AGENT_WITCH_PAIRING_TOKEN_STORAGE_KEY,
      trimmedToken,
    );
    setPairingToken(trimmedToken);
  }, [pairingToken]);

  return {
    pairingToken,
    setPairingToken,
    savePairingToken,
  };
}
