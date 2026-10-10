"use client";

import { useState } from "react";

import type { BrowserOperatingSystem } from "@/features/home/utils/public-api/types";

/**
 * On a Mac the app is the easy path, so the install command (which reserves a
 * computer slot when it is created) is only minted once the user opens the
 * Terminal section. Other systems keep minting when the dialog opens. The open
 * flag resets each time the dialog opens or closes.
 */
const useConnectTerminalSection = (input: {
  readonly operatingSystem: BrowserOperatingSystem;
  readonly isModalOpen: boolean;
}): {
  readonly shouldMintCommand: boolean;
  readonly onTerminalSectionToggle: (open: boolean) => void;
} => {
  const [state, setState] = useState({
    open: false,
    modalWasOpen: input.isModalOpen,
  });
  if (state.modalWasOpen !== input.isModalOpen) {
    setState({ open: false, modalWasOpen: input.isModalOpen });
  }
  const isTerminalSectionOpen = state.open && input.isModalOpen;

  return {
    shouldMintCommand:
      input.isModalOpen &&
      (input.operatingSystem !== "mac" || isTerminalSectionOpen),
    onTerminalSectionToggle: (open: boolean): void => {
      setState((current) => ({ ...current, open }));
    },
  };
};

export default useConnectTerminalSection;
