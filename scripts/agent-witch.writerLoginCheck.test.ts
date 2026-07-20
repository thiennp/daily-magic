import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("agent-witch writer login on connect", () => {
  it("AGENT-042: does not auto-ensure every writer CLI on websocket connect", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "agent-witch.ts"),
      "utf8",
    );

    expect(source).not.toContain("runWriterLoginCheckOnConnect");
    expect(source).not.toContain("listPreferredWritersForStatus");
    expect(source).toContain('parsed.type === "writer.ensure"');
    expect(source).toContain('parsed.type === "install.bundle.update"');
  });
});
