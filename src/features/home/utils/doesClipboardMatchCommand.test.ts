import { describe, expect, it } from "vitest";

import { doesClipboardMatchCommand } from "@/features/home/utils/doesClipboardMatchCommand";

describe("doesClipboardMatchCommand", () => {
  const command = "curl -fsSL https://example.com/install.sh | bash";

  it("returns true when clipboard text matches the command", () => {
    expect(doesClipboardMatchCommand(command, command)).toBe(true);
  });

  it("ignores surrounding whitespace", () => {
    expect(doesClipboardMatchCommand(command, ` ${command} `)).toBe(true);
  });

  it("returns false for empty or mismatched clipboard text", () => {
    expect(doesClipboardMatchCommand(command, null)).toBe(false);
    expect(doesClipboardMatchCommand(command, "")).toBe(false);
    expect(doesClipboardMatchCommand(command, "other text")).toBe(false);
  });
});
