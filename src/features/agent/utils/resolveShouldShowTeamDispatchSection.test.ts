import { describe, expect, it } from "vitest";

import { resolveShouldShowTeamDispatchSection } from "@/features/agent/utils/resolveShouldShowTeamDispatchSection";

describe("resolveShouldShowTeamDispatchSection", () => {
  it("hides the team section in the send-task modal wizard", () => {
    expect(
      resolveShouldShowTeamDispatchSection({
        isLibraryPlaybook: false,
        isOwnDeviceDispatch: false,
        isSteppedComposer: true,
        isLoading: false,
        groupCount: 2,
      }),
    ).toBe(false);
  });

  it("hides the empty company placeholder when there are no groups", () => {
    expect(
      resolveShouldShowTeamDispatchSection({
        isLibraryPlaybook: false,
        isOwnDeviceDispatch: false,
        isSteppedComposer: false,
        isLoading: false,
        groupCount: 0,
      }),
    ).toBe(false);
  });

  it("shows team fields on the full composer when groups exist", () => {
    expect(
      resolveShouldShowTeamDispatchSection({
        isLibraryPlaybook: false,
        isOwnDeviceDispatch: false,
        isSteppedComposer: false,
        isLoading: false,
        groupCount: 1,
      }),
    ).toBe(true);
  });
});
