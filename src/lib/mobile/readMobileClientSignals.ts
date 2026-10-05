import type MobileClientSignals from "@/lib/mobile/types/MobileClientSignals.type";

type NavigatorWithUserAgentData = Navigator & {
  readonly userAgentData?: {
    readonly mobile?: boolean;
    readonly platform?: string;
  };
};

const matchesMediaQuery = (query: string): boolean =>
  typeof window.matchMedia === "function" && window.matchMedia(query).matches;

/** Reads mobile signals from the browser; null on the server (no window). */
export default function readMobileClientSignals(): MobileClientSignals | null {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return null;
  }

  const nav = navigator as NavigatorWithUserAgentData;
  const userAgentDataMobile = nav.userAgentData?.mobile;

  return {
    userAgent: nav.userAgent ?? null,
    userAgentDataMobile:
      typeof userAgentDataMobile === "boolean" ? userAgentDataMobile : null,
    platform: nav.userAgentData?.platform ?? nav.platform ?? null,
    maxTouchPoints:
      typeof nav.maxTouchPoints === "number" ? nav.maxTouchPoints : 0,
    primaryPointerCoarse: matchesMediaQuery("(pointer: coarse)"),
    anyPointerFine: matchesMediaQuery("(any-pointer: fine)"),
    viewportWidth:
      typeof window.innerWidth === "number" ? window.innerWidth : null,
  };
}
