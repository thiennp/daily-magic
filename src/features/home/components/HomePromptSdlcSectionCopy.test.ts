import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const SECTION_PATH = join(
  process.cwd(),
  "src/features/home/components/HomePromptSdlcSection.tsx",
);

describe("HomePromptSdlcSection copy", () => {
  it("uses the article when naming the prompt optimizer mid-sentence", () => {
    const source = readFileSync(SECTION_PATH, "utf8");
    expect(source).toContain("Open the prompt optimizer in the");
    expect(source).not.toContain("Open Prompt optimizer in the console");
  });
});
