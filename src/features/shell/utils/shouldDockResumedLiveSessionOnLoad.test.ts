import { describe, expect, it } from "vitest";

import { shouldDockResumedLiveSessionOnLoad } from "@/features/shell/utils/shouldDockResumedLiveSessionOnLoad";

describe("shouldDockResumedLiveSessionOnLoad", () => {
  it("docks a reloaded live run URL", () => {
    expect(
      shouldDockResumedLiveSessionOnLoad(
        "?sendTask=1&sourceRunId=812e1568&resumeLive=1",
      ),
    ).toBe(true);
  });

  it("leaves a plain New task URL expanded", () => {
    expect(shouldDockResumedLiveSessionOnLoad("?sendTask=1")).toBe(false);
    expect(shouldDockResumedLiveSessionOnLoad("?sendTask=1&resumeLive=1")).toBe(
      false,
    );
  });
});
