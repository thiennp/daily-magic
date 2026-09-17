import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("HomeSetupSectionShell", () => {
  it("HOME-039: uses a flex summary with custom chevron instead of native marker", () => {
    const source = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "HomeSetupSectionShell.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("HOME_SETUP_SUMMARY_CLASS");
    expect(source).toContain("ChevronDownIcon");
    expect(source).toContain('isOpen ? "rotate-180"');
    expect(source).toContain("HOME_SETUP_EXPANDED_CONTENT_CLASS");
  });
});
