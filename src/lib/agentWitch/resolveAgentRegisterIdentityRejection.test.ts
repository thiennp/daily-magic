import { AGENT_WITCH_UNKNOWN_IDENTITY_ERROR_CODE } from "@agent-witch/shared/protocol";
import { describe, expect, it } from "vitest";

import { resolveAgentRegisterIdentityRejection } from "@/lib/agentWitch/resolveAgentRegisterIdentityRejection";

describe("resolveAgentRegisterIdentityRejection", () => {
  it("uses unknown_identity only when the token is absent for every user", () => {
    expect(
      resolveAgentRegisterIdentityRejection({
        device: null,
        userId: "user-1",
      }),
    ).toEqual({
      errorCode: AGENT_WITCH_UNKNOWN_IDENTITY_ERROR_CODE,
      errorMessage: "Agent Witch does not know this Mac identity.",
    });
  });

  it("keeps a revoked row as not linked, without a wipe code", () => {
    const rejection = resolveAgentRegisterIdentityRejection({
      device: { revokedAt: "2026-09-28T00:00:00.000Z" },
      userId: "user-1",
    });

    expect(rejection?.errorCode).toBeUndefined();
    expect(rejection?.errorMessage).toContain("not linked");
  });

  it("rejects a known device when the connection has no user", () => {
    const rejection = resolveAgentRegisterIdentityRejection({
      device: { revokedAt: null },
      userId: undefined,
    });

    expect(rejection?.errorCode).toBeUndefined();
    expect(rejection?.errorMessage).toContain("not linked");
  });

  it("accepts an active device for a signed-in user", () => {
    expect(
      resolveAgentRegisterIdentityRejection({
        device: { revokedAt: null },
        userId: "user-1",
      }),
    ).toBeNull();
  });
});
