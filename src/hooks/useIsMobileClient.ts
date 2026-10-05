"use client";

import { useSyncExternalStore } from "react";

import detectMobileClient from "@/lib/mobile/detectMobileClient";

const subscribeToViewport = (onChange: () => void): (() => void) => {
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("resize", onChange);
  };
};

const getServerSnapshot = (): boolean => false;

/** React hook around `detectMobileClient`. SSR / first paint → false. */
export default function useIsMobileClient(): boolean {
  return useSyncExternalStore(
    subscribeToViewport,
    detectMobileClient,
    getServerSnapshot,
  );
}
