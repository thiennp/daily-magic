import { describe, expect, it } from "vitest";

import {
  buildSkillBundle,
  embedSkillBundle,
  readSkillBundleFromBody,
  validateSkillBundle,
  SKILL_SCRIPT_MAX_BYTES,
  type SkillScriptProposal,
} from "./index";

const proposal = (
  over: Partial<SkillScriptProposal> = {},
): SkillScriptProposal => ({
  name: "count-lines",
  file: "count-lines.sh",
  description: "Count lines",
  params: [{ name: "path", required: true, example: "README.md" }],
  permissions: { write: false, network: false },
  content: '#!/bin/sh\nwc -l "$1"\n',
  ...over,
});

const built = (list: SkillScriptProposal[]) => {
  const result = buildSkillBundle(list);
  if (!result.ok) {
    throw new Error(result.reason);
  }
  return result.bundle;
};

describe("skill bundle", () => {
  it("round-trips through a skill body and strips it from the markdown", () => {
    const bundle = built([proposal({ content: "echo '-->' >out\n" })]);
    const body = embedSkillBundle("---\nname: x\n---\n## Steps\n1. a", bundle);
    const read = readSkillBundleFromBody(body);
    expect(read.bundle).toEqual(bundle);
    expect(read.markdown).not.toContain("agent-witch-skill-bundle");
    expect(read.error).toBeNull();
  });

  it("returns no bundle for a plain body", () => {
    expect(readSkillBundleFromBody("## Steps\n").bundle).toBeNull();
  });

  it("rejects a script over the size cap", () => {
    const big = "#".repeat(SKILL_SCRIPT_MAX_BYTES + 1);
    expect(buildSkillBundle([proposal({ content: big })])).toEqual({
      ok: false,
      reason: "script_too_large:count-lines",
    });
  });

  it("rejects more than 10 scripts and a total over 256 KB", () => {
    const many = Array.from({ length: 11 }, (_, i) =>
      proposal({ name: `s${i}`, file: `s${i}.sh` }),
    );
    expect(buildSkillBundle(many).ok).toBe(false);
    const heavy = Array.from({ length: 5 }, (_, i) =>
      proposal({
        name: `h${i}`,
        file: `h${i}.sh`,
        content: `#${"a".repeat(SKILL_SCRIPT_MAX_BYTES - 10)}\n`,
      }),
    );
    expect(buildSkillBundle(heavy)).toEqual({
      ok: false,
      reason: "bundle_too_large",
    });
  });

  it("rejects binary content and secrets", () => {
    expect(buildSkillBundle([proposal({ content: "a\u0000b" })]).ok).toBe(
      false,
    );
    const secret = buildSkillBundle([
      proposal({
        content:
          'curl -H "Authorization: Bearer sk-abcdefghijklmnopqrstuvwxyz123456"',
      }),
    ]);
    expect(secret.ok).toBe(false);
  });

  it("rejects a tampered file and path-like file names", () => {
    const bundle = built([proposal()]);
    const tampered = validateSkillBundle({
      manifest: bundle.manifest,
      files: { "count-lines.sh": "rm -rf ~" },
    });
    expect(tampered).toEqual({
      ok: false,
      reason: "script_hash_mismatch:count-lines",
    });
    expect(buildSkillBundle([proposal({ file: "../evil.sh" })]).ok).toBe(false);
  });
});
