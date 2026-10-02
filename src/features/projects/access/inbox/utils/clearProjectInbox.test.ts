import { afterEach, describe, expect, it, vi } from "vitest";

import { clearProjectInbox } from "@/features/projects/access/inbox/utils/clearProjectInbox";
import { formatInboxClearToast } from "@/features/projects/access/inbox/utils/formatInboxClearToast";

describe("clearProjectInbox", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts confirm:true and returns delete counts", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      expect(init?.method).toBe("POST");
      expect(JSON.parse(String(init?.body))).toEqual({ confirm: true });
      return new Response(
        JSON.stringify({
          ok: true,
          deletedMessages: 12,
          deletedDeliveries: 18,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    });
    vi.stubGlobal("fetch", fetchMock);
    const result = await clearProjectInbox({ projectId: "p1" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.deletedMessages).toBe(12);
      expect(result.deletedDeliveries).toBe(18);
    }
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/inbox/clear"),
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("soft-degrades on 404 until eng clear/log is live", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("missing", { status: 404 })),
    );
    const result = await clearProjectInbox({ projectId: "p1" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.unavailable).toBe(true);
    }
  });
});

describe("formatInboxClearToast", () => {
  it("reports cleared count and already-empty", () => {
    expect(
      formatInboxClearToast({ deletedMessages: 3, deletedDeliveries: 4 }),
    ).toBe("Cleared 3 messages");
    expect(
      formatInboxClearToast({ deletedMessages: 0, deletedDeliveries: 0 }),
    ).toBe("Inbox already empty");
  });
});
