import { describe, expect, it } from "vitest";

import {
  extractProjectInviteTokenFromUrl,
  normalizeProjectInviteTokenArg,
} from "@/lib/projects/acl/invites/extractProjectInviteTokenFromUrl";

describe("extractProjectInviteTokenFromUrl", () => {
  it("extracts opaque token from path", () => {
    expect(
      extractProjectInviteTokenFromUrl(
        "https://www.agentwitch.com/invite/p/abcTOKEN123",
      ),
    ).toBe("abcTOKEN123");
  });

  it("strips query/hash", () => {
    expect(
      extractProjectInviteTokenFromUrl(
        "https://www.agentwitch.com/invite/p/tok-xyz?utm=1#x",
      ),
    ).toBe("tok-xyz");
  });

  it("normalize accepts raw token or full URL", () => {
    expect(normalizeProjectInviteTokenArg("  plainTok  ")).toBe("plainTok");
    expect(
      normalizeProjectInviteTokenArg(
        "https://www.agentwitch.com/invite/p/from-url",
      ),
    ).toBe("from-url");
  });
});
