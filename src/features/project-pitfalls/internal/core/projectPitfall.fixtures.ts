import type {
  ProjectPitfallRecord,
  ProjectPitfallView,
} from "@/features/project-pitfalls/internal/core/projectPitfall.type";

export const pitfallRecordFixture = (
  overrides: Partial<ProjectPitfallRecord> = {},
): ProjectPitfallRecord => ({
  id: "arch-max-lines",
  projectId: null,
  symptom: "Seed symptom",
  cause: "Seed cause",
  avoidance: "Seed avoidance",
  check: { kind: "id", value: "pit.example" },
  keywords: ["arch"],
  tags: [],
  source: "seed",
  severity: "warn",
  updatedAt: "2026-10-05T10:00:00.000Z",
  ...overrides,
});

export const pitfallViewFixture = (
  overrides: Partial<ProjectPitfallView> = {},
): ProjectPitfallView => ({
  ...pitfallRecordFixture(),
  overridesSeed: false,
  hitCount: 0,
  lastSeenAt: null,
  ...overrides,
});

export const validUpsertBodyFixture = (
  overrides: Record<string, unknown> = {},
): Record<string, unknown> => ({
  id: "my-pitfall",
  symptom: "Something breaks",
  cause: "Because of a reason",
  avoidance: "Do the safe thing first",
  check: { kind: "command", value: "npm test" },
  keywords: ["Build", "build", "next"],
  ...overrides,
});
