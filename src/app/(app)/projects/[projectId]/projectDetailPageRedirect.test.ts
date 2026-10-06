import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("project detail page signed-out redirect", () => {
  it("preserves /projects/<id> in login callbackUrl", () => {
    const source = readFileSync(
      join(process.cwd(), "src/app/(app)/projects/[projectId]/page.tsx"),
      "utf8",
    );

    expect(source).toContain("buildLoginCallbackPath");
    expect(source).toMatch(
      /buildLoginCallbackPath\(\s*path/,
    );
    expect(source).toContain("`/projects/${encodeURIComponent(trimmedId)}`");
    expect(source).not.toContain('callbackUrl=/projects"');
    expect(source).not.toContain("callbackUrl=/projects'");
  });
});
