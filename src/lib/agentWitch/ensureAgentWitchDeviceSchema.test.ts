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

  it("adds display_name only once per process", async () => {
    await ensureAgentWitchDeviceSchema();
    await ensureAgentWitchDeviceSchema();

    expect(sqlMock).toHaveBeenCalledTimes(1);
  });
});
