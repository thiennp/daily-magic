import { afterEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";

const fetchMock = vi.fn();

const grokRow = {
  membership_id: "mem-a",
  webhook_url: "https://example.com/wake",
  bearer_retained: "sekret-bearer",
};

const queries = (): string[] =>
  sqlMock.mock.calls.map((call) => String(call[0]));

const boundValues = (): unknown[] =>
  sqlMock.mock.calls.flatMap((call) => call.slice(1));

const drain = async (): Promise<void> => {
  await [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].reduce(async (previous) => {
    await previous;
    await Promise.resolve();
  }, Promise.resolve());
};

describe("insertProjectMessageWithDeliveries grok wake without hmac", () => {
  afterEach(() => {
    sqlMock.mockReset();
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  const store = () =>
    insertProjectMessageWithDeliveries({
      projectId: "proj-1",
      senderMembershipId: "mem-s",
      senderUserId: "user-s",
      toMembershipId: "mem-a",
      toUserId: "user-a",
      toTeamLabel: null,
      toProjectDisplayName: null,
      kind: "task.ping",
      summary: "hello",
      refsJson: "{}",
      recipients: [{ id: "mem-a", user_id: "user-a" }],
    });

  it("wakes grok and does not record no_webhook when hmac url is missing", async () => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockResolvedValue({ ok: true, status: 200 });
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const query = String(strings);
      if (query.includes("FROM project_membership_grok_routine_webhooks")) {
        return [grokRow];
      }
      return [];
    });
    const stored = await store();
    const messageId = stored.messageId;
    expect(stored.wakeResults).toEqual([
      { membershipId: "mem-a", result: "http_200" },
    ]);
    const attemptValues = sqlMock.mock.calls
      .filter((call) =>
        String(call[0]).includes(
          "INSERT INTO project_grok_routine_wake_attempts",
        ),
      )
      .flatMap((call) => call.slice(1));
    expect(attemptValues).toEqual(
      expect.arrayContaining([messageId, "mem-a", "http_200"]),
    );
    expect(attemptValues).not.toContain("https://example.com/wake");
    expect(attemptValues).not.toContain("sekret-bearer");
    await drain();
    expect(messageId.length).toBeGreaterThan(0);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://example.com/wake");
    expect((init.headers as Record<string, string>).Authorization).toBe(
      "Bearer sekret-bearer",
    );
    expect(
      queries().some((query) =>
        query.includes("UPDATE project_message_deliveries"),
      ),
    ).toBe(false);
    expect(boundValues()).not.toContain("no_webhook");
  });

  it("still records no_webhook when the recipient has neither webhook", async () => {
    vi.stubGlobal("fetch", fetchMock);
    sqlMock.mockResolvedValue([]);
    const stored = await store();
    expect(stored.wakeResults).toEqual([
      { membershipId: "mem-a", result: "not_postable" },
    ]);
    await drain();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(boundValues()).toContain("not_postable");
    expect(boundValues()).toContain("no_webhook");
    expect(boundValues()).toContain("skipped");
  });
});
