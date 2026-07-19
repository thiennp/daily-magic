import { describe, expect, it } from "vitest";

import { buildAgentRunContinueHref } from "@/features/reports/utils/buildAgentRunContinueHref";

describe("buildAgentRunContinueHref", () => {
  it("AGENT-038 scopes continue to the source run, Mac, and writer", () => {
    expect(
      buildAgentRunContinueHref({
        run: {
          id: "run-9",
          deviceId: "mac-1",
          writerAgent: "cursor",
          capabilityId: "cap-1",
        },
        prompt: "Ship tests",
      }),
    ).toBe(
      "/?sendTask=1&libraryCapabilityId=cap-1&prompt=Ship+tests&deviceId=mac-1&writerAgent=cursor&sourceRunId=run-9&continueSession=1",
    );
  });
});
