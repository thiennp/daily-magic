import { describe, expect, it } from "vitest";

import {
  appendAgentProcessKilledNote,
  formatAgentProcessKilledNote,
} from "./formatAgentProcessKilledNote";

describe("formatAgentProcessKilledNote (c1731750)", () => {
  it("names the signal", () => {
    expect(formatAgentProcessKilledNote("SIGKILL")).toBe(
      "The agent process was stopped unexpectedly (killed by SIGKILL).",
    );
    expect(formatAgentProcessKilledNote(15)).toContain("SIGTERM");
  });

  it("is null without a signal", () => {
    expect(formatAgentProcessKilledNote(null)).toBeNull();
    expect(formatAgentProcessKilledNote(0)).toBeNull();
    expect(appendAgentProcessKilledNote("out", undefined)).toBe("out");
  });

  it("keeps the last output above the note", () => {
    expect(appendAgentProcessKilledNote("Reading files…\n", "SIGKILL")).toBe(
      "Reading files…\nThe agent process was stopped unexpectedly (killed by SIGKILL).",
    );
    expect(appendAgentProcessKilledNote("  ", "SIGKILL")).toBe(
      "The agent process was stopped unexpectedly (killed by SIGKILL).",
    );
  });
});
