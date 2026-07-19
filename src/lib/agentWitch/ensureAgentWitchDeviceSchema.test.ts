import { describe, expect, it, vi, beforeEach } from "vitest";

import {
  ensureAgentWitchDeviceSchema,
  resetAgentWitchDeviceSchemaEnsureForTests,
} from "@/lib/agentWitch/ensureAgentWitchDeviceSchema";

const sqlMock = vi.fn().mockResolvedValue([]);

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
}));

describe("ensureAgentWitchDeviceSchema", () => {
  beforeEach(() => {
    sqlMock.mockClear();
    resetAgentWitchDeviceSchemaEnsureForTests();
  });

  it("adds device auth/health columns only once per process", async () => {
    await ensureAgentWitchDeviceSchema();
    await ensureAgentWitchDeviceSchema();

    // display_name, restart_requested_at, public_key, last_handshake_at,
    // preferred_writer, last_wake_error, last_wake_error_at, link_code,
    // install_bundle_version
    expect(sqlMock).toHaveBeenCalledTimes(9);
  });
});
