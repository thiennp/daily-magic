import { describe, expect, it } from "vitest";

import { toProbedWriter } from "./probeAgentWitchWriters";

describe("toProbedWriter (77e29f7a)", () => {
  it("ready means it can run: a signed-out Codex is not ready", () => {
    expect(toProbedWriter("codex", true, false)).toEqual({
      writerAgent: "codex",
      ready: false,
      loggedIn: false,
    });
  });

  it("installed with signed-in or unknown login stays ready", () => {
    expect(toProbedWriter("codex", true, true).ready).toBe(true);
    expect(toProbedWriter("antigravity", true, null).ready).toBe(true);
    expect(toProbedWriter("cursor", false, null).ready).toBe(false);
  });
});
