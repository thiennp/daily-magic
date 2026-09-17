import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("HomeProjectListRow", () => {
  it("HOME-049: shows only project name and a single Edit control", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "HomeProjectListRow.tsx"),
      "utf8",
    );

    expect(source).toContain("{project.name}");
    expect(source).toContain("Edit");
    expect(source).not.toContain("TrashBinIcon");
    expect(source).not.toContain("Choose on this Mac");
    expect(source).not.toContain("folderPath");
  });
});
