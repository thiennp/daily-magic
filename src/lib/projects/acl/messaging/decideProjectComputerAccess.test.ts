import { describe, expect, it } from "vitest";

import { decideProjectComputerAccess } from "@/lib/projects/acl/messaging/decideProjectComputerAccess";

const base = {
  deviceId: "dev-1",
  deviceUserId: "owner",
  projectOwnerUserId: "owner",
  projectDeviceId: "dev-1",
};

describe("decideProjectComputerAccess", () => {
  it("allows the owner's project computer", () => {
    expect(decideProjectComputerAccess(base)).toEqual({ allow: true });
  });

  it("rejects another user's device as not_found", () => {
    expect(
      decideProjectComputerAccess({ ...base, deviceUserId: "someone" }),
    ).toEqual({ allow: false, reason: "not_found" });
    expect(
      decideProjectComputerAccess({ ...base, projectOwnerUserId: null }),
    ).toEqual({ allow: false, reason: "not_found" });
  });

  it("rejects the owner's other Mac", () => {
    expect(decideProjectComputerAccess({ ...base, deviceId: "dev-2" })).toEqual(
      { allow: false, reason: "forbidden" },
    );
  });

  it("rejects when the project has no linked computer yet", () => {
    expect(
      decideProjectComputerAccess({ ...base, projectDeviceId: null }),
    ).toEqual({ allow: false, reason: "no_project_computer" });
  });
});
