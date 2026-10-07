"use client";

import Link from "next/link";

import { AGENT_WITCH_LOCAL_STATUS_DEEP_LINK } from "@/features/agent-witch/macDevices/openAgentWitchLocalStatus";

interface AgentLiveProgressStuckBannerProps {
  readonly isThisMac: boolean;
}

export default function AgentLiveProgressStuckBanner({
  isThisMac,
}: AgentLiveProgressStuckBannerProps) {
  return (
    <p
      className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100"
      role="status"
    >
      Your computer has not sent updates for a while.{" "}
      {isThisMac ? (
        <>
          {/* DF-033: raise the Mac app (H7) — not the retired 43347 page. */}
          <a
            href={AGENT_WITCH_LOCAL_STATUS_DEEP_LINK}
            className="font-medium underline underline-offset-2 hover:text-amber-950 dark:hover:text-white"
          >
            Open AgentWitch
          </a>{" "}
          on this computer, or try sending the task again.
        </>
      ) : (
        <>
          <Link
            href="/"
            className="font-medium underline underline-offset-2 hover:text-amber-950 dark:hover:text-white"
          >
            Open Home
          </Link>{" "}
          to wake AgentWitch, or try sending the task again.
        </>
      )}
    </p>
  );
}
