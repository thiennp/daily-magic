import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchAgentWitchInstallToken } from "@/lib/agentWitch/fetchAgentWitchInstallToken";

afterEach(() => {
  vi.unstubAllGlobals();
});

const stubResponse = (status: number, body: unknown): void => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: status >= 200 && status < 300,
      status,
      json: async () => body,
    }),
  );
};

describe("fetchAgentWitchInstallToken errors", () => {
  it("shows the plan limit reason when the server denies with 403", async () => {
    stubResponse(403, {
      error: "This plan allows up to 2 computers, and you have 2 connected.",
      code: "computer_limit",
    });
    const result = await fetchAgentWitchInstallToken();
    expect(result.ok).toBe(false);
    expect(result.errorMessage).toContain("allows up to 2 computers");
  });

  it("keeps the generic message for other failures", async () => {
    stubResponse(500, { error: "stack trace: secret" });
    expect((await fetchAgentWitchInstallToken()).errorMessage).toBe(
      "Could not create a computer install link.",
    );
  });
});
