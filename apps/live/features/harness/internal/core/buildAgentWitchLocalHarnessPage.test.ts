import { describe, expect, it } from "vitest";

import {
  buildAgentWitchLocalHarnessPageBody,
  parseHarnessSubmitFormBody,
} from "./buildAgentWitchLocalHarnessPage";
import type { LocalHarnessRevealResult } from "./localHarness/revealLocalHarnessCandidates.types";

const revealFixture: LocalHarnessRevealResult = {
  scanRoots: ["/Users/me/projects"],
  sets: [
    {
      proposedSlug: "agents",
      proposedName: "agents",
      sourceRoot: "/Users/me/repo/agents/.cursor",
      repoPath: "/Users/me/repo",
      items: [
        {
          id: "rule-1",
          kind: "rule",
          title: "Demo rule",
          sourcePath: "/Users/me/repo/agents/.cursor/rules/demo.mdc",
          relativePath: "rules/demo.mdc",
          selected: true,
        },
      ],
    },
  ],
};

describe("buildAgentWitchLocalHarnessPageBody", () => {
  it("does not pre-check revealed sets (HARNESS-001)", () => {
    const html = buildAgentWitchLocalHarnessPageBody({
      scanFolder: "/Users/me/projects",
      reveal: revealFixture,
      installed: { manifestUpdatedAt: null, sets: [] },
      cloudAppOrigin: "https://www.agentwitch.com",
      importSectionExpanded: true,
    });

    expect(html).toContain('name="includeSet"');
    expect(html).not.toContain('name="includeSet" value="0" checked');
  });
});

describe("parseHarnessSubmitFormBody", () => {
  it("omits sets that were not checked for submit (HARNESS-001)", () => {
    const body = new URLSearchParams();
    body.set("setCount", "1");
    body.set("setSlug-0", "agents");
    body.set("setGroupIndex-0", "0");
    body.set("groupLabel-0", "agents");

    const sets = parseHarnessSubmitFormBody(body, revealFixture);

    expect(sets[0]?.items.every((item) => item.include === false)).toBe(true);
  });

  it("uses edited group label as harness set name on submit", () => {
    const body = new URLSearchParams();
    body.set("setCount", "1");
    body.set("includeSet", "0");
    body.set("setSlug-0", "agents");
    body.set("setGroupIndex-0", "0");
    body.set("groupLabel-0", "My custom agents pack");

    const sets = parseHarnessSubmitFormBody(body, revealFixture);

    expect(sets).toHaveLength(1);
    expect(sets[0]?.name).toBe("My custom agents pack");
    expect(sets[0]?.slug).toBe("agents");
    expect(sets[0]?.items.every((item) => item.include === true)).toBe(true);
  });
});
