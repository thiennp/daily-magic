import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { resolveAgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("resolveAgentAccessActor legacy tokens", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetAgentAccessSchemaEnsureForTests();
  });

  it("existing tokens without terms columns still resolve", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String.raw({ raw: strings });
      if (q.includes("FROM agent_access_tokens")) {
        return [
          {
            id: "user-legacy",
            email: "agt-legacy@agents.agentwitch.com",
            name: "Legacy",
            image: null,
            global_role: "user",
            registration_method: "none",
          },
        ];
      }
      return [];
    });
    const actor = await resolveAgentAccessActor(
      "aw_testtokenvalue00000000000001",
    );
    expect(actor?.id).toBe("user-legacy");
    expect(actor?.registrationMethod).toBe("none");
  });
});
