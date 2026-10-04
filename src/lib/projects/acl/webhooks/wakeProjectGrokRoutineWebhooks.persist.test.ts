import { afterEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { wakeProjectGrokRoutineWebhooks } from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks";

const fetchMock = vi.fn();

const storedAttempts = (): unknown[] =>
  sqlMock.mock.calls
    .filter((call) =>
      String(call[0]).includes(
        "INSERT INTO project_grok_routine_wake_attempts",
      ),
    )
    .flatMap((call) => call.slice(1));

describe("wakeProjectGrokRoutineWebhooks persisted result", () => {
  afterEach(() => {
    sqlMock.mockReset();
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it("stores http_200 for the message and not the webhook", async () => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockResolvedValue({ ok: true, status: 200 });
    sqlMock.mockResolvedValue([
      {
        membership_id: "mem-a",
        webhook_url: "https://example.com/wake",
        bearer_retained: "sekret-bearer",
      },
    ]);
    await wakeProjectGrokRoutineWebhooks({
      projectId: "proj-1",
      messageId: "msg-1",
      summary: "hello",
      fromMembershipId: "mem-s",
      fromProjectDisplayName: "Probe",
      recipientMembershipIds: ["mem-a"],
    });
    const stored = storedAttempts();
    expect(stored).toEqual(
      expect.arrayContaining(["msg-1", "mem-a", "http_200"]),
    );
    expect(stored).not.toContain("https://example.com/wake");
    expect(stored).not.toContain("sekret-bearer");
  });

  it("stores not_postable for an empty bearer and a missing row", async () => {
    vi.stubGlobal("fetch", fetchMock);
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const query = String(strings);
      if (query.includes("FROM project_membership_grok_routine_webhooks")) {
        return [
          {
            membership_id: "mem-a",
            webhook_url: "https://example.com/wake",
            bearer_retained: "",
          },
        ];
      }
      return [];
    });
    await wakeProjectGrokRoutineWebhooks({
      projectId: "proj-1",
      messageId: "msg-1",
      summary: "hello",
      fromMembershipId: "mem-s",
      fromProjectDisplayName: "Probe",
      recipientMembershipIds: ["mem-a", "mem-b"],
    });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(
      storedAttempts().filter((value) => value === "not_postable"),
    ).toEqual(["not_postable", "not_postable"]);
  });

  it("stores fetch_failed and does not retry", async () => {
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
    ).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(storedAttempts()).toEqual(
      expect.arrayContaining(["msg-1", "mem-a", "fetch_failed"]),
    );
  });
});
