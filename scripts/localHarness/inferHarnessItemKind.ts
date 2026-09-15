import type { HarnessInstallItemKind } from "../harnessInstallBundle.types";

export const inferHarnessItemKindFromRelativePath = (
  relativePath: string,
): HarnessInstallItemKind | null => {
  const normalized = relativePath.replaceAll("\\", "/");

  if (normalized.startsWith("rules/") && normalized.endsWith(".mdc")) {
    return "rule";
  }

  if (normalized.startsWith("commands/") && normalized.endsWith(".md")) {
    return "command";
  }

  if (normalized.startsWith("agents/") && normalized.endsWith(".md")) {
    return "agent";
  }

  if (normalized.startsWith("skills/") && normalized.endsWith("/SKILL.md")) {
    return "skill";
  }

  if (normalized.startsWith("instructions/") && normalized.endsWith(".md")) {
    return "instruction";
  }

  return null;
};
