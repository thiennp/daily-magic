import { describe, expect, it } from "vitest";

import { selectAutoSkillJudge } from "./autoSkillSelectJudge";

const none = { ollamaModel: null, agentWriter: null, botName: null };

describe("selectAutoSkillJudge", () => {
  it("prefers the owner agent, then Ollama, then the bot", () => {
    const all = {
      ollamaModel: "mistral:7b",
      agentWriter: "codex",
      botName: "Ada",
    };
    expect(selectAutoSkillJudge("auto", all)).toMatchObject({
      kind: "agent",
      label: "your computer agent: Codex",
    });
    expect(
      selectAutoSkillJudge("auto", { ...all, agentWriter: null }),
    ).toMatchObject({ kind: "ollama" });
    expect(
      selectAutoSkillJudge("auto", { ...none, botName: "Ada" }),
    ).toMatchObject({ kind: "bot", label: "bot Ada" });
  });

  it("honours the owner override when available", () => {
    const all = {
      ollamaModel: "mistral:7b",
      agentWriter: "codex",
      botName: null,
    };
    expect(selectAutoSkillJudge("agent", all)).toMatchObject({
      kind: "agent",
      note: null,
    });
  });

  it("falls back down the list and explains why", () => {
    const choice = selectAutoSkillJudge("bot", {
      ...none,
      ollamaModel: "mistral:7b",
    });
    expect(choice).toMatchObject({ ok: true, kind: "ollama" });
    expect(choice.ok && choice.note).toContain(
      "Project bot judging is not available yet",
    );
  });

  it("returns a clear paused reason when nothing is available", () => {
    const choice = selectAutoSkillJudge("auto", none);
    expect(choice.ok).toBe(false);
    expect(!choice.ok && choice.pausedReason).toContain("Auto skills paused");
    expect(!choice.ok && choice.pausedReason).toContain("signed in");
  });
});
