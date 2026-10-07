import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (relative: string): string =>
  readFileSync(
    path.join(process.cwd(), "src/features/projects", relative),
    "utf8",
  );

describe("Settings name field focus (jump audit r2)", () => {
  it("only enters edit mode (autofocus) on an explicit rename", () => {
    const section = read("settings/AwcProjectSettingsNameSection.tsx");
    expect(section).not.toContain("canEdit ? true : startInEditMode");
    expect(section).toMatch(
      /useAwcProjectRename\(\{[^}]*startInEditMode,\s*\}\)/,
    );
  });
});
