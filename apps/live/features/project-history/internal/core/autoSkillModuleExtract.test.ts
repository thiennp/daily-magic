import { describe, expect, it, vi } from "vitest";

import type { AutoSkillCompleter } from "./autoSkill.types";
import { extractModules } from "./autoSkillModuleExtract";
import { parseModuleExtractionJson } from "./autoSkillModuleLlm";
import { splitPromptIntoSteps } from "./autoSkillModuleSplitter";
import { parseWavePlanStepTitles } from "./autoSkillModuleWavePlan";

const PLAN = [
  "some output",
  "[[WAVE_PLAN]]",
  "W|w1|Prepare the repository|30",
  "A|a1|Run lint check on src/a.ts|20",
  "A|a2|Write release notes summary|40",
  "[[WAVE_STATUS]]",
  "A|a9|Ignored after next marker|5",
].join("\n");

const goodJson = JSON.stringify({
  modules: [
    {
      verb: "run",
      target: "lint check",
      params: [{ name: "path", example: "src/a.ts" }],
      text: "Run lint check on src/a.ts",
    },
  ],
});

describe("parseWavePlanStepTitles", () => {
  it("reads agent lines of the latest block and stops at the next marker", () => {
    expect(parseWavePlanStepTitles(PLAN)).toEqual([
      "Run lint check on src/a.ts",
      "Write release notes summary",
    ]);
  });

  it("falls back to waves when there are no agent lines", () => {
    expect(parseWavePlanStepTitles("[[WAVE_PLAN]]\nW|1|Build it|10")).toEqual([
      "Build it",
    ]);
  });

  it("is empty without a plan", () => {
    expect(parseWavePlanStepTitles("nothing here")).toEqual([]);
  });
});

describe("parseModuleExtractionJson", () => {
  it("accepts a valid schema", () => {
    expect(parseModuleExtractionJson(goodJson)).toHaveLength(1);
  });

  it.each([
    "not json",
    '{"modules":[]}',
    '{"modules":[{"verb":"run"}]}',
    '{"modules":[{"verb":"a","target":"b","text":"c","params":[{"name":1}]}]}',
  ])("rejects %s", (text) => {
    expect(parseModuleExtractionJson(text)).toBeNull();
  });
});

describe("splitPromptIntoSteps", () => {
  it("uses numbered lines and drops the harness suffix", () => {
    expect(
      splitPromptIntoSteps("Plan:\n1. Fix login bug\n2) Run lint\n---\nrules"),
    ).toEqual(["Fix login bug", "Run lint"]);
  });

  it("splits sentences otherwise", () => {
    expect(
      splitPromptIntoSteps("Fix the bug. Then run the tests; deploy"),
    ).toEqual(["Fix the bug.", "run the tests", "deploy"]);
  });
});

describe("extractModules", () => {
  it("prefers the WAVE_PLAN and never calls the LLM", async () => {
    const completer: AutoSkillCompleter = vi.fn();
    const out = await extractModules("prompt", PLAN, completer);
    expect(out.source).toBe("wave_plan");
    expect(out.modules.map((m) => m.canonical)).toEqual([
      "run lint check on <param>",
      "write release notes summary",
    ]);
    expect(completer).not.toHaveBeenCalled();
  });

  it("uses strict LLM JSON when there is no plan", async () => {
    const completer: AutoSkillCompleter = vi.fn(async () => ({
      ok: true as const,
      text: goodJson,
    }));
    const out = await extractModules(
      "Run lint check on src/a.ts",
      undefined,
      completer,
    );
    expect(out.source).toBe("llm");
    expect(out.modules[0]).toMatchObject({ verb: "run", target: "lint check" });
  });

  it("retries once, then falls back to the splitter", async () => {
    const completer: AutoSkillCompleter = vi.fn(async () => ({
      ok: true as const,
      text: "sorry, here is prose",
    }));
    const out = await extractModules(
      "Run lint check on src/a.ts. Write release notes summary.",
      undefined,
      completer,
    );
    expect(completer).toHaveBeenCalledTimes(2);
    expect(out.source).toBe("splitter");
    expect(out.modules).toHaveLength(2);
  });

  it("falls back to the splitter without a completer and drops trivial steps", async () => {
    const out = await extractModules(
      "1. Read src/a.ts\n2. Run lint check on src/a.ts\n3. List files",
    );
    expect(out.source).toBe("splitter");
    expect(out.modules.map((m) => m.canonical)).toEqual([
      "run lint check on <param>",
    ]);
  });
});
