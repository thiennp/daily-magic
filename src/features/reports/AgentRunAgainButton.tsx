"use client";

import Link from "next/link";

import Button from "@/components/ui/button/Button";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

interface AgentRunAgainButtonProps {
  readonly prompt: string;
}

export default function AgentRunAgainButton({
  prompt,
}: AgentRunAgainButtonProps) {
  const href = buildAgentComposerHref({ prompt });

  return (
    <Link href={href} className="inline-flex">
      <Button variant="outline">Run again</Button>
    </Link>
  );
}
