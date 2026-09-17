"use client";

import type { ReactNode } from "react";

import { useGuestSessionState } from "@/features/empty-states/useGuestSessionState";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

interface GuestAwarePageStackProps {
  readonly children: ReactNode;
}

/** Tighter vertical rhythm on signed-out Library / Reports empties (AW-EMPTY-1). */
export default function GuestAwarePageStack({
  children,
}: GuestAwarePageStackProps) {
  const { sessionState } = useGuestSessionState();
  const stackClassName =
    sessionState === "guest" ? "space-y-4" : APP_PAGE_STACK_CLASS;

  return <div className={stackClassName}>{children}</div>;
}
