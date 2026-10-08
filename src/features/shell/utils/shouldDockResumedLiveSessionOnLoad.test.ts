import { describe, expect, it } from "vitest";

import {
  shouldDockReloadedLiveSession,
  shouldDockResumedLiveSessionOnLoad,
} from "@/features/shell/utils/shouldDockResumedLiveSessionOnLoad";

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

describe("shouldDockReloadedLiveSession (bd93cdcc)", () => {
  const deepLink =
    "?sendTask=1&libraryCapabilityId=b798&deviceId=4d58&projectId=bad4&writerAgent=antigravity";

  it("docks a reloaded deep link while the run is live", () => {
    expect(
      shouldDockReloadedLiveSession({
        search: deepLink,
        isReload: true,
        hasLiveSession: true,
      }),
    ).toBe(true);
  });

  it("keeps a freshly opened deep link, or one with no live run, expanded", () => {
    expect(
      shouldDockReloadedLiveSession({
        search: deepLink,
        isReload: false,
        hasLiveSession: true,
      }),
    ).toBe(false);
    expect(
      shouldDockReloadedLiveSession({
        search: deepLink,
        isReload: true,
        hasLiveSession: false,
      }),
    ).toBe(false);
  });

  it("still docks a ?resumeLive=1 reload", () => {
    expect(
      shouldDockReloadedLiveSession({
        search: "?sendTask=1&sourceRunId=812e1568&resumeLive=1",
        isReload: false,
        hasLiveSession: false,
      }),
    ).toBe(true);
  });
});
