"use client";

import { useState, type ReactNode } from "react";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

interface ConnectThisMacAppFirstProps {
  readonly downloadUrl: string;
  /** Lets the caller create the install command only once the section opens. */
  readonly onTerminalSectionToggle?: (open: boolean) => void;
  /** The install command block; mounted only while the section is open. */
  readonly terminalBody: ReactNode;
}

/** Mac: the app signs in and connects (no Terminal); the command is the fallback. */
export default function ConnectThisMacAppFirst({
  downloadUrl,
  onTerminalSectionToggle,
  terminalBody,
}: ConnectThisMacAppFirstProps) {
  const [isTerminalSectionOpen, setIsTerminalSectionOpen] = useState(false);
  return (
    <>
      <section className="mt-3 space-y-3">
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>
          Download the AgentWitch Mac app, open it, and sign in. It sets up this
          computer and connects it to your account. No Terminal needed.
        </p>
        <a href={downloadUrl} className={APP_SURFACE_CTA_PRIMARY_CLASS}>
          Download for Mac
        </a>
        <p className="text-xs text-awc-fg-muted dark:text-gray-400">
          For Macs with Apple silicon. Already installed and it says this
          computer is not linked? Open the app and choose Reconnect.
        </p>
      </section>
      <details
        className="mt-5 border-t border-awc-border pt-4 dark:border-white/10"
        open={isTerminalSectionOpen}
        onToggle={(event) => {
          setIsTerminalSectionOpen(event.currentTarget.open);
          onTerminalSectionToggle?.(event.currentTarget.open);
        }}
      >
        <summary className="cursor-pointer text-sm font-medium text-awc-fg dark:text-white/90">
          Intel Mac, or prefer Terminal? Use a command instead
        </summary>
        {isTerminalSectionOpen ? terminalBody : null}
      </details>
    </>
  );
}
