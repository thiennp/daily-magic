import { afterEach, describe, expect, it, vi } from "vitest";

import { clearProjectInbox } from "@/features/projects/access/inbox/utils/clearProjectInbox";
import { formatInboxClearToast } from "@/features/projects/access/inbox/utils/formatInboxClearToast";

describe("clearProjectInbox", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts confirm:true and returns archived count + Undo batch", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      expect(init?.method).toBe("POST");
      expect(JSON.parse(String(init?.body))).toEqual({ confirm: true });
      return new Response(
        JSON.stringify({
          ok: true,
          archivedMessages: 12,
          archiveBatch: "2026-10-06 11:48:12.123456+00",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    });
    vi.stubGlobal("fetch", fetchMock);
    const result = await clearProjectInbox({ projectId: "p1" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.archivedMessages).toBe(12);
      expect(result.archiveBatch).toBe("2026-10-06 11:48:12.123456+00");
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
  it("reports LOCK toast / toastOne and already-empty", () => {
    expect(formatInboxClearToast({ archivedMessages: 3 })).toBe(
      "Cleared 3 messages. They're in Archived.",
    );
    expect(formatInboxClearToast({ archivedMessages: 1 })).toBe(
      "Cleared 1 message. It's in Archived.",
    );
    expect(formatInboxClearToast({ archivedMessages: 0 })).toBe(
      "Inbox already empty",
    );
  });
});
