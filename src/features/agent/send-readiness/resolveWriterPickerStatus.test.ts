import { describe, expect, it } from "vitest";

import { resolveWriterPickerStatus } from "@/features/agent/send-readiness/resolveWriterPickerStatus";

/** Device 8F03 on 316: Codex installed but signed out, agy ready, others missing. */
const writers = [
  { writerAgent: "claude-cli", ready: false, loggedIn: null },
  { writerAgent: "codex", ready: false, loggedIn: false },
  { writerAgent: "cursor", ready: false, loggedIn: null },
  { writerAgent: "antigravity", ready: true, loggedIn: null },
];

describe("resolveWriterPickerStatus (77e29f7a)", () => {
  it("shows each writer's state", () => {
    expect(resolveWriterPickerStatus("codex", writers)?.label).toBe(
      "Not signed in",
    );
    expect(resolveWriterPickerStatus("antigravity", writers)?.label).toBe(
      "Ready",
    );
    expect(resolveWriterPickerStatus("claude-cli", writers)?.label).toBe(
      "Not set up",
    );
  });

  it("shows nothing when the computer never reported the tool", () => {
    expect(resolveWriterPickerStatus("cursor-cloud", writers)).toBeNull();
    expect(resolveWriterPickerStatus("codex", undefined)).toBeNull();
  });
});
