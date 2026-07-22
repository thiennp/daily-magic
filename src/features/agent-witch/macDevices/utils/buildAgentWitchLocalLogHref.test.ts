import { describe, expect, it } from "vitest";

import buildAgentWitchLocalLogHref from "@/features/agent-witch/macDevices/utils/buildAgentWitchLocalLogHref";

describe("buildAgentWitchLocalLogHref", () => {
  it("builds /local href with port and display name", () => {
    expect(
      buildAgentWitchLocalLogHref({
        wakePort: 51234,
        displayName: "Mac Light S",
      }),
    ).toBe("/local?port=51234&name=Mac+Light+S");
  });
});
