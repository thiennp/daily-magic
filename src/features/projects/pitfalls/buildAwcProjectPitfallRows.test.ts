import { describe, expect, it } from "vitest";

import buildAwcProjectPitfallRows from "@/features/projects/pitfalls/buildAwcProjectPitfallRows";
import type { ProjectPitfallView } from "@agent-witch/shared/pitfalls";

const nowMs = Date.parse("2026-10-05T12:00:00.000Z");

const pitfall = (
  overrides: Partial<ProjectPitfallView> &
    Pick<ProjectPitfallView, "id" | "symptom">,
): ProjectPitfallView => ({
  projectId: "proj-1",
  cause: "Because of a reason.",
  avoidance: "Do the safe thing.",
  check: { kind: "id", value: overrides.id },
  keywords: [],
  tags: [],
  source: "project",
  overridesSeed: false,
  hitCount: 0,
  lastSeenAt: null,
  updatedAt: "2026-10-05T09:00:00.000Z",
  severity: "warn",
  ...overrides,
});

describe("buildAwcProjectPitfallRows", () => {
  it("hides retired and sorts by severity then last hit", () => {
    const rows = buildAwcProjectPitfallRows(
      [
        pitfall({
          id: "info-old",
          symptom: "Info old",
          severity: "info",
          lastSeenAt: "2026-10-05T11:00:00.000Z",
        }),
        pitfall({
          id: "block-newer",
          symptom: "Block newer",
          severity: "block",
          lastSeenAt: "2026-10-05T11:30:00.000Z",
          keywords: ["crash"],
          source: "seed",
          projectId: null,
        }),
        pitfall({
          id: "block-older",
          symptom: "Block older",
          severity: "block",
          lastSeenAt: "2026-10-05T10:00:00.000Z",
        }),
        pitfall({ id: "retired", symptom: "Retired", source: "retired" }),
      ],
      nowMs,
    );

    expect(rows.map((row) => row.id)).toEqual([
      "block-newer",
      "block-older",
      "info-old",
    ]);
    expect(rows[0]).toMatchObject({
      title: "Block newer",
      fix: "Do the safe thing.",
      triggers: ["crash"],
      severityLabel: "Must fix",
      sourceLabel: "Built-in",
      lastHitLabel: "Last hit 30 mins ago",
      updatedLabel: "Updated 2026-10-05",
    });
    expect(rows[2]?.lastHitLabel).toBe("Last hit 1h ago");
  });

  it("labels never-hit when lastSeenAt is missing", () => {
    expect(
      buildAwcProjectPitfallRows([pitfall({ id: "a", symptom: "A" })], nowMs)[0]
        ?.lastHitLabel,
    ).toBe("Never hit");
  });

  it('labels "Not updated yet" when updatedAt is null', () => {
    expect(
      buildAwcProjectPitfallRows(
        [pitfall({ id: "a", symptom: "A", updatedAt: null })],
        nowMs,
      )[0]?.updatedLabel,
    ).toBe("Not updated yet");
  });
});
