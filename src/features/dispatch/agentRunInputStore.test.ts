import { describe, it, expect, beforeEach } from "vitest";

import {
  getPendingInputForRun,
  setPendingInputForRun,
  clearPendingInputForRun,
  subscribeToPendingInput,
} from "@/features/dispatch/agentRunInputStore";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";

describe("agentRunInputStore", () => {
  const req: AgentRunInputRequest = {
    agentRunId: "run-1",
    question: "q",
    partialOutput: "",
  };

  beforeEach(() => {
    clearPendingInputForRun("run-1");
  });

  it("stores and clears requests, notifying subscribers", () => {
    const notified: number[] = [];
    const unsub = subscribeToPendingInput(() => {
      notified.push(1);
    });

    expect(getPendingInputForRun("run-1")).toBeUndefined();

    setPendingInputForRun("run-1", req);
    expect(getPendingInputForRun("run-1")).toBe(req);
    expect(notified).toHaveLength(1);

    clearPendingInputForRun("run-1");
    expect(getPendingInputForRun("run-1")).toBeUndefined();
    expect(notified).toHaveLength(2);

    unsub();
    setPendingInputForRun("run-1", req);
    expect(notified).toHaveLength(2);
  });
});
