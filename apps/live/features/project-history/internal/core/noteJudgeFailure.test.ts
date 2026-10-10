import { describe, expect, it, vi } from "vitest";

import type { AutoSkillCompleter } from "./autoSkill.types";
import { noteJudgeFailure } from "./noteJudgeFailure";

describe("noteJudgeFailure", () => {
  it("reports the first failure of a run once, and returns the result unchanged", async () => {
    const report = vi.fn();
    const failing: AutoSkillCompleter = async () => ({
      ok: false as const,
      reason: "agent_exit_1: out of usage",
    });
    const wrapped = noteJudgeFailure(failing, report);
    const call = { prompt: "p", json: false, timeoutMs: 1 };
    expect(await wrapped(call)).toEqual({
      ok: false,
      reason: "agent_exit_1: out of usage",
    });
    await wrapped(call);
    expect(report).toHaveBeenCalledTimes(1);
    expect(report).toHaveBeenCalledWith("agent_exit_1: out of usage");
  });

  it("stays silent when the judge answers", async () => {
    const report = vi.fn();
    const ok: AutoSkillCompleter = async () => ({
      ok: true as const,
      text: "x",
    });
    await noteJudgeFailure(
      ok,
      report,
    )({ prompt: "p", json: false, timeoutMs: 1 });
    expect(report).not.toHaveBeenCalled();
  });
});
