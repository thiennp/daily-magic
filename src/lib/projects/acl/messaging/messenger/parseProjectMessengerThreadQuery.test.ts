import { describe, expect, it } from "vitest";

import { encodeProjectMessengerCursor } from "@/lib/projects/acl/messaging/messenger/projectMessengerCursor";
import { parseProjectMessengerThreadQuery } from "@/lib/projects/acl/messaging/messenger/parseProjectMessengerThreadQuery";

describe("parseProjectMessengerThreadQuery", () => {
  it("defaults limit and accepts before", () => {
    const before = encodeProjectMessengerCursor({
      t: "2026-10-07T08:00:00.000Z",
      id: "msg-1",
    });
    const result = parseProjectMessengerThreadQuery(
      new URLSearchParams(`before=${before}`),
    );
    expect(result).toMatchObject({
      ok: true,
      query: {
        limit: 50,
        before: { t: "2026-10-07T08:00:00.000Z", id: "msg-1" },
      },
    });
  });

  it("rejects bad before and limit", () => {
    expect(
      parseProjectMessengerThreadQuery(new URLSearchParams("before=%%")),
    ).toEqual({ ok: false, code: "invalid_before" });
    expect(
      parseProjectMessengerThreadQuery(new URLSearchParams("limit=0")),
    ).toEqual({ ok: false, code: "invalid_limit" });
    expect(
      parseProjectMessengerThreadQuery(new URLSearchParams("limit=101")),
    ).toEqual({ ok: false, code: "invalid_limit" });
  });
});
