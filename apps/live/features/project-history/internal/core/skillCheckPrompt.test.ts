import { describe, expect, it } from "vitest";

import type { DueSkillCheck } from "./skillCheck.types";
import { judgeSkillCheck } from "./judgeDueSkillChecks";
import {
  buildSkillCheckPrompt,
  parseSkillCheckVerdict,
} from "./skillCheckPrompt";

const check: DueSkillCheck = {
  checkId: 7,
  skillId: "deploy",
  skillName: "Deploy",
  skillVersion: 2,
  usesAtCheck: 3,
  trigger: "checkpoint",
  skillBody: "# Deploy\n## Steps\n1. Run build",
  runs: [
    {
      outcome: "failed",
      title: "Deploy api",
      description: null,
      resultSummary: "migration missing",
    },
  ],
};

describe("parseSkillCheckVerdict", () => {
  it("reads fine and improve, tolerating text around the JSON", () => {
    expect(
      parseSkillCheckVerdict(
        'Sure: {"verdict":"improve","note":"add migrate"}',
      ),
    ).toEqual({ verdict: "improve", note: "add migrate" });
    expect(
      parseSkillCheckVerdict('{"verdict":"fine","note":"held up"}')?.verdict,
    ).toBe("fine");
  });

  it("rejects an unknown verdict, an empty note and non-JSON", () => {
    expect(parseSkillCheckVerdict('{"verdict":"maybe","note":"x"}')).toBeNull();
    expect(parseSkillCheckVerdict('{"verdict":"fine","note":" "}')).toBeNull();
    expect(parseSkillCheckVerdict("no json")).toBeNull();
  });
});

describe("buildSkillCheckPrompt", () => {
  it("carries the skill text and the runs", () => {
    const prompt = buildSkillCheckPrompt(check);
    expect(prompt).toContain("Run build");
    expect(prompt).toContain("migration missing");
  });
});

describe("buildSkillCheckPrompt declined changes", () => {
  it("lists changes the owner declined, and nothing when there are none", () => {
    expect(buildSkillCheckPrompt(check)).not.toContain("declined");
    const prompt = buildSkillCheckPrompt({
      ...check,
      declinedNotes: ["add a migrate step"],
    });
    expect(prompt).toContain("do not propose them again");
    expect(prompt).toContain("add a migrate step");
  });
});

describe("judgeSkillCheck", () => {
  it("returns fine without writing a new version", async () => {
    const calls: string[] = [];
    const result = await judgeSkillCheck(check, async ({ prompt }) => {
      calls.push(prompt);
      return { ok: true, text: '{"verdict":"fine","note":"ok"}' };
    });
    expect(result).toEqual({ checkId: 7, verdict: "fine", note: "ok" });
    expect(calls).toHaveLength(1);
  });

  it("asks for an improved skill when the verdict is improve", async () => {
    let step = 0;
    const result = await judgeSkillCheck(check, async () => {
      step += 1;
      return step === 1
        ? { ok: true, text: '{"verdict":"improve","note":"add migrate"}' }
        : {
            ok: true,
            text: "```markdown\n# Deploy\n## Steps\n1. Migrate\n```",
          };
    });
    expect(result?.verdict).toBe("improve");
    expect(result?.proposedBody).toContain("Migrate");
  });

  it("gives up (stays due) when the judge fails or the rewrite is unusable", async () => {
    expect(
      await judgeSkillCheck(check, async () => ({ ok: false, reason: "x" })),
    ).toBeNull();
    let step = 0;
    expect(
      await judgeSkillCheck(check, async () => {
        step += 1;
        return step === 1
          ? { ok: true, text: '{"verdict":"improve","note":"n"}' }
          : { ok: true, text: "nothing useful" };
      }),
    ).toBeNull();
  });
});
