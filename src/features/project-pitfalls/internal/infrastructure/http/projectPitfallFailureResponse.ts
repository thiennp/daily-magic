import { mapProjectPitfallErrorStatus } from "@/features/project-pitfalls/internal/core/mapProjectPitfallErrorStatus";
import type { ProjectPitfallFailure } from "@/features/project-pitfalls/internal/core/projectPitfall.type";

/** JSON error shape shared by the pitfall routes (errorMessage = code). */
export const projectPitfallFailureResponse = (
  failure: ProjectPitfallFailure,
): Response =>
  Response.json(
    {
      ok: false,
      errorMessage: failure.code,
      ...(failure.field !== undefined ? { field: failure.field } : {}),
    },
    { status: mapProjectPitfallErrorStatus(failure.code) },
  );
