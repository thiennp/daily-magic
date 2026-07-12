"use client";

import Link from "next/link";

import { useAppPath } from "@/features/demo/DemoPreviewContext";
import Button from "@/components/ui/button/Button";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

interface AgentRunAgainButtonProps {
  readonly prompt: string;
}

export default function AgentRunAgainButton({
  prompt,
}: AgentRunAgainButtonProps) {
  const appPath = useAppPath();
  const href = buildAgentComposerHref({ prompt });

  return (
    <Link href={appPath(href)} className="inline-flex">
      <Button variant="outline">Run again</Button>
    </Link>
  );
}
