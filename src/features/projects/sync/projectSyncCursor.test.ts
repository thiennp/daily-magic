import { describe, expect, it } from "vitest";

import {
  decodeProjectSyncCursor,
  encodeProjectSyncCursor,
} from "@/features/projects/sync/projectSyncCursor";

const CURSOR = { t: "2026-10-09T10:00:00.000Z", id: "msg-ünï-✓/+?" };

describe("project sync cursor", () => {
  it("round-trips, including non-ASCII ids", () => {
    expect(decodeProjectSyncCursor(encodeProjectSyncCursor(CURSOR))).toEqual(
      CURSOR,
    );
  });

  it("is byte-identical to Node's base64url and URL-safe", () => {
    const encoded = encodeProjectSyncCursor(CURSOR);
    expect(encoded).toBe(
      Buffer.from(JSON.stringify(CURSOR), "utf8").toString("base64url"),
    );
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it("reads cursors that older code produced with Buffer", () => {
    const old = Buffer.from(JSON.stringify(CURSOR), "utf8").toString(
      "base64url",
    );
    expect(decodeProjectSyncCursor(old)).toEqual(CURSOR);
  });

  it("returns null when blank and invalid when malformed", () => {
    expect(decodeProjectSyncCursor("  ")).toBeNull();
    expect(decodeProjectSyncCursor(null)).toBeNull();
    expect(decodeProjectSyncCursor("not base64!!")).toBe("invalid");
    expect(decodeProjectSyncCursor(encodeBad("[1]"))).toBe("invalid");
    expect(decodeProjectSyncCursor(encodeBad('{"t":1,"id":"x"}'))).toBe(
      "invalid",
    );
  });
});

const encodeBad = (json: string): string =>
  Buffer.from(json, "utf8").toString("base64url");
