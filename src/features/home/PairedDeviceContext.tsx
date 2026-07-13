"use client";

import {
  createContext,
  useContext,
  type ReactElement,
  type ReactNode,
} from "react";

import { useHasPairedDevice } from "@/features/home/hooks/useHasPairedDevice";

type PairedDeviceContextValue = ReturnType<typeof useHasPairedDevice>;

const PairedDeviceContext = createContext<PairedDeviceContextValue | null>(
  null,
);

export function PairedDeviceProvider({
  children,
}: {
  readonly children: ReactNode;
}): ReactElement {
  const value = useHasPairedDevice();

  return (
    <PairedDeviceContext.Provider value={value}>
      {children}
    </PairedDeviceContext.Provider>
  );
}

export function usePairedDeviceContext(): PairedDeviceContextValue {
  const context = useContext(PairedDeviceContext);

  if (context === null) {
    throw new Error(
      "usePairedDeviceContext must be used within PairedDeviceProvider.",
    );
  }

  return context;
}

export function useOptionalPairedDeviceContext(): PairedDeviceContextValue | null {
  return useContext(PairedDeviceContext);
}
