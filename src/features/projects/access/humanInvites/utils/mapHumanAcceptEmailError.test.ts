import { describe, expect, it } from "vitest";

import {
  isHumanAcceptEmailLockError,
  mapHumanAcceptEmailErrorView,
} from "@/features/projects/access/humanInvites/utils/mapHumanAcceptEmailError";

describe("mapHumanAcceptEmailError", () => {
  it("maps mismatch and unverified", () => {
    expect(mapHumanAcceptEmailErrorView("INVITE_EMAIL_MISMATCH")).toBe(
      "email_mismatch",
    );
    expect(mapHumanAcceptEmailErrorView("INVITE_EMAIL_UNVERIFIED")).toBe(
      "email_unverified",
    );
    expect(mapHumanAcceptEmailErrorView("expired")).toBeNull();
  });

  it("detects email lock errors", () => {
    expect(isHumanAcceptEmailLockError("INVITE_EMAIL_MISMATCH")).toBe(true);
    expect(isHumanAcceptEmailLockError("invalid_token")).toBe(false);
  });
});
