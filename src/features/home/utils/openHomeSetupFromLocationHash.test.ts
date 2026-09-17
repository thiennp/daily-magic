import { afterEach, describe, expect, it, vi } from "vitest";

import { openHomeSetupFromLocationHash } from "@/features/home/utils/openHomeSetupFromLocationHash";

describe("openHomeSetupFromLocationHash", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("HOME-039: opens details and scrolls with nearest block when hash matches", async () => {
    const scrollIntoView = vi.fn();
    const details = { open: false, scrollIntoView };
    vi.stubGlobal("window", { location: { hash: "#your-setup" } });
    vi.stubGlobal("document", {
      getElementById: (id: string) => (id === "your-setup" ? details : null),
    });
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 0;
    });

    expect(openHomeSetupFromLocationHash()).toBe(true);
    expect(details.open).toBe(true);
    expect(scrollIntoView).toHaveBeenCalledWith({ block: "nearest" });
  });

  it("returns false when hash does not match", () => {
    vi.stubGlobal("window", { location: { hash: "#other" } });
    vi.stubGlobal("document", { getElementById: vi.fn() });

    expect(openHomeSetupFromLocationHash()).toBe(false);
  });
});
