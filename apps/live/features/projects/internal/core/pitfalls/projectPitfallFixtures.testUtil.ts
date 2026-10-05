import type { AgentWitchProjectPitfall } from "./agentWitchProjectPitfall.type";

export const buildPitfallFixture = (
  overrides: Partial<AgentWitchProjectPitfall> = {},
): AgentWitchProjectPitfall => ({
  id: "seed-stale-lockfile",
  projectId: null,
  symptom: "Install fails after a branch switch",
  cause: "The lockfile is out of date.",
  avoidance: "Run a clean install before you start.",
  check: { kind: "command", value: "npm ci" },
  keywords: ["lockfile", "install"],
  tags: ["deps"],
  source: "seed",
  overridesSeed: false,
  hitCount: 2,
  lastSeenAt: "2026-10-05T10:00:00.000Z",
  updatedAt: "2026-10-05T09:00:00.000Z",
  severity: "warn",
  ...overrides,
});
