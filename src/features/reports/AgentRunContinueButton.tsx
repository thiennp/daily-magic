"use client";

import Link from "next/link";

import Button from "@/components/ui/button/Button";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

/** Opens Send-a-task and tells the Mac CLI to --continue the last conversation. */
export default function AgentRunContinueButton() {
  const href = buildAgentComposerHref({ continueSession: true });

  return (
    <Link href={href} className="inline-flex">
      <Button>Continue conversation</Button>
    </Link>
  );
}
