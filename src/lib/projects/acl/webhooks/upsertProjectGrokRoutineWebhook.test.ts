import { describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: vi.fn(async () => ({
    id: "mem-1",
    projectDisplayName: "Bot",
  })),
}));

vi.mock("@/lib/projects/acl/webhooks/assertSafeProjectWebhookUrl", () => ({
  assertSafeProjectWebhookUrl: vi.fn(async (raw: unknown) => ({
    ok: true,
    url: new URL(String(raw)),
  })),
}));

import { upsertProjectGrokRoutineWebhook } from "@/lib/projects/acl/webhooks/upsertProjectGrokRoutineWebhook";

describe("upsertProjectGrokRoutineWebhook", () => {
  it("stores the bearer and does not return it", async () => {
    sqlMock.mockResolvedValue([{ webhook_url: "https://example.com/wake" }]);
    const result = await upsertProjectGrokRoutineWebhook({
      projectId: "proj-1",
      actorUserId: "user-1",
      grokWebhookUrl: "https://example.com/wake",
      grokWebhookBearer: "stored-bearer",
    });
    expect(result).toEqual({
      ok: true,
      grokWebhookUrl: "https://example.com/wake",
    });
    expect(JSON.stringify(result)).not.toContain("stored-bearer");
    const values = sqlMock.mock.calls.flatMap((call) => call.slice(1));
    expect(values).toContain("stored-bearer");
    expect(String(sqlMock.mock.calls[0]?.[0])).toContain(
      "RETURNING webhook_url",
    );
    expect(String(sqlMock.mock.calls[0]?.[0])).not.toContain(
      "RETURNING bearer",
    );
  });
});
