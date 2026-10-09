import { describe, expect, it } from "vitest";

import { convertDocToSkillDraft } from "./convertDocToSkillDraft";
import { rewriteRelativeDocLinks } from "./docSkillText";

describe("rewriteRelativeDocLinks", () => {
  const from = ".cursor/commands/x.md";

  it("makes relative targets root-relative and keeps anchors", () => {
    expect(
      rewriteRelativeDocLinks("See [ADR](../../docs/adr/7.md#why) now", from),
    ).toBe("See [ADR](docs/adr/7.md#why) now");
    expect(rewriteRelativeDocLinks("[a](./y.md) [b](z/w.md)", from)).toBe(
      "[a](.cursor/commands/y.md) [b](.cursor/commands/z/w.md)",
    );
  });

  it("leaves urls and anchors alone and drops a link that leaves the folder", () => {
    expect(
      rewriteRelativeDocLinks(
        "[u](https://a.b/c) [h](#top) [m](mailto:x@y.z)",
        from,
      ),
    ).toBe("[u](https://a.b/c) [h](#top) [m](mailto:x@y.z)");
    expect(rewriteRelativeDocLinks("[out](../../../etc/hosts)", from)).toBe(
      "out",
    );
  });
});

describe("convertDocToSkillDraft quality", () => {
  const draft = (text: string) =>
    convertDocToSkillDraft({
      relPath: ".cursor/commands/command-x.md",
      kind: "command",
      text,
      sha: "a".repeat(40),
    });

  it("drops filler keywords and rewrites links in the body", () => {
    const d = draft(
      "---\nname: command-x\ndescription: Implement a new product feature using slices\n---\n\nSee [ADR](../../docs/adr/7.md).\n\n1. a\n2. b\n3. c\n",
    );
    expect(d.keywords).not.toContain("new");
    expect(d.keywords).not.toContain("using");
    expect(d.keywords).toEqual(
      expect.arrayContaining(["implement", "feature"]),
    );
    expect(d.body).toContain("[ADR](docs/adr/7.md)");
  });

  it("a title-only description gets the first sentence of the body", () => {
    const d = draft(
      "---\nname: command-x\ndescription: Extract to Utility Function\n---\n\nMove repeated logic into one shared helper. Then update callers.\n\n1. a\n2. b\n3. c\n",
    );
    expect(d.description).toBe(
      "Extract to Utility Function. Move repeated logic into one shared helper.",
    );
  });
});
