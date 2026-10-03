import { afterEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { wakeProjectGrokRoutineWebhooks } from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks";

const fetchMock = vi.fn();

describe("wakeProjectGrokRoutineWebhooks", () => {
  afterEach(() => {
    sqlMock.mockReset();
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  const queries = (): string[] =>
    sqlMock.mock.calls.map((call) => String(call[0]));

  it("POSTs once with the bearer and does not change pending delivery", async () => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockResolvedValue({ ok: true, status: 200 });
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM project_membership_grok_routine_webhooks")) {
        return [
          {
            membership_id: "mem-a",
            webhook_url: "https://example.com/wake",
            bearer_retained: "sekret-bearer",
          },
        ];
      }
      return [];
    });
    await wakeProjectGrokRoutineWebhooks({
      projectId: "proj-1",
      messageId: "msg-1",
      recipientMembershipIds: ["mem-a", "mem-b"],
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://example.com/wake");
    expect(init.method).toBe("POST");
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer sekret-bearer");
    expect(JSON.parse(String(init.body))).toEqual({
      projectId: "proj-1",
      messageId: "msg-1",
      event: "project_message.stored",
    });
    expect(String(init.body)).not.toContain("sekret-bearer");
    expect(
      queries().some((q) => q.includes("UPDATE project_message_deliveries")),
    ).toBe(false);
  });

  it("does not POST when the recipient has no registration", async () => {
    vi.stubGlobal("fetch", fetchMock);
    sqlMock.mockResolvedValue([]);
    await wakeProjectGrokRoutineWebhooks({
      projectId: "proj-1",
      messageId: "msg-1",
      recipientMembershipIds: ["mem-a"],
    });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(
      queries().some((q) => q.includes("'pending'") || q.includes("UPDATE")),
    ).toBe(false);
  });

  it("does not throw or retry when the POST fails", async () => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockRejectedValue(new Error("network"));
    sqlMock.mockResolvedValue([
      {
        membership_id: "mem-a",
        webhook_url: "https://example.com/wake",
        bearer_retained: "sekret-bearer",
      },
    ]);
    await expect(
      wakeProjectGrokRoutineWebhooks({
        projectId: "proj-1",
        messageId: "msg-1",
        recipientMembershipIds: ["mem-a"],
      }),
    ).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
