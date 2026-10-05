import { describe, expect, it } from "vitest";

import { readNextRedirectStatus } from "@/lib/shell/readNextRedirectStatus";
import { redirectForSession } from "@/lib/shell/redirectForSession";

describe("redirectForSession", () => {
  it("uses temporary 307 when there is no actorUserId", () => {
    try {
      redirectForSession("/login?callbackUrl=%2Flibrary%2Fcap-1", null);
      expect.unreachable("expected redirect");
    } catch (error) {
      expect(readNextRedirectStatus(error)).toBe(307);
    }
  });

  it("uses permanent 308 when actorUserId is present", () => {
    try {
      redirectForSession("/projects/p1#library", "u1");
      expect.unreachable("expected redirect");
    } catch (error) {
      expect(readNextRedirectStatus(error)).toBe(308);
    }
  });
});
