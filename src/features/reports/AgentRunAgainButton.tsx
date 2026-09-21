"use client";

import Link from "next/link";

import Button from "@/components/ui/button/Button";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

interface AgentRunAgainButtonProps {
  readonly prompt: string;
  readonly label?: string;
}

export default function AgentRunAgainButton({
  prompt,
  label = "Run again",
}: AgentRunAgainButtonProps) {
  const href = buildAgentComposerHref({ prompt });

  return (
    <Link href={href} className="inline-flex">
      <Button variant="outline">{label}</Button>
    </Link>
  );
}
