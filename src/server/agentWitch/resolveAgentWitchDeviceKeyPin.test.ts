import { describe, expect, it } from "vitest";

import { resolveAgentWitchDeviceKeyPin } from "@/server/agentWitch/resolveAgentWitchDeviceKeyPin";

const PINNED_KEY = "pinned-device-public-key";
const OTHER_KEY = "other-device-public-key";

describe("resolveAgentWitchDeviceKeyPin", () => {
  it("pins on first hello when no key is stored", () => {
    expect(
      resolveAgentWitchDeviceKeyPin({
        deviceId: "device-1",
        pinnedPublicKey: null,
        presentedPublicKey: PINNED_KEY,
        helloMissing: false,
      }),
    ).toEqual({ outcome: "write-pin", publicKey: PINNED_KEY });
  });

  it("refreshes when the presented key matches the pin", () => {
    expect(
      resolveAgentWitchDeviceKeyPin({
        deviceId: "device-1",
        pinnedPublicKey: PINNED_KEY,
        presentedPublicKey: PINNED_KEY,
        helloMissing: false,
      }),
    ).toEqual({ outcome: "write-pin", publicKey: PINNED_KEY });
  });

  it("rejects a mismatched presented key", () => {
    expect(
      resolveAgentWitchDeviceKeyPin({
        deviceId: "device-1",
        pinnedPublicKey: PINNED_KEY,
        presentedPublicKey: OTHER_KEY,
        helloMissing: false,
      }),
    ).toEqual({
      outcome: "reject",
      errorMessage: expect.stringMatching(/does not match the pinned key/i),
    });
  });

  it("rejects hello-less register when a key is already pinned", () => {
    expect(
      resolveAgentWitchDeviceKeyPin({
        deviceId: "device-1",
        pinnedPublicKey: PINNED_KEY,
        presentedPublicKey: "",
        helloMissing: true,
      }),
    ).toEqual({
      outcome: "reject",
      errorMessage: "Device authentication is required for this computer.",
    });
  });

  it("allows hello-less register when no key is pinned", () => {
    expect(
      resolveAgentWitchDeviceKeyPin({
        deviceId: "device-1",
        pinnedPublicKey: null,
        presentedPublicKey: "",
        helloMissing: true,
      }),
    ).toEqual({ outcome: "allow-legacy" });
  });

  it("proceeds without writing when hello is present but deviceId is unset", () => {
    expect(
      resolveAgentWitchDeviceKeyPin({
        deviceId: undefined,
        pinnedPublicKey: null,
        presentedPublicKey: PINNED_KEY,
        helloMissing: false,
      }),
    ).toEqual({ outcome: "proceed" });
  });
});
