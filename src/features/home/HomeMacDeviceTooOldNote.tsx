"use client";

import Link from "next/link";

import { AGENT_WITCH_LOCAL_DOWNLOAD_URL } from "@/lib/agentWitch/agentWitchLocalTooOld.constant";

/** Inline row note when the devices API reports `connectVersionStatus: "too_old"`. */
export default function HomeMacDeviceTooOldNote() {
  return (
    <p
      role="status"
      className="mt-2 px-3 text-xs text-amber-700 dark:text-amber-300"
      data-testid="device-awl-too-old"
    >
      AWL too old — download update.{" "}
      <Link
        href={AGENT_WITCH_LOCAL_DOWNLOAD_URL}
        className="font-medium underline underline-offset-2"
      >
        Download update
      </Link>
    </p>
  );
}
