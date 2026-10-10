import { describe, expect, it } from "vitest";

import { parseClaudeTranscriptTurn } from "./parseClaudeTranscriptTurn";

const line = (value: unknown): string => JSON.stringify(value);
const user = (content: unknown, extra: object = {}) =>
  line({ type: "user", message: { role: "user", content }, ...extra });
const assistant = (content: unknown[]) =>
  line({ type: "assistant", message: { role: "assistant", content } });
const bashCall = (id: string) => ({
  type: "tool_use",
  id,
  name: "Bash",
  input: {},
});
const result = (id: string, text: string, isError = false) =>
  user([
    { type: "tool_result", tool_use_id: id, content: text, is_error: isError },
  ]);

describe("parseClaudeTranscriptTurn", () => {
  it("returns null when there is no real prompt", () => {
    expect(parseClaudeTranscriptTurn("")).toBeNull();
    expect(parseClaudeTranscriptTurn("not json\n")).toBeNull();
    expect(
      parseClaudeTranscriptTurn(user("<system-reminder>x</system-reminder>")),
    ).toBeNull();
  });

  it("takes the last real prompt, skipping injected context and meta lines", () => {
    const jsonl = [
      user("first request about the old thing"),
      assistant([{ type: "text", text: "done" }]),
      user([
        { type: "text", text: "<system-reminder>ctx</system-reminder>" },
        { type: "text", text: "fix the login redirect loop in auth.ts" },
      ]),
      user("hook noise", { isMeta: true }),
    ].join("\n");
    expect(parseClaudeTranscriptTurn(jsonl)?.prompt).toBe(
      "fix the login redirect loop in auth.ts",
    );
  });

  it("fails the turn when the last Bash call failed, and keeps its output", () => {
    const jsonl = [
      user("run the tests for the auth module please"),
      assistant([bashCall("b1")]),
      result("b1", "Exit code 1\nTypeError: x is not a function", true),
      assistant([{ type: "text", text: "The tests fail." }]),
    ].join("\n");
    const turn = parseClaudeTranscriptTurn(jsonl);
    expect(turn?.exitCode).toBe(1);
    expect(turn?.output).toContain("TypeError: x is not a function");
    expect(turn?.output).toContain("The tests fail.");
  });

  it("passes the turn when a later Bash call succeeds, and ignores non-Bash results", () => {
    const jsonl = [
      user("run the tests for the auth module please"),
      assistant([bashCall("b1")]),
      result("b1", "Exit code 1\nboom", true),
      assistant([
        bashCall("b2"),
        { type: "tool_use", id: "r1", name: "Read", input: {} },
      ]),
      result("b2", "all green"),
      result("r1", "Exit code 1 in a file", true),
    ].join("\n");
    expect(parseClaudeTranscriptTurn(jsonl)?.exitCode).toBe(0);
  });
});
