import { describe, expect, it } from "vitest";

import { findBrokenDocReferences } from "./findBrokenDocReferences";

const files = new Set(["src/a/real.ts", "docs/guide.md"]);
const probe = {
  exists: (p: string) => files.has(p),
  hasTopLevel: (n: string) => ["src", "docs"].includes(n),
  scripts: new Set(["build", "test:related"]) as ReadonlySet<string>,
};

describe("findBrokenDocReferences", () => {
  it("flags a missing file in backticks and in a link", () => {
    const md = "Edit `src/a/gone.ts` and see [guide](docs/old.md).";
    expect(findBrokenDocReferences(md, probe)).toEqual([
      "src/a/gone.ts",
      "docs/old.md",
    ]);
  });

  it("accepts files that exist", () => {
    const md = "Edit `src/a/real.ts`, see [g](docs/guide.md#top).";
    expect(findBrokenDocReferences(md, probe)).toEqual([]);
  });

  it("ignores placeholders, globs, urls and paths from other folders", () => {
    const md =
      "`src/<slug>/x.ts` `src/**/y.ts` [w](https://a.b/c.md) `public-api/types.ts`";
    expect(findBrokenDocReferences(md, probe)).toEqual([]);
  });

  it("flags an npm script that package.json lacks", () => {
    const md = "Run npm run build then npm run harness:bootstrap.";
    expect(findBrokenDocReferences(md, probe)).toEqual([
      "npm run harness:bootstrap",
    ]);
  });

  it("skips the script check when the folder has no package.json", () => {
    expect(
      findBrokenDocReferences("npm run nope", { ...probe, scripts: null }),
    ).toEqual([]);
  });
});
