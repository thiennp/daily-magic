"use client";

import Link from "next/link";

import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import type { ComposerBlockedAction } from "@/features/agent/utils/composerBlockedAction.types";

interface WsTestComposerHelperTextProps {
  readonly blockedAction: ComposerBlockedAction;
}

const helperSuffix = (blockedAction: ComposerBlockedAction): string | null => {
  if (blockedAction.stateId === "no_macs_online" && blockedAction.showCopy) {
    return ", or copy the prompt / queue the task until one comes online.";
  }

  if (blockedAction.stateId === "ws_disconnected" && blockedAction.showCopy) {
    return " You can still copy the prompt or queue the task for later.";
  }

  if (
    blockedAction.stateId === "selected_mac_offline" &&
    blockedAction.showCopy
  ) {
    return " You can still copy the assembled prompt.";
  }

  if (blockedAction.helperLinkHref) {
    return ".";
  }

  return null;
};

export default function WsTestComposerHelperText({
  blockedAction,
}: WsTestComposerHelperTextProps) {
  if (
    blockedAction.stateId === "none" ||
    blockedAction.helperMessage.length === 0
  ) {
    return null;
  }

  const suffix = helperSuffix(blockedAction);

  return (
    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
      {blockedAction.stateId === "ws_disconnected" ? (
        <>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Send to your Mac
          </span>{" "}
          {blockedAction.helperMessage}
        </>
      ) : (
        blockedAction.helperMessage
      )}
      {blockedAction.helperLinkHref && blockedAction.helperLinkLabel ? (
        <>
          {" "}
          <Link
            href={blockedAction.helperLinkHref}
            className={APP_SURFACE_TEXT_LINK_CLASS}
          >
            {blockedAction.helperLinkLabel}
          </Link>
        </>
      ) : null}
      {suffix}
    </p>
  );
}
