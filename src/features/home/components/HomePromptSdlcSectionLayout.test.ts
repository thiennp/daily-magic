import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("HomePromptSdlcSection layout", () => {
  it("renders the compose card when showComposeForm is enabled", () => {
    const sectionSource = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "HomePromptSdlcSection.tsx",
      ),
      "utf8",
    );

    expect(sectionSource).toContain("HomePromptOptimizerComposeCard");
    expect(sectionSource).toContain("showComposeForm");
  });
});
