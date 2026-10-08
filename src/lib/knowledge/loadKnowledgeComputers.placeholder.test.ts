import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Reports → Computers skips pairing stubs (bca9b1eb)", () => {
  it("filters rows that never checked in", () => {
    const source = readFileSync(
      "src/lib/knowledge/loadKnowledgeComputers.ts",
      "utf8",
    );
    expect(source).toMatch(
      /AND NOT \(\s*dev\.install_bundle_version IS NULL\s*AND dev\.public_key IS NULL\s*AND dev\.last_handshake_at IS NULL/,
    );
  });
});
