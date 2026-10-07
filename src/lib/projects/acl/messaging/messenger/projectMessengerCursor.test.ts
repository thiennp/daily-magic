import { describe, expect, it } from "vitest";

import {
  decodeProjectMessengerCursor,
  encodeProjectMessengerCursor,
} from "@/lib/projects/acl/messaging/messenger/projectMessengerCursor";

describe("projectMessengerCursor", () => {
  it("round-trips { t, id }", () => {
    const cursor = {
      t: "2026-10-07T08:00:00.123456Z",
      id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    };
    const encoded = encodeProjectMessengerCursor(cursor);
    expect(decodeProjectMessengerCursor(encoded)).toEqual(cursor);
  });

  it("returns null for empty and invalid for garbage", () => {
    expect(decodeProjectMessengerCursor(undefined)).toBeNull();
    expect(decodeProjectMessengerCursor("")).toBeNull();
    expect(decodeProjectMessengerCursor("not-base64-json")).toBe("invalid");
    expect(
      decodeProjectMessengerCursor(
        Buffer.from(JSON.stringify({ t: "nope", id: "x" }), "utf8").toString(
          "base64url",
        ),
      ),
    ).toBe("invalid");
  });
});
