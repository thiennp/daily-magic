import { describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { revealLocalHarnessCandidates } from "./revealLocalHarnessCandidates";

describe("revealLocalHarnessCandidates", () => {
  it("AGENT-066: groups .cursor files into sets named after the parent folder", () => {
    const tempRoot = fs.mkdtempSync(
      path.join(os.homedir(), ".agent-witch-test-reveal-"),
    );
    const repoDir = path.join(tempRoot, "sample-repo");
    const cursorDir = path.join(repoDir, ".cursor");
    fs.mkdirSync(path.join(cursorDir, "rules"), { recursive: true });
    fs.writeFileSync(
      path.join(cursorDir, "rules", "demo-rule.mdc"),
      "---\ndescription: demo\n---\n",
    );

    const reveal = revealLocalHarnessCandidates({
      scanRoots: [tempRoot],
      maxDepth: 3,
    });

    expect(reveal.sets.length).toBe(1);
    expect(reveal.sets[0]?.proposedSlug).toBe("sample-repo");
    expect(reveal.sets[0]?.items.length).toBe(1);
    expect(reveal.sets[0]?.items[0]?.kind).toBe("rule");

    fs.rmSync(tempRoot, { recursive: true, force: true });
  });
});
