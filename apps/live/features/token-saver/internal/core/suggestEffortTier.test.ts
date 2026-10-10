import { describe, expect, it } from "vitest";

import { suggestEffortTier } from "./suggestEffortTier";

describe("suggestEffortTier", () => {
  it("uses no agent when a skill matches", async () => {
    expect(
      await suggestEffortTier({
        title: "x",
        hasSkill: true,
        chat: async () => null,
      }),
    ).toEqual({ tier: "script", source: "skill" });
  });

  it("takes Ollama's tier when it answers validly", async () => {
    const chat = async () => '{"tier":"high"}';
    expect(
      await suggestEffortTier({
        title: "rename a label",
        hasSkill: false,
        chat,
      }),
    ).toEqual({
      tier: "high",
      source: "ollama",
    });
  });

  it.each([null, "not json", '{"tier":"script"}', '{"tier":"ultra"}'])(
    "falls back to the title heuristic when Ollama gives %s",
    async (reply) => {
      const result = await suggestEffortTier({
        title: "rename a label",
        hasSkill: false,
        chat: async () => reply,
      });
      expect(result).toEqual({ tier: "low", source: "heuristic" });
    },
  );
});
