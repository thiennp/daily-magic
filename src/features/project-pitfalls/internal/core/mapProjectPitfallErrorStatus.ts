import type { ProjectPitfallErrorCode } from "@/features/project-pitfalls/internal/core/projectPitfall.type";

export const mapProjectPitfallErrorStatus = (
  code: ProjectPitfallErrorCode,
): number => {
  if (code === "forbidden") return 403;
  if (code === "not_found") return 404;
  if (code === "limit_exceeded") return 409;
  return 400;
};
