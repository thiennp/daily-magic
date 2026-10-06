import { describe, expect, it } from "vitest";

import { DEVICE_VERIFY_COPY } from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";
import { DEVICE_VERIFY_STATE_COPY } from "@/features/agent-access/device-verify/deviceVerifyStateCopy.constant";
import { resolveDeviceVerifyView } from "@/features/agent-access/device-verify/resolveDeviceVerifyView";

const ME = "user-me";
const base = {
  done: "",
  errorCode: "",
  rawCode: "BCDF-GHJK",
  row: null,
  viewerUserId: ME,
  rateLimited: false,
} as const;
const row = (status: string, ownerUserId: string | null = null) => ({
  status,
  ownerUserId,
});

describe("resolveDeviceVerifyView (S4 verify states)", () => {
  it("entering a code: empty input shows nothing; a pending code can be decided", () => {
    expect(resolveDeviceVerifyView({ ...base, rawCode: "" })).toEqual({
      message: null,
      tone: "info",
      canDecide: false,
      showNextStep: false,
    });
    const pending = resolveDeviceVerifyView({ ...base, row: row("pending") });
    expect(pending.canDecide).toBe(true);
    expect(pending.message).toBeNull();
  });

  it("invalid: unknown or malformed code → not found", () => {
    expect(resolveDeviceVerifyView(base).message).toBe(
      DEVICE_VERIFY_COPY.notFound,
    );
    const bad = resolveDeviceVerifyView({ ...base, rawCode: "XY" });
    expect(bad).toMatchObject({
      message: DEVICE_VERIFY_COPY.notFound,
      tone: "error",
    });
  });

  it("expired code → expired, no decide", () => {
    const v = resolveDeviceVerifyView({ ...base, row: row("expired") });
    expect(v).toMatchObject({
      message: DEVICE_VERIFY_COPY.expired,
      canDecide: false,
    });
  });

  it("success after confirm says owner and points at the project owner's Approve", () => {
    const v = resolveDeviceVerifyView({
      ...base,
      done: "confirmed",
      row: row("approved", ME),
    });
    expect(v).toEqual({
      message: DEVICE_VERIFY_COPY.confirmed,
      tone: "success",
      canDecide: false,
      showNextStep: true,
    });
    expect(DEVICE_VERIFY_COPY.confirmed).toContain(
      "You're this assistant's owner",
    );
  });

  it("already confirmed by me (revisit, or consumed) → already owner + next step", () => {
    for (const status of ["approved", "consumed"]) {
      const v = resolveDeviceVerifyView({ ...base, row: row(status, ME) });
      expect(v.message).toBe(DEVICE_VERIFY_STATE_COPY.alreadyOwner);
      expect(v.showNextStep).toBe(true);
    }
  });
});
