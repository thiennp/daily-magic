import type { AgentWitchSocketStore } from "@/features/harness/hooks/utils/agentWitchSocketStore";
import { createAgentWitchRequestId } from "@/features/harness/hooks/utils/agentWitchSocketUtils";
import type HarnessItemWriteSpec from "@/lib/agentWitch/harness/types/HarnessItemWriteSpec.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const sendHarnessPayloadOverSocket = (input: {
  readonly socketStore: AgentWitchSocketStore;
  readonly writerAgent: HarnessWriterAgent;
  readonly spec: {
    readonly mode: "create-set" | "write-items";
    readonly name?: string;
    readonly slug?: string;
    readonly items?: readonly HarnessItemWriteSpec[];
  };
  readonly instruction: string;
}): void => {
  const socket = input.socketStore.socket;
  if (socket === null || socket.readyState !== WebSocket.OPEN) {
    return;
  }

  socket.send(
    JSON.stringify({
      type: "harness.request",
      payload: {
        writerAgent: input.writerAgent,
        spec: input.spec,
        instruction: input.instruction,
      },
      requestId: createAgentWitchRequestId(),
    }),
  );
};
