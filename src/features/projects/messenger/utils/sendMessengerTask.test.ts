import { afterEach, describe, expect, it, vi } from "vitest";

import { sendMessengerTask } from "@/features/projects/messenger/utils/sendMessengerTask";

describe("sendMessengerTask", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("blocks invalid drafts without calling dispatch", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const result = await sendMessengerTask({
      projectId: "proj-1",
      draft: { assigneeMembershipId: "", summary: "do it" },
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("assignee_required");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("POSTs inbox dispatch with summary and refs", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ ok: true, messageId: "msg-1", recipientCount: 1 }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const result = await sendMessengerTask({
      projectId: "proj-1",
      draft: {
        assigneeMembershipId: "mem-wake",
        summary: "Finish wake test",
        kind: "task.assign",
        refs: { prUrl: "https://example.com/pr/9" },
      },
    });
    expect(result).toEqual({ ok: true, messageId: "msg-1" });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/projects/proj-1/inbox/dispatch",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          toMembershipId: "mem-wake",
          summary: "Finish wake test",
          kind: "task.assign",
          refs: { prUrl: "https://example.com/pr/9" },
        }),
      }),
    );
  });
});
