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
    const results = await wakeProjectGrokRoutineWebhooks({
      projectId: "proj-1",
      messageId: "msg-1",
      summary: "hello",
      fromMembershipId: "mem-s",
      fromProjectDisplayName: "Probe",
      recipientMembershipIds: ["mem-a", "mem-b"],
    });
    expect(results).toEqual([
      { membershipId: "mem-a", result: "http_200" },
      { membershipId: "mem-b", result: "not_postable" },
    ]);
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
      summary: "hello",
      fromMembershipId: "mem-s",
      fromProjectDisplayName: "Probe",
    });
    expect(String(init.body)).not.toContain("sekret-bearer");
    expect(
      queries().some((q) => q.includes("UPDATE project_message_deliveries")),
    ).toBe(false);
  });

  it("does not POST when the recipient has no registration", async () => {
    vi.stubGlobal("fetch", fetchMock);
    sqlMock.mockResolvedValue([]);
    const results = await wakeProjectGrokRoutineWebhooks({
      projectId: "proj-1",
      messageId: "msg-1",
      summary: "hello",
      fromMembershipId: "mem-s",
      fromProjectDisplayName: "Probe",
      recipientMembershipIds: ["mem-a"],
    });
    expect(results).toEqual([{ membershipId: "mem-a", result: "not_postable" }]);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(
      queries().some((q) => q.includes("'pending'") || q.includes("UPDATE")),
    ).toBe(false);
  });

  it("returns no results when there are no recipients", async () => {
    const results = await wakeProjectGrokRoutineWebhooks({
      projectId: "proj-1",
      messageId: "msg-1",
      summary: "hello",
      fromMembershipId: "mem-s",
      fromProjectDisplayName: "Probe",
      recipientMembershipIds: [],
    });
    expect(results).toEqual([]);
    expect(sqlMock).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
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
        summary: "hello",
        fromMembershipId: "mem-s",
        fromProjectDisplayName: "Probe",
        recipientMembershipIds: ["mem-a"],
      }),
    ).resolves.toEqual([{ membershipId: "mem-a", result: "fetch_failed" }]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
