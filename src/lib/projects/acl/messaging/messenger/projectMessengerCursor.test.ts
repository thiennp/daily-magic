import { describe, expect, it } from "vitest";

import {
  decodeProjectHistoryTimelineCursor,
  encodeProjectHistoryTimelineCursor,
} from "@agent-witch/live-project-history";
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

  it("shares codec with History public-api (no format drift)", () => {
    const cursor = {
      t: "2026-10-07T08:00:00.123456Z",
      id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    };
    const fromDispatch = encodeProjectMessengerCursor(cursor);
    const fromHistory = encodeProjectHistoryTimelineCursor(cursor);
    expect(fromDispatch).toBe(fromHistory);
    expect(decodeProjectMessengerCursor(fromHistory)).toEqual(cursor);
    expect(decodeProjectHistoryTimelineCursor(fromDispatch)).toEqual(cursor);
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
