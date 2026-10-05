import { describe, expect, it } from "vitest";

import { isProjectComputerMemberAssignable } from "@/lib/projects/acl/isProjectComputerMemberAssignable";

describe("isProjectComputerMemberAssignable", () => {
  const base = {
    status: "active" as const,
    isOnline: true,
    installBundleVersion: "10",
    connectMinBundleVersion: "1",
    taskMinBundleVersion: "5",
  };

  it("is assignable when active, online, and at/above mins", () => {
    expect(isProjectComputerMemberAssignable(base)).toEqual({
      connectVersionStatus: "ok",
      assignable: true,
    });
  });

  it("rejects offline", () => {
    expect(
      isProjectComputerMemberAssignable({ ...base, isOnline: false }),
    ).toEqual({ connectVersionStatus: "ok", assignable: false });
  });

  it("rejects too_old vs connect min", () => {
    expect(
      isProjectComputerMemberAssignable({
        ...base,
        installBundleVersion: "0",
        connectMinBundleVersion: "1",
        taskMinBundleVersion: "1",
      }),
    ).toEqual({ connectVersionStatus: "too_old", assignable: false });
  });

  it("rejects below MIN_TASK even when connect ok", () => {
    expect(
      isProjectComputerMemberAssignable({
        ...base,
        installBundleVersion: "3",
        connectMinBundleVersion: "1",
        taskMinBundleVersion: "5",
      }),
    ).toEqual({ connectVersionStatus: "ok", assignable: false });
  });

  it("rejects null/empty bundle as too_old", () => {
    expect(
      isProjectComputerMemberAssignable({
        ...base,
        installBundleVersion: null,
      }),
    ).toEqual({ connectVersionStatus: "too_old", assignable: false });
  });

  it("rejects non-active status", () => {
    expect(
      isProjectComputerMemberAssignable({ ...base, status: "revoked" }),
    ).toEqual({ connectVersionStatus: "ok", assignable: false });
  });
});
