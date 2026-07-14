import { afterEach, describe, expect, it, vi } from "vitest";

import { createSharedPolledResource } from "@/lib/client/createSharedPolledResource";

describe("createSharedPolledResource", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deduplicates concurrent fetches for multiple subscribers", async () => {
    const fetch = vi.fn(async () => "payload");
    const resource = createSharedPolledResource({ fetch, intervalMs: 60_000 });
    const unsubscribeA = resource.subscribe(() => undefined);
    const unsubscribeB = resource.subscribe(() => undefined);

    await Promise.resolve();
    await Promise.resolve();

    expect(fetch).toHaveBeenCalledTimes(1);

    unsubscribeA();
    unsubscribeB();
  });
});
