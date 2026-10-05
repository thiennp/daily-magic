import { describe, expect, it } from "vitest";

import { decideAgentWitchLaunchAgentWakePortSync } from "./decideAgentWitchLaunchAgentWakePortSync";

describe("decideAgentWitchLaunchAgentWakePortSync", () => {
  it("syncs a drifted plist to the wake-port.json value (61774 → 49273)", () => {
    expect(
      decideAgentWitchLaunchAgentWakePortSync({
        filePort: 49273,
        plistValue: "61774",
      }),
    ).toEqual({ kind: "sync", wakePort: 49273 });
  });

  it("is a noop when the plist already mirrors the file", () => {
    expect(
      decideAgentWitchLaunchAgentWakePortSync({
        filePort: 49273,
        plistValue: "49273",
      }),
    ).toEqual({ kind: "noop" });
  });

  it.each([null, 0, -1, 65536, 1.5, Number.NaN])(
    "skips when wake-port.json is missing or invalid (%s)",
    (filePort) => {
      expect(
        decideAgentWitchLaunchAgentWakePortSync({
          filePort,
          plistValue: "61774",
        }),
      ).toEqual({ kind: "skip-invalid" });
    },
  );

  it("skips a plist without an AGENT_WITCH_WAKE_PORT entry", () => {
    expect(
      decideAgentWitchLaunchAgentWakePortSync({
        filePort: 49273,
        plistValue: null,
      }),
    ).toEqual({ kind: "skip-no-entry" });
  });

  it("syncs a non-numeric plist value", () => {
    expect(
      decideAgentWitchLaunchAgentWakePortSync({
        filePort: 49273,
        plistValue: "",
      }),
    ).toEqual({ kind: "sync", wakePort: 49273 });
  });
});
