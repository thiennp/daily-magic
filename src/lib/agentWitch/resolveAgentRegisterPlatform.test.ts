import { describe, expect, it } from "vitest";

import { resolveAgentRegisterPlatform } from "@/lib/agentWitch/resolveAgentRegisterPlatform";

describe("resolveAgentRegisterPlatform", () => {
  it("accepts linux from the dev host register payload (MAC_DEVICES-004)", () => {
    expect(resolveAgentRegisterPlatform({ platform: "linux" })).toBe("linux");
    expect(resolveAgentRegisterPlatform({ platform: "Linux" })).toBe("linux");
  });

  it("accepts mac and ignores unknown platforms", () => {
    expect(resolveAgentRegisterPlatform({ platform: "mac" })).toBe("mac");
    expect(resolveAgentRegisterPlatform({ platform: "darwin" })).toBeNull();
    expect(resolveAgentRegisterPlatform({})).toBeNull();
    expect(resolveAgentRegisterPlatform(undefined)).toBeNull();
  });
});
