import { describe, expect, it } from "vitest";

import {
  resolveAgentLiveProgressCleanedSource,
  resolveAgentLiveProgressUpdatesFromSources,
} from "@/features/agent/utils/resolveAgentLiveProgressUpdatesFromSources";

describe("resolveAgentLiveProgressUpdatesFromSources", () => {
  it("reads [[PROGRESS]] from partialOutput when live output has none", () => {
    const updates = resolveAgentLiveProgressUpdatesFromSources(
      "Agent paused.",
      [
        "[[PROGRESS]]",
        "Analyzing portfolio fit",
        "Alpine Outfitters and Strand & Stein match the brief.",
        "",
      ].join("\n"),
    );

    expect(updates).toEqual([
      {
        title: "Analyzing portfolio fit",
        detail: "Alpine Outfitters and Strand & Stein match the brief.",
      },
    ]);
  });

  it("prefers the source with more progress blocks", () => {
    const updates = resolveAgentLiveProgressUpdatesFromSources(
      ["[[PROGRESS]]", "First look", "Skimmed files", ""].join("\n"),
      [
        "[[PROGRESS]]",
        "First look",
        "Skimmed files",
        "",
        "[[PROGRESS]]",
        "Portfolio fit",
        "Two case studies match.",
        "",
      ].join("\n"),
    );

    expect(updates.map((update) => update.title)).toEqual([
      "First look",
      "Portfolio fit",
    ]);
  });
});

describe("resolveAgentLiveProgressCleanedSource", () => {
  it("uses the longer enclosing partial output when it contains live output", () => {
    expect(
      resolveAgentLiveProgressCleanedSource("short", "prefix\nshort\nsuffix"),
    ).toBe("prefix\nshort\nsuffix");
  });
});
