"use client";

import Link from "next/link";

import Button from "@/components/ui/button/Button";
import { canContinueAgentRunOnStoredMac } from "@/features/reports/utils/canContinueAgentRunOnStoredMac";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

interface AgentRunContinueButtonProps {
  readonly deviceId: string | null;
}

/** Opens Send-a-task on the Mac that originally ran this job. */
export default function AgentRunContinueButton({
  deviceId,
}: AgentRunContinueButtonProps) {
  if (!canContinueAgentRunOnStoredMac(deviceId)) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Continue is unavailable because this job has no saved Mac.
      </p>
    );
  }

  const href = buildAgentComposerHref({
    continueSession: true,
    deviceId,
  });

  return (
    <Link href={href} className="inline-flex">
      <Button>Continue conversation</Button>
    </Link>
  );
}
