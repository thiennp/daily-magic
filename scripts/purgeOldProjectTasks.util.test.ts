import { describe, expect, it } from "vitest";

import { parsePurgeArgs, purgeStatuses } from "./purgeOldProjectTasks.util";

const NOW = new Date("2026-10-10T12:00:00Z");

describe("parsePurgeArgs", () => {
  it("requires a real, non-future --before date", () => {
    expect(parsePurgeArgs([], NOW)).toHaveProperty("error");
    expect(parsePurgeArgs(["--before", "nope"], NOW)).toHaveProperty("error");
    expect(parsePurgeArgs(["--before", "2027-01-01"], NOW)).toHaveProperty(
      "error",
    );
  });

  it("is a dry run, done+cancelled only, unless told otherwise", () => {
    const dry = parsePurgeArgs(["--before", "2026-10-01"], NOW);
    expect(dry).toMatchObject({
      confirm: false,
      includeOpen: false,
      projectId: null,
    });
    const live = parsePurgeArgs(
      [
        "--before",
        "2026-10-01",
        "--project",
        "p1",
        "--include-open",
        "--confirm",
      ],
      NOW,
    );
    expect(live).toMatchObject({
      confirm: true,
      includeOpen: true,
      projectId: "p1",
    });
    expect(purgeStatuses(false)).toEqual(["done", "cancelled"]);
    expect(purgeStatuses(true)).toHaveLength(6);
  });
});
