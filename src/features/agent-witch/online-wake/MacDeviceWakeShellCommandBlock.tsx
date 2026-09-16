"use client";

import { useMemo } from "react";

import CopyableBashCommand from "@/features/home/CopyableBashCommand";
import { buildAgentWitchWakeTerminalCommand } from "@/features/agent-witch/online-wake/buildAgentWitchWakeTerminalCommand";

interface MacDeviceWakeShellCommandBlockProps {
  readonly leadIn?: string;
}

export default function MacDeviceWakeShellCommandBlock({
  leadIn = "In Terminal on this Mac, run:",
}: MacDeviceWakeShellCommandBlockProps) {
  const wakeTerminalCommand = useMemo(
    () => buildAgentWitchWakeTerminalCommand(),
    [],
  );

  return (
    <div className="mt-4 space-y-2">
      <p className="text-sm text-gray-600 dark:text-gray-400">{leadIn}</p>
      <CopyableBashCommand command={wakeTerminalCommand} variant="bash" />
    </div>
  );
}
