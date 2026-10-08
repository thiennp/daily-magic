import { describe, expect, it } from "vitest";

import { resolveTaskResultBlock } from "@/features/projects/tasks/utils/resolveTaskResultBlock";

const KILLED =
  "The agent process was stopped unexpectedly (killed by SIGKILL).";

/** 73181622 (B1 69e669e2): "Why it failed" listed the SIGKILL line twice. */
describe("resolveTaskResultBlock dedupe", () => {
  it("shows the reason once", () => {
    const result = resolveTaskResultBlock({
      status: "failed",
      resultOutput: `Preparing Antigravity for this session…\n${KILLED}\n${KILLED}`,
      writerAgent: "antigravity",
    });
    const text = [result?.hint ?? "", result?.body ?? ""].join("\n");

    expect(text.split(KILLED).length - 1).toBe(1);
  });
});
