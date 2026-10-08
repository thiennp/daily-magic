import { describe, expect, it } from "vitest";

import { resolveWriterPromptDispatchSessionTurn } from "@/features/agent/utils/resolveWriterPromptDispatchSessionTurn";

describe("resolveWriterPromptDispatchSessionTurn (9c8a811d)", () => {
  it("a history Continue with a source run shows the host's fresh seeded run", () => {
    expect(
      resolveWriterPromptDispatchSessionTurn({
        sessionContinuation: true,
        sourceRunId: "9b899065-cdb2-436d-b3c6-5196c7644ce3",
      }),
    ).toBe("first");
  });

  it("a live-thread follow-up without a source run shows --continue", () => {
    expect(
      resolveWriterPromptDispatchSessionTurn({
        sessionContinuation: true,
        sourceRunId: undefined,
      }),
    ).toBe("continue");
    expect(
      resolveWriterPromptDispatchSessionTurn({
        sessionContinuation: false,
        sourceRunId: undefined,
      }),
    ).toBe("first");
  });
});
