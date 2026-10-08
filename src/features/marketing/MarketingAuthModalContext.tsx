"use client";

import { createContext, useContext } from "react";

export type MarketingAuthMode = "in" | "up";

export interface MarketingAuthModalApi {
  readonly open: (mode: MarketingAuthMode, note?: string) => void;
}

/** Null outside the Home landing: callers fall back to plain links. */
export const MarketingAuthModalContext =
  createContext<MarketingAuthModalApi | null>(null);

export const useMarketingAuthModal = (): MarketingAuthModalApi | null =>
  useContext(MarketingAuthModalContext);
