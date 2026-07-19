"use client";

import Link from "next/link";

import Button from "@/components/ui/button/Button";
import { buildAgentRunContinueHref } from "@/features/reports/utils/buildAgentRunContinueHref";
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
  const href = buildAgentRunContinueHref({ run });

  return (
    <Link href={href} className="inline-flex">
      <Button>Continue conversation</Button>
    </Link>
  );
}
