import { describe, expect, it } from "vitest";

import {
  buildReadOnlyAgentInvocation,
  describeAgentFailure,
} from "./readOnlyAgentInvocation";

describe("buildReadOnlyAgentInvocation", () => {
  it("runs Cursor in read-only ask mode on its auto model, prompt last", () => {
    const run = buildReadOnlyAgentInvocation("cursor", "Judge this");
    expect(run?.args).toEqual(
      expect.arrayContaining(["-p", "--mode", "ask", "--model", "auto"]),
    );
    expect(run?.args.at(-1)).toBe("Judge this");
    expect(run?.args).not.toContain("--force");
  });

  it("runs Codex read-only and Claude for one turn", () => {
    expect(buildReadOnlyAgentInvocation("codex", "x")?.args).toEqual(
      expect.arrayContaining(["exec", "-s", "read-only"]),
    );
    expect(buildReadOnlyAgentInvocation("claude-cli", "x")?.args).toEqual(
      expect.arrayContaining(["--max-turns", "1"]),
    );
  });

  it("never lets the prompt read as a flag, and refuses an empty one", () => {
    expect(
      buildReadOnlyAgentInvocation("cursor", "--force do it")?.args.at(-1),
    ).toBe(" --force do it");
    expect(buildReadOnlyAgentInvocation("cursor", "   ")).toBeNull();
  });
});

describe("describeAgentFailure", () => {
  it("quotes the first line the tool printed", () => {
    expect(
      describeAgentFailure({
        stdout: "",
        stderr: "\nActionRequiredError: You're out of usage.\nmore",
      }),
    ).toBe(": ActionRequiredError: You're out of usage.");
  });

  it("is empty when the tool said nothing", () => {
    expect(describeAgentFailure({ stdout: "", stderr: "" })).toBe("");
  });
});
