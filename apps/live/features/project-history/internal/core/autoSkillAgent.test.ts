import { describe, expect, it } from "vitest";

import { probeSignedInAutoSkillAgent } from "./autoSkillAgent";

/** Every CLI answers "signed in" unless it is in `signedOut`. */
const execFor =
  (signedOut: readonly string[] = []) =>
  async (command: string): Promise<{ code: number | null; stdout: string }> => {
    const out = signedOut.some((name) => command.includes(name));
    return out
      ? { code: 1, stdout: "not logged in" }
      : { code: 0, stdout: '{"loggedIn": true}' };
  };

describe("probeSignedInAutoSkillAgent", () => {
  it("tries the writer of the runs first", async () => {
    expect(await probeSignedInAutoSkillAgent("cursor", execFor())).toBe(
      "cursor",
    );
  });

  it("only tries the owner's pick when one is given", async () => {
    expect(
      await probeSignedInAutoSkillAgent("codex", execFor(), "claude-cli"),
    ).toBe("claude-cli");
  });

  it("does not fall back to another tool when the pick is signed out", async () => {
    expect(
      await probeSignedInAutoSkillAgent(
        "codex",
        execFor(["claude"]),
        "claude-cli",
      ),
    ).toBeNull();
  });
});
