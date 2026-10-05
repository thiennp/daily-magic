import { afterEach, describe, expect, it, vi } from "vitest";

import { markMessengerThreadRead } from "@/features/projects/messenger/utils/markMessengerThreadRead";

describe("markMessengerThreadRead", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("POSTs /messenger/threads/:key/read and treats ok payload as success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const result = await markMessengerThreadRead({
      projectId: "proj-1",
      threadKey: "mem-wake",
    });
    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/projects/proj-1/messenger/threads/mem-wake/read",
      { method: "POST", cache: "no-store" },
    );
  });
});
