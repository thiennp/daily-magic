"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  MarketingAuthModalContext,
  type MarketingAuthMode,
} from "@/features/marketing/MarketingAuthModalContext";

import HomeMarketingAuthModal from "./HomeMarketingAuthModal";

interface ModalState {
  readonly mode: MarketingAuthMode;
  readonly note: string;
}

const GET_STARTED_HASH = "#get-started";

/** Owns the sign-in / create-account dialog; `/#get-started` links open it. */
export default function HomeMarketingAuthModalProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [state, setState] = useState<ModalState | null>(null);
  const open = useCallback((mode: MarketingAuthMode, note = "") => {
    setState({ mode, note });
  }, []);
  const api = useMemo(() => ({ open }), [open]);

  useEffect(() => {
    const openFromHash = (): void => {
      if (window.location.hash === GET_STARTED_HASH) {
        open("up");
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => {
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [open]);

  return (
    <MarketingAuthModalContext.Provider value={api}>
      {children}
      {state ? (
        <HomeMarketingAuthModal
          mode={state.mode}
          note={state.note}
          onModeChange={(mode) => {
            setState({ mode, note: "" });
          }}
          onClose={() => {
            setState(null);
          }}
        />
      ) : null}
    </MarketingAuthModalContext.Provider>
  );
}
