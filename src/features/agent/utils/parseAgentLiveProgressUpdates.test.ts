import { describe, expect, it } from "vitest";

import { parseAgentLiveProgressUpdates } from "@/features/agent/utils/parseAgentLiveProgressUpdates";

describe("parseAgentLiveProgressUpdates", () => {
  it("returns empty when no progress markers exist", () => {
    expect(parseAgentLiveProgressUpdates("Just working")).toEqual([]);
  });

  it("parses title and detail lines from each progress block", () => {
    const output = [
      "Starting",
      "[[PROGRESS]]",
      "Reading portfolio files",
      "Opened brief.md",
      "Noted budget of 5800 EUR",
      "",
      "Continuing",
      "[[PROGRESS]]",
      "Drafting proposal",
      "Writing intro for Nordlicht",
      "",
      "Here is the proposal.",
    ].join("\n");

    expect(parseAgentLiveProgressUpdates(output)).toEqual([
      {
        title: "Reading portfolio files",
        detail: "Opened brief.md\nNoted budget of 5800 EUR",
      },
      {
        title: "Drafting proposal",
        detail: "Writing intro for Nordlicht",
      },
    ]);
  });

  it("caps detail at three lines", () => {
    const output = [
      "[[PROGRESS]]",
      "Deep dive",
      "line one",
      "line two",
      "line three",
      "line four should stay outside",
    ].join("\n");

    expect(parseAgentLiveProgressUpdates(output)).toEqual([
      {
        title: "Deep dive",
        detail: "line one\nline two\nline three",
      },
    ]);
  });
});
