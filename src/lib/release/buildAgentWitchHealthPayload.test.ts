import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/release/readDeviceSupersessionMigrationApplied", () => ({
  readDeviceSupersessionMigrationApplied: vi.fn(async () => true),
}));

import { AGENT_WITCH_SERVER_RELEASE_LABEL } from "@/lib/release/agentWitchServerReleaseLabel.constant";
import { buildAgentWitchHealthPayload } from "@/lib/release/buildAgentWitchHealthPayload";
import { readDeviceSupersessionMigrationApplied } from "@/lib/release/readDeviceSupersessionMigrationApplied";

describe("buildAgentWitchHealthPayload", () => {
  beforeEach(() => {
    vi.mocked(readDeviceSupersessionMigrationApplied).mockResolvedValue(true);
  });

  it("includes the server release label so production health can prove a deploy", async () => {
    const payload = await buildAgentWitchHealthPayload();

    expect(payload.ok).toBe(true);
    expect(payload.release.label).toBe(AGENT_WITCH_SERVER_RELEASE_LABEL);
    expect(payload.deviceSupersessionMigrationApplied).toBe(true);
  });

  it("stays healthy when the migration lookup fails", async () => {
    vi.mocked(readDeviceSupersessionMigrationApplied).mockRejectedValue(
      new Error("database unavailable"),
    );

    const payload = await buildAgentWitchHealthPayload();

    expect(payload.ok).toBe(true);
    expect(payload.release.label).toBe(AGENT_WITCH_SERVER_RELEASE_LABEL);
    expect(payload.deviceSupersessionMigrationApplied).toBe(false);
  });
});
