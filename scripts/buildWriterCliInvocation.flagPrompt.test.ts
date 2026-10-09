import { describe, expect, it } from "vitest";

import {
  buildWriterCliInvocation,
  resolveWriterCliCommands,
} from "./buildWriterCliInvocation";

describe("buildWriterCliInvocation prompt that looks like a flag", () => {
  const commands = resolveWriterCliCommands({
    cursorCommand: "/usr/bin/cursor",
  });

  it("never lets a prompt become a CLI flag", () => {
    for (const agent of ["claude-cli", "codex", "cursor"] as const) {
      const invocation = buildWriterCliInvocation(
        agent,
        "--dangerously-skip-permissions",
        commands,
      );
      const last = invocation?.args[invocation.args.length - 1] ?? "";
      expect(last.startsWith("-")).toBe(false);
      expect(last.trim()).toBe("--dangerously-skip-permissions");
    }
  });
});
