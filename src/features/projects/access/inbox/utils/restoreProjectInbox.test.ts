import { afterEach, describe, expect, it, vi } from "vitest";

import { restoreProjectInbox } from "@/features/projects/access/inbox/utils/restoreProjectInbox";
import { formatInboxRestoreToast } from "@/features/projects/access/inbox/utils/formatInboxRestoreToast";

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

describe("restoreProjectInbox", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts the target (Undo batch) and returns restored count", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      expect(init?.method).toBe("POST");
      expect(JSON.parse(String(init?.body))).toEqual({ archiveBatch: "b1" });
      return json({ ok: true, restoredMessages: 4 });
    });
    vi.stubGlobal("fetch", fetchMock);
    const result = await restoreProjectInbox({
      projectId: "p1",
      target: { archiveBatch: "b1" },
    });
    expect(result).toEqual({ ok: true, restoredMessages: 4 });
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/inbox/restore"),
      expect.anything(),
    );
  });

  it("non-owner 403 → owner-only reason", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => json({ ok: false, errorMessage: "forbidden" }, 403)),
    );
    const result = await restoreProjectInbox({
      projectId: "p1",
      target: { all: true },
    });
    expect(result).toEqual({
      ok: false,
      errorMessage: "Only the project owner can restore messages.",
    });
  });
});

describe("formatInboxRestoreToast", () => {
  it("uses LOCK one / many strings", () => {
    expect(formatInboxRestoreToast(1)).toBe("Restored 1 message.");
    expect(formatInboxRestoreToast(5)).toBe("Restored 5 messages.");
  });
});
