import { describe, expect, it } from "vitest";

import {
  buildHumanInviteCreateBody,
  mapCreateHumanInviteError,
} from "@/features/projects/access/humanInvites/utils/buildHumanInviteCreateBody";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

describe("buildHumanInviteCreateBody", () => {
  it("requires email when lock is on", () => {
    const result = buildHumanInviteCreateBody({
      role: "member",
      email: "  ",
      requireEmailMatch: true,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errorMessage).toBe(HUMAN_INVITE_UI_COPY.emailRequiredForLock);
    }
  });

  it("sends requireEmailMatch true with email when locked", () => {
    const result = buildHumanInviteCreateBody({
      role: "viewer",
      email: " Ben@Example.com ",
      requireEmailMatch: true,
    });
    expect(result).toEqual({
      ok: true,
      body: {
        role: "viewer",
        email: "Ben@Example.com",
        requireEmailMatch: true,
      },
    });
  });

  it("allows empty email when lock is off", () => {
    const result = buildHumanInviteCreateBody({
      role: "member",
      email: "",
      requireEmailMatch: false,
    });
    expect(result).toEqual({
      ok: true,
      body: {
        role: "member",
        email: null,
        requireEmailMatch: false,
      },
    });
  });
});

describe("mapCreateHumanInviteError", () => {
  it("maps EMAIL_REQUIRED_FOR_LOCK", () => {
    expect(mapCreateHumanInviteError("EMAIL_REQUIRED_FOR_LOCK", undefined)).toBe(
      HUMAN_INVITE_UI_COPY.emailRequiredForLock,
    );
  });
});
