import { describe, expect, it } from "vitest";

import { parseMacConnectQuery } from "@/lib/agentWitch/macBootstrap/parseMacConnectQuery";

describe("parseMacConnectQuery", () => {
  it("accepts mac-app S256 query", () => {
    const result = parseMacConnectQuery(
      new URLSearchParams({
        client: "mac-app",
        state: "st-1",
        code_challenge: "challenge",
        code_challenge_method: "S256",
      }),
    );
    expect(result).toEqual({
      ok: true,
      state: "st-1",
      codeChallenge: "challenge",
    });
  });

  it("rejects missing params and wrong client/method", () => {
    expect(
      parseMacConnectQuery(new URLSearchParams({ client: "mac-app" })).ok,
    ).toBe(false);
    expect(
      parseMacConnectQuery(
        new URLSearchParams({
          client: "web",
          state: "s",
          code_challenge: "c",
          code_challenge_method: "S256",
        }),
      ),
    ).toMatchObject({ ok: false, error: "invalid_client" });
    expect(
      parseMacConnectQuery(
        new URLSearchParams({
          client: "mac-app",
          state: "s",
          code_challenge: "c",
          code_challenge_method: "plain",
        }),
      ),
    ).toMatchObject({ ok: false, error: "invalid_pkce" });
  });
});
