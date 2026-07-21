import { describe, expect, it, vi } from "vitest";

import { consumeLocalTokenHashQueryParam } from "@/features/home/utils/consumeLocalTokenHashQueryParam";

describe("consumeLocalTokenHashQueryParam (HOME-031)", () => {
  it("persists awLocalTokenHash and strips it from the URL", () => {
    const setTokenHash = vi.fn();
    const replaceUrl = vi.fn();

    expect(
      consumeLocalTokenHashQueryParam({
        href: "https://www.agentwitch.com/home?awLocalTokenHash=abc123&x=1",
        setTokenHash,
        replaceUrl,
      }),
    ).toBe(true);

    expect(setTokenHash).toHaveBeenCalledWith("abc123");
    expect(replaceUrl).toHaveBeenCalledWith("/home?x=1");
  });

  it("ignores URLs without the query param", () => {
    const setTokenHash = vi.fn();
    const replaceUrl = vi.fn();

    expect(
      consumeLocalTokenHashQueryParam({
        href: "https://www.agentwitch.com/",
        setTokenHash,
        replaceUrl,
      }),
    ).toBe(false);

    expect(setTokenHash).not.toHaveBeenCalled();
    expect(replaceUrl).not.toHaveBeenCalled();
  });
});
