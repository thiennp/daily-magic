"use client";

import { createContext, useContext } from "react";

import type { ServerSessionHint } from "@/lib/auth/resolveServerSessionHint";

const GuestSessionHintContext = createContext<ServerSessionHint | undefined>(
  undefined,
);

export function GuestSessionStateProvider({
  serverSessionHint,
  children,
}: {
  readonly serverSessionHint: ServerSessionHint;
  readonly children: React.ReactNode;
}) {
  return (
    <GuestSessionHintContext.Provider value={serverSessionHint}>
      {children}
    </GuestSessionHintContext.Provider>
  );
}

export function useGuestSessionHint(): ServerSessionHint | undefined {
  return useContext(GuestSessionHintContext);
}
