import { describe, expect, it } from "vitest";

import { assertHumanInviteEmailLock } from "@/lib/projects/acl/humanInvites/assertHumanInviteEmailLock";

describe("assertHumanInviteEmailLock", () => {
  it("mode A always ok", () => {
    expect(
      assertHumanInviteEmailLock({
        requireEmailMatch: false,
        invitedEmail: "a@b.com",
        claimantEmail: "other@x.com",
        claimantEmailVerified: false,
      }),
    ).toEqual({ ok: true });
  });

  it("mode B match is case-insensitive via normalize", () => {
    expect(
      assertHumanInviteEmailLock({
        requireEmailMatch: true,
        invitedEmail: "ada@example.com",
        claimantEmail: "Ada@Example.COM",
        claimantEmailVerified: true,
      }),
    ).toEqual({ ok: true });
  });

  it("mode B match normalizes invite-side mixed case and whitespace", () => {
    expect(
      assertHumanInviteEmailLock({
        requireEmailMatch: true,
        invitedEmail: "Tom@Gmail.com ",
        claimantEmail: "tom@gmail.com",
        claimantEmailVerified: true,
      }),
    ).toEqual({ ok: true });
  });

  it("mode B mismatch returns mask", () => {
    expect(
      assertHumanInviteEmailLock({
        requireEmailMatch: true,
        invitedEmail: "thien@gmail.com",
        claimantEmail: "other@gmail.com",
        claimantEmailVerified: true,
      }),
    ).toEqual({
      ok: false,
      code: "invite_email_mismatch",
      invitedEmailMasked: "t***@g***.com",
    });
  });

  it("mode B missing claimant email is mismatch", () => {
    expect(
      assertHumanInviteEmailLock({
        requireEmailMatch: true,
        invitedEmail: "a@b.com",
        claimantEmail: "",
        claimantEmailVerified: true,
      }),
    ).toMatchObject({ ok: false, code: "invite_email_mismatch" });
  });

  it("mode B unverified email is blocked", () => {
    expect(
      assertHumanInviteEmailLock({
        requireEmailMatch: true,
        invitedEmail: "ada@example.com",
        claimantEmail: "ada@example.com",
        claimantEmailVerified: false,
      }),
    ).toMatchObject({ ok: false, code: "invite_email_unverified" });
  });
});
