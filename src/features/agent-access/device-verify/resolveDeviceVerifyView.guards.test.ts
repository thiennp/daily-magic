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

describe("resolveDeviceVerifyView (S4 guards + copy)", () => {
  it("?done= is never trusted on its own", () => {
    const forged = resolveDeviceVerifyView({
      ...base,
      done: "confirmed",
      row: row("pending"),
    });
    expect(forged).toMatchObject({ message: null, canDecide: true });
    const other = resolveDeviceVerifyView({
      ...base,
      done: "confirmed",
      row: row("approved", "someone"),
    });
    expect(other).toMatchObject({
      message: DEVICE_VERIFY_COPY.alreadyDecided,
      showNextStep: false,
    });
    expect(resolveDeviceVerifyView({ ...base, done: "denied" }).message).toBe(
      DEVICE_VERIFY_COPY.notFound,
    );
  });

  it("denied by me → denied; denied by someone else → already used", () => {
    expect(
      resolveDeviceVerifyView({ ...base, row: row("denied", ME) }).message,
    ).toBe(DEVICE_VERIFY_COPY.denied);
    expect(
      resolveDeviceVerifyView({ ...base, row: row("denied", "x") }).message,
    ).toBe(DEVICE_VERIFY_COPY.alreadyDecided);
  });

  it("rate limited lookup → rate-limit copy, nothing else", () => {
    const v = resolveDeviceVerifyView({
      ...base,
      rateLimited: true,
      row: row("pending"),
    });
    expect(v).toMatchObject({
      message: DEVICE_VERIFY_COPY.rateLimited,
      tone: "error",
      canDecide: false,
    });
  });

  it("allowlisted ?error= maps to copy and keeps decide on a pending row", () => {
    const v = resolveDeviceVerifyView({
      ...base,
      errorCode: "rate_limited",
      row: row("pending"),
    });
    expect(v).toMatchObject({
      message: DEVICE_VERIFY_COPY.rateLimited,
      canDecide: true,
    });
    expect(
      resolveDeviceVerifyView({ ...base, errorCode: "<script>" }).message,
    ).toBe(DEVICE_VERIFY_COPY.failed);
  });

  it("new S4 strings are locked and say assistant, never bot", () => {
    expect(DEVICE_VERIFY_STATE_COPY).toEqual({
      alreadyOwner: "You're already this assistant's owner.",
      nextStepLabel: "Next step",
      nextStep:
        "Your assistant asks to join a project with its invite. The project owner approves it in Access › People.",
    });
    expect(Object.values(DEVICE_VERIFY_STATE_COPY).join(" ")).not.toMatch(
      /\bbots?\b/i,
    );
  });
});
