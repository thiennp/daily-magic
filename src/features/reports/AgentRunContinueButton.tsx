"use client";

import Link from "next/link";

import Button from "@/components/ui/button/Button";
import { buildAgentRunContinueHref } from "@/features/reports/utils/buildAgentRunContinueHref";
import { canContinueAgentRunOnStoredMac } from "@/features/reports/utils/canContinueAgentRunOnStoredMac";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

interface AgentRunContinueButtonProps {
  readonly run: Pick<
    AgentRunRecord,
    "id" | "deviceId" | "writerAgent" | "capabilityId"
  >;
}

/** Opens Send-a-task scoped to this job on the same Mac/browser. */
export default function AgentRunContinueButton({
  run,
}: AgentRunContinueButtonProps) {
  if (!canContinueAgentRunOnStoredMac(run.deviceId)) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Continue is unavailable because this job has no saved Mac.
      </p>
    );
  }

  const href = buildAgentRunContinueHref({ run });

  return (
    <Link href={href} className="inline-flex">
      <Button>Continue conversation</Button>
    </Link>
  );
}
