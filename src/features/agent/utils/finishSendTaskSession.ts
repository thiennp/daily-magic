import type { useAgentWitchSocket } from "@/features/agent/hooks/useAgentWitchSocket";

/** Ends the open writer session and closes the live shell (73820cb1). */
export const finishSendTaskSession = (
  socket: Pick<
    ReturnType<typeof useAgentWitchSocket>,
    "finishLiveTerminalSession" | "macShell"
  >,
): void => {
  socket.finishLiveTerminalSession();
  if (socket.macShell.status !== "idle") {
    socket.macShell.closeShell();
  }
};
