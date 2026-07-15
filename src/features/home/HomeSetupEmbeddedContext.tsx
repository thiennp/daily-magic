"use client";

import { createContext, useContext, type ReactNode } from "react";

const HomeSetupEmbeddedContext = createContext(false);

export function HomeSetupEmbeddedProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <HomeSetupEmbeddedContext.Provider value={true}>
      {children}
    </HomeSetupEmbeddedContext.Provider>
  );
}

export function useHomeSetupEmbedded(): boolean {
  return useContext(HomeSetupEmbeddedContext);
}
