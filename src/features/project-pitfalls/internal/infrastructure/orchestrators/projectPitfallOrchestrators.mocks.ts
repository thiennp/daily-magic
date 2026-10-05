import { vi } from "vitest";

import { pitfallRecordFixture as rec } from "@/features/project-pitfalls/internal/core/projectPitfall.fixtures";
import { resolveProjectPitfallAccess } from "@/features/project-pitfalls/internal/infrastructure/db/resolveProjectPitfallAccess";
import { selectProjectPitfallParts } from "@/features/project-pitfalls/internal/infrastructure/db/selectProjectPitfallParts";

/** Call vi.mock for the db modules in the test file, then use these helpers. */
export const SEED_ROWS = [
  rec({ id: "arch-max-lines", severity: "block" }),
  rec({ id: "stale-next" }),
];

export const givenMember = (): void => {
  vi.mocked(resolveProjectPitfallAccess).mockResolvedValue({
    ok: true,
    role: "member",
  });
};

export const givenOutsider = (): void => {
  vi.mocked(resolveProjectPitfallAccess).mockResolvedValue({
    ok: false,
    code: "forbidden",
  });
};

export const givenParts = (
  projectRows: ReturnType<typeof rec>[] = [],
  seeds: ReturnType<typeof rec>[] = SEED_ROWS,
): void => {
  vi.mocked(selectProjectPitfallParts).mockResolvedValue({
    seeds,
    projectRows,
    hits: [{ pitfallId: "stale-next", hitCount: 2, lastSeenAt: null }],
  });
};
