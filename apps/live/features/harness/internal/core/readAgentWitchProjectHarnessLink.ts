import fs from "node:fs";

import { resolveAgentWitchProjectStorageLayout } from "../../../projects/internal/core/resolveAgentWitchProjectStorageLayout";

export const readAgentWitchProjectHarnessSetSlugs = (
  projectFolderPath: string,
): readonly string[] => {
  const layout = resolveAgentWitchProjectStorageLayout(projectFolderPath);
  if (!fs.existsSync(layout.metaFilePath)) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(layout.metaFilePath, "utf8"),
    );
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !Array.isArray((parsed as { harnessSetSlugs?: unknown }).harnessSetSlugs)
    ) {
      return [];
    }

    return (parsed as { harnessSetSlugs: unknown[] }).harnessSetSlugs.filter(
      (slug): slug is string => typeof slug === "string" && slug.length > 0,
    );
  } catch {
    return [];
  }
};
