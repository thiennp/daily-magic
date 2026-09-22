import { describe, expect, it, vi, beforeEach } from "vitest";

import {
  ensureAgentWitchDeviceSchema,
  resetAgentWitchDeviceSchemaEnsureForTests,
} from "@/lib/agentWitch/ensureAgentWitchDeviceSchema";

const sqlMock = vi.fn().mockResolvedValue([]);

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
}));

const sqlCallsAsText = (): string =>
  sqlMock.mock.calls.map((call) => String(call[0])).join("\n");

describe("ensureAgentWitchDeviceSchema", () => {
  beforeEach(() => {
    sqlMock.mockClear();
    resetAgentWitchDeviceSchemaEnsureForTests();
  });

  it("adds device auth/health columns only once per process", async () => {
    await ensureAgentWitchDeviceSchema();
    await ensureAgentWitchDeviceSchema();

    // display_name … install_bundle_version (9) + platform column + platform check (2)
    expect(sqlMock).toHaveBeenCalledTimes(11);

    const sqlText = sqlCallsAsText();
    expect(sqlText).toContain("ADD COLUMN IF NOT EXISTS platform");
    expect(sqlText).toContain("agent_witch_devices_platform_check");
    expect(sqlText).toContain("'mac', 'linux'");
  });
});
