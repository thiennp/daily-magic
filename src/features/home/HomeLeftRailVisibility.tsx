"use client";

import { createContext, useContext, type ReactNode } from "react";

import useHomeLeftRailVisible from "@/features/home/hooks/useHomeLeftRailVisible";

const HomeLeftRailVisibilityContext = createContext<boolean | null>(null);

interface HomeLeftRailVisibilityProviderProps {
  readonly showLeftRail: boolean;
  readonly children: ReactNode;
}

export function HomeLeftRailVisibilityProvider({
  showLeftRail,
  children,
}: HomeLeftRailVisibilityProviderProps) {
  return (
    <HomeLeftRailVisibilityContext.Provider value={showLeftRail}>
      {children}
    </HomeLeftRailVisibilityContext.Provider>
  );
}

const useShowHomeLeftRail = (): boolean => {
  const provided = useContext(HomeLeftRailVisibilityContext);
  const fromOnboarding = useHomeLeftRailVisible();

  if (provided === null) {
    return fromOnboarding;
  }

  return provided;
};

export default useShowHomeLeftRail;
