import { describe, expect, it } from "vitest";

import {
  buildAutoSkillModule,
  canonicalizeModuleText,
  isTrivialModule,
} from "./autoSkillModuleNormalize";

describe("canonicalizeModuleText", () => {
  it("turns paths, numbers and quoted values into <param>", () => {
    expect(
      canonicalizeModuleText('Run lint on "src/App.tsx" and bump to 12'),
    ).toBe("run lint on <param> and bump to <param>");
    expect(
      canonicalizeModuleText("Open https://x.io/a?b=1 in src/a/b.ts"),
    ).toBe("open <param> in <param>");
  });

  it("gives the same canonical text for steps that differ only in values", () => {
    expect(canonicalizeModuleText("Run the lint check on src/a.ts")).toBe(
      canonicalizeModuleText("Run the lint check on lib/other/b.js"),
    );
  });

  it("scrubs secrets and caps the length", () => {
    const out = canonicalizeModuleText(
      `Deploy with token sk-ant-abcdefghijklmnopqrstuvwxyz0123456789 ${"x ".repeat(400)}`,
    );
    expect(out).not.toContain("abcdefghijklmnop");
    expect(out.length).toBeLessThanOrEqual(300);
  });
});

describe("isTrivialModule", () => {
  it.each([
    "read <param>",
    "list files",
    "open <param>",
    "show <param> print",
    "ok",
  ])("drops %s", (canonical) => {
    expect(isTrivialModule(canonical)).toBe(true);
  });

  it("keeps a real multi-token step", () => {
    expect(isTrivialModule("run lint check on <param>")).toBe(false);
  });
});

describe("buildAutoSkillModule", () => {
  it("derives verb, target, params and a stable hash", () => {
    const a = buildAutoSkillModule("Run lint check on src/a.ts", 0);
    const b = buildAutoSkillModule("Run lint check on src/b.ts", 3);
    expect(a).toMatchObject({ verb: "run", target: "lint check" });
    expect(a?.params).toEqual([{ name: "path", example: "src/a.ts" }]);
    expect(a?.hash).toBe(b?.hash);
  });

  it("returns null for trivial steps", () => {
    expect(buildAutoSkillModule("Read src/a.ts", 0)).toBeNull();
  });
});
