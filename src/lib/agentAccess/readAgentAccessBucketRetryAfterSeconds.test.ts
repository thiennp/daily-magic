import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

import { readAgentAccessBucketRetryAfterSeconds } from "@/lib/agentAccess/readAgentAccessBucketRetryAfterSeconds";

const NOW = Date.parse("2026-10-07T20:00:00.000Z");
const read = () =>
  readAgentAccessBucketRetryAfterSeconds({
    subjectHash: "hash",
    bucket: "tool",
    nowMs: NOW,
  });

describe("readAgentAccessBucketRetryAfterSeconds", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("returns seconds until the oldest attempt leaves the 1h window", async () => {
    sqlMock.mockResolvedValue([{ oldest_at: "2026-10-07T19:10:00.000Z" }]);
    expect(await read()).toBe(600);
  });

  it("accepts Date values and clamps to at least 1s", async () => {
    sqlMock.mockResolvedValue([{ oldest_at: new Date(NOW - 3_600_000) }]);
    expect(await read()).toBe(1);
  });

  it("falls back to 60s when the bucket is empty or the query fails", async () => {
    sqlMock.mockResolvedValue([{ oldest_at: null }]);
    expect(await read()).toBe(60);
    sqlMock.mockRejectedValue(new Error("db down"));
    expect(await read()).toBe(60);
  });
});
