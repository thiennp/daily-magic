import { describe, expect, it } from "vitest";
import {
  isAgentRunBareShellPromptLine,
  isAgentRunWriterCliInvocationLine,
} from "./isAgentRunTerminalChromeLine";

describe("isAgentRunTerminalChromeLine", () => {
  describe("isAgentRunBareShellPromptLine", () => {
    it("matches mac prompts", () => {
      expect(isAgentRunBareShellPromptLine("agent-witch@mac ~ % ")).toBe(true);
      expect(isAgentRunBareShellPromptLine("agent-witch@mac ~ %")).toBe(true);
    });

    it("matches linux prompts", () => {
      expect(isAgentRunBareShellPromptLine("agent-witch@linux ~ $ ")).toBe(
        true,
      );
      expect(isAgentRunBareShellPromptLine("agent-witch@linux ~ $")).toBe(true);
    });

    it("does not match non-prompts", () => {
      expect(
        isAgentRunBareShellPromptLine("agent-witch@mac ~ % some command"),
      ).toBe(false);
      expect(isAgentRunBareShellPromptLine("hello world")).toBe(false);
    });
  });

  describe("isAgentRunWriterCliInvocationLine", () => {
    it("matches writers with mac prompt", () => {
      expect(
        isAgentRunWriterCliInvocationLine("agent-witch@mac ~ % claude"),
      ).toBe(true);
      expect(
        isAgentRunWriterCliInvocationLine("agent-witch@mac ~ % agy --sandbox"),
      ).toBe(true);
    });

    it("matches writers with linux prompt", () => {
      expect(
        isAgentRunWriterCliInvocationLine("agent-witch@linux ~ $ claude"),
      ).toBe(true);
      expect(
        isAgentRunWriterCliInvocationLine(
          "agent-witch@linux ~ $ agy --sandbox",
        ),
      ).toBe(true);
    });

    it("matches bare writers", () => {
      expect(isAgentRunWriterCliInvocationLine("claude run something")).toBe(
        true,
      );
      expect(isAgentRunWriterCliInvocationLine("agy --sandbox")).toBe(true);
    });

    it("does not match random commands", () => {
      expect(isAgentRunWriterCliInvocationLine("ls -la")).toBe(false);
      expect(isAgentRunWriterCliInvocationLine("agent-witch@mac ~ % ls")).toBe(
        false,
      );
    });
  });
});
