import { describe, expect, it } from "vitest";

import { dropStaleDocCandidates } from "./dropStaleDocCandidates";
import type { DocEvaluation } from "./evaluateDocSource";

const probe = {
  exists: () => false,
  hasTopLevel: (n: string) => n === "src",
  scripts: null,
};
const candidate = (markdown: string) =>
  ({ kind: "candidate", markdown }) as unknown as DocEvaluation;

describe("dropStaleDocCandidates", () => {
  it("turns a candidate with a missing file into a stale skip", () => {
    const out = dropStaleDocCandidates([candidate("`src/a/b.ts`")], probe);
    expect(out[0]).toEqual({ kind: "skip", reason: "stale_references" });
  });

  it("keeps a clean candidate and existing skips", () => {
    const skip: DocEvaluation = { kind: "skip", reason: "up_to_date" };
    const out = dropStaleDocCandidates([candidate("no refs"), skip], probe);
    expect(out[0]?.kind).toBe("candidate");
    expect(out[1]).toBe(skip);
  });
});
