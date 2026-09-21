"use client";

import type { ReactElement, ReactNode } from "react";

import AgentLiveTerminalMirrorToggle from "@/features/agent/AgentLiveTerminalMirrorToggle";

interface AgentLiveTerminalSteppedMirrorProps {
  readonly isTerminalOpen: boolean;
  readonly onToggleTerminal: () => void;
  readonly terminalBody: ReactElement | null;
}

export default function AgentLiveTerminalSteppedMirror({
  isTerminalOpen,
  onToggleTerminal,
  terminalBody,
}: AgentLiveTerminalSteppedMirrorProps): ReactNode {
  return (
    <>
      <AgentLiveTerminalMirrorToggle
        isOpen={isTerminalOpen}
        onToggle={onToggleTerminal}
      />
      {terminalBody}
    </>
  );
}
