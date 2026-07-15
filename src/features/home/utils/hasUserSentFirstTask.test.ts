import { describe, expect, it } from "vitest";

import hasUserSentFirstTask from "@/features/home/utils/hasUserSentFirstTask";

describe("hasUserSentFirstTask", () => {
  it("returns true when api runs exist", () => {
    expect(hasUserSentFirstTask([{ id: "run-1" }], 0)).toBe(true);
  });

  it("returns true when local cache has runs", () => {
    expect(hasUserSentFirstTask([], 1)).toBe(true);
  });

  it("returns false when no runs are recorded", () => {
    expect(hasUserSentFirstTask([], 0)).toBe(false);
    expect(hasUserSentFirstTask(null, 0)).toBe(false);
  });
});
