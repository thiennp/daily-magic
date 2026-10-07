import { describe, expect, it } from "vitest";

import {
  mapProjectConnectionRowToListItem,
  overlayExpiredStatus,
} from "@/lib/projects/connections/mapProjectConnectionRow";

describe("overlayExpiredStatus", () => {
  const now = Date.parse("2026-10-07T10:00:00.000Z");

  it("keeps connected when no expiry", () => {
    expect(overlayExpiredStatus("connected", null, now)).toBe("connected");
  });

  it("keeps connected when expiry is in the future", () => {
    expect(
      overlayExpiredStatus("connected", new Date(now + 60_000), now),
    ).toBe("connected");
  });

  it("surfaces expired when token_expires_at is past", () => {
    expect(
      overlayExpiredStatus("connected", new Date(now - 1), now),
    ).toBe("expired");
  });

  it("does not override non-connected statuses", () => {
    expect(overlayExpiredStatus("error", new Date(now - 1), now)).toBe("error");
    expect(overlayExpiredStatus("revoked", new Date(now - 1), now)).toBe(
      "revoked",
    );
  });
});

describe("mapProjectConnectionRowToListItem", () => {
  const now = Date.parse("2026-10-07T10:00:00.000Z");

  it("never projects token columns and overlays expiry", () => {
    const item = mapProjectConnectionRowToListItem(
      {
        provider: "gmail",
        status: "connected",
        account_label: "a@example.com",
        connected_at: new Date("2026-10-01T12:00:00.000Z"),
        token_expires_at: new Date(now - 5_000),
        access_token_ciphertext: "should-not-leak",
      },
      now,
    );
    expect(item).toEqual({
      provider: "gmail",
      status: "expired",
      accountLabel: "a@example.com",
      connectedAt: "2026-10-01T12:00:00.000Z",
    });
    expect(JSON.stringify(item)).not.toContain("should-not-leak");
  });
});
