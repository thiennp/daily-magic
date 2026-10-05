import { describe, expect, it } from "vitest";

import { decideProjectOwnerAccess } from "@/lib/projects/acl/decideProjectOwnerAccess";

describe("decideProjectOwnerAccess", () => {
  it("allows only the project owner", () => {
    expect(
      decideProjectOwnerAccess({ actorUserId: "o", projectOwnerUserId: "o" }),
    ).toEqual({ allow: true });
  });

  it("forbids anyone else and 404s a missing project", () => {
    expect(
      decideProjectOwnerAccess({ actorUserId: "m", projectOwnerUserId: "o" }),
    ).toEqual({ allow: false, reason: "forbidden" });
    expect(
      decideProjectOwnerAccess({ actorUserId: "o", projectOwnerUserId: null }),
    ).toEqual({ allow: false, reason: "not_found" });
  });
});
