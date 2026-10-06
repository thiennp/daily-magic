"use client";

import Link from "next/link";

import AwlRepairManuallyInfoButton from "@/features/agent-witch/macDevices/repairManually/AwlRepairManuallyInfoButton";
import { AGENT_WITCH_LOCAL_TOO_OLD_COPY } from "@/features/home/agentWitchLocalTooOldCopy.constant";
import { AGENT_WITCH_LOCAL_DOWNLOAD_URL } from "@/lib/agentWitch/agentWitchLocalTooOld.constant";

/**
 * Inline row note when the devices API reports `connectVersionStatus: "too_old"`.
 * (i) opens Repair manually when self-update did not fix it.
 */
export default function HomeMacDeviceTooOldNote() {
  return (
    <div
      role="status"
      className="mt-2 flex flex-wrap items-center gap-x-1.5 px-3 text-xs text-amber-700 dark:text-amber-300"
      data-testid="device-awl-too-old"
    >
      <span>{AGENT_WITCH_LOCAL_TOO_OLD_COPY.rowNote}</span>
      <Link
        href={AGENT_WITCH_LOCAL_DOWNLOAD_URL}
        className="font-medium underline underline-offset-2"
      >
        {AGENT_WITCH_LOCAL_TOO_OLD_COPY.rowLink}
      </Link>
      <AwlRepairManuallyInfoButton />
    </div>
  );
}
