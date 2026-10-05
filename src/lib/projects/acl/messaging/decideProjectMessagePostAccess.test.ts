import { describe, expect, it } from "vitest";

import {
  decideProjectMessagePostAccess,
  isProjectMessageReadOnlyRole,
  type ProjectMessagePostSeat,
} from "@/lib/projects/acl/messaging/decideProjectMessagePostAccess";

const botMember: ProjectMessagePostSeat = {
  role: "member",
  memberKind: "bot",
  scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
  projectDisplayName: "Sender Bot",
};

const humanMember: ProjectMessagePostSeat = {
  role: "member",
  memberKind: "human",
  scopes: [],
  projectDisplayName: "Alex",
};

const humanViewer: ProjectMessagePostSeat = {
  role: "viewer",
  memberKind: "human",
  scopes: [],
  projectDisplayName: null,
};

describe("decideProjectMessagePostAccess", () => {
  it("bot member with msg:dispatch posts (unchanged)", () => {
    expect(decideProjectMessagePostAccess(botMember)).toEqual({
      ok: true,
      projectDisplayName: "Sender Bot",
    });
  });

  it("legacy seat without memberKind is treated as a bot", () => {
    const { memberKind: _omit, ...legacy } = botMember;
    expect(decideProjectMessagePostAccess(legacy)).toMatchObject({ ok: true });
    expect(
      decideProjectMessagePostAccess({ ...legacy, scopes: ["acl:self"] }),
    ).toEqual({ ok: false, code: "missing_scope" });
  });

  it("bot without msg:dispatch keeps missing_scope", () => {
    expect(
      decideProjectMessagePostAccess({ ...botMember, scopes: ["acl:self"] }),
    ).toEqual({ ok: false, code: "missing_scope" });
  });

  it("unnamed bot keeps naming_required before missing_scope", () => {
    expect(
      decideProjectMessagePostAccess({
        ...botMember,
        scopes: [],
        projectDisplayName: null,
      }),
    ).toEqual({ ok: false, code: "naming_required" });
  });

  it("human member posts without scopes (role grants posting)", () => {
    expect(decideProjectMessagePostAccess(humanMember)).toEqual({
      ok: true,
      projectDisplayName: "Alex",
    });
  });

  it("unnamed human member gets naming_required", () => {
    expect(
      decideProjectMessagePostAccess({ ...humanMember, projectDisplayName: null }),
    ).toEqual({ ok: false, code: "naming_required" });
  });

  it("viewer is read-only even when named or scoped", () => {
    expect(decideProjectMessagePostAccess(humanViewer)).toEqual({
      ok: false,
      code: "viewer_read_only",
    });
    expect(
      decideProjectMessagePostAccess({
        ...humanViewer,
        projectDisplayName: "Watcher",
        scopes: ["msg:dispatch"],
      }),
    ).toEqual({ ok: false, code: "viewer_read_only" });
  });

  it("only role viewer is read-only", () => {
    expect(isProjectMessageReadOnlyRole("viewer")).toBe(true);
    expect(isProjectMessageReadOnlyRole("member")).toBe(false);
    expect(isProjectMessageReadOnlyRole("owner")).toBe(false);
    expect(isProjectMessageReadOnlyRole(undefined)).toBe(false);
  });
});
