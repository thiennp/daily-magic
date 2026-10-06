import { describe, expect, it } from "vitest";

import { formatAccessLogEvent } from "@/features/projects/accessLog/formatAccessLogEvent";
import type { ProjectActivityLogEvent } from "@/features/projects/activityLog/projectAccessLog.type";

const event = (
  type: "rule.dropped" | "rule.restored",
  detail: ProjectActivityLogEvent["detail"],
): ProjectActivityLogEvent => ({
  id: "e1",
  type,
  category: "safety",
  at: "2026-10-06T13:00:00.000Z",
  actor: { kind: "owner", userId: "u1", displayName: null },
  target: null,
  detail,
});

describe("formatAccessLogEvent rule.*", () => {
  it("names the safety rule by its title (lowercase noun, trailing period)", () => {
    expect(
      formatAccessLogEvent(event("rule.dropped", { ruleId: "a", label: "Secrets in logs" })),
    ).toEqual({
      line: 'You dropped the safety rule "Secrets in logs".',
      detail: null,
    });
    expect(
      formatAccessLogEvent(event("rule.restored", { ruleId: "a", label: "Secrets in logs" }))
        ?.line,
    ).toBe('You restored the safety rule "Secrets in logs".');
  });

  it("falls back when the label is missing or looks like an email", () => {
    expect(formatAccessLogEvent(event("rule.dropped", { ruleId: "a" }))?.line).toBe(
      "You dropped a safety rule.",
    );
    expect(formatAccessLogEvent(event("rule.restored", {}))?.line).toBe(
      "You restored a safety rule.",
    );
    expect(
      formatAccessLogEvent(event("rule.dropped", { ruleId: "a", label: "bot@example.com" }))
        ?.line,
    ).toBe("You dropped a safety rule.");
    expect(
      formatAccessLogEvent(event("rule.restored", { label: "x@y" }))?.line,
    ).toBe("You restored a safety rule.");
  });
});
