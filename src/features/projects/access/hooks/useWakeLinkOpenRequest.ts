"use client";

import { useEffect, type RefObject } from "react";

import { parseAwcGrokWakeLinkHash } from "@/features/projects/access/awcGrokWakeLinkDeepLink";

/**
 * When `openRequest` bumps (deep link or "Add wake link"): expand the form,
 * drop a consumed `#wake-link-<id>` hash, scroll the row in and focus the
 * wake link field (Access form) or the wake link field (Members rail).
 */
export const useWakeLinkOpenRequest = (input: {
  readonly containerRef: RefObject<HTMLElement | null>;
  readonly openRequest: number;
  readonly openForm: () => void;
  readonly membershipId: string;
}): void => {
  const { containerRef, openRequest, openForm, membershipId } = input;
  useEffect(() => {
    if (openRequest <= 0) return;
    openForm();
    if (parseAwcGrokWakeLinkHash(window.location.hash) === membershipId) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
    const node = containerRef.current;
    node?.scrollIntoView?.({ behavior: "smooth", block: "center" });
    const frame = window.requestAnimationFrame(() => {
      node
        ?.querySelector<HTMLElement>(
          'input[name="grok-webhook-url"], input[name="grok-wake-url"]',
        )
        ?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [containerRef, openRequest, openForm, membershipId]);
};
