import { describe, expect, it } from "vitest";

import { formatMessengerStateLabel } from "@/features/projects/messenger/utils/formatMessengerStateLabel";

describe("formatMessengerStateLabel", () => {
  it("uses plain words for waiting and no answer", () => {
    expect(formatMessengerStateLabel("waiting", "Planner bot")).toBe(
      "Waiting for Planner bot to confirm",
    );
    expect(formatMessengerStateLabel("no_answer", null)).toBe(
      "No answer — blocked",
    );
    expect(formatMessengerStateLabel("got_it", null)).toBe("Got it");
  });

  it("shows Checks on demand for poll-mode silence honesty", () => {
    expect(formatMessengerStateLabel("checks_on_demand", "Poll bot")).toBe(
      "Checks on demand",
    );
  });
});
