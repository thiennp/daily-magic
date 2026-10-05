import { describe, expect, it } from "vitest";

import { decideProjectMessengerSender } from "@/lib/projects/acl/messaging/messenger/decideProjectMessengerSender";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

const seat = (
  overrides: Partial<ProjectMembershipRecord>,
): ProjectMembershipRecord => ({
  id: "mem-alex",
  projectId: "proj-trip",
  userId: "user-alex",
  role: "member",
  status: "active",
  memberKind: "human",
  teamLabel: null,
  scopes: [],
  projectDisplayName: "Alex",
  createdAt: "2026-10-01T00:00:00.000Z",
  revokedAt: null,
  ...overrides,
});

describe("decideProjectMessengerSender", () => {
  it("owner sends with no membership (same as owner dispatch)", () => {
    expect(decideProjectMessengerSender({ isOwner: true, seat: null })).toEqual(
      {
        ok: true,
        sender: {
          kind: "owner",
          senderMembershipId: null,
          displayName: "Owner",
        },
      },
    );
  });

  it("human member sends as their seat", () => {
    expect(
      decideProjectMessengerSender({ isOwner: false, seat: seat({}) }),
    ).toEqual({
      ok: true,
      sender: {
        kind: "member",
        senderMembershipId: "mem-alex",
        displayName: "Alex",
      },
    });
  });

  it("viewer is read-only", () => {
    expect(
      decideProjectMessengerSender({
        isOwner: false,
        seat: seat({ role: "viewer" }),
      }),
    ).toEqual({ ok: false, code: "viewer_read_only" });
  });

  it("bots and strangers cannot use the composer; unnamed member must name first", () => {
    expect(
      decideProjectMessengerSender({
        isOwner: false,
        seat: seat({ memberKind: "bot" }),
      }),
    ).toEqual({ ok: false, code: "forbidden" });
    expect(
      decideProjectMessengerSender({ isOwner: false, seat: null }),
    ).toEqual({
      ok: false,
      code: "forbidden",
    });
    expect(
      decideProjectMessengerSender({
        isOwner: false,
        seat: seat({ projectDisplayName: null }),
      }),
    ).toEqual({ ok: false, code: "naming_required" });
  });
});
