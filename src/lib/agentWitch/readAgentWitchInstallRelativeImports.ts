import path from "node:path";

export const readAgentWitchInstallRelativeImports = (
  source: string,
  scriptName?: string,
): readonly string[] => {
  const imports = new Set<string>();
  const scriptDir =
    scriptName !== undefined && scriptName.length > 0
      ? path.posix.dirname(scriptName)
      : "";

  for (const match of source.matchAll(
    /(?:from\s*|import\s*\(\s*)["']\.\/([^"']+)["']/g,
  )) {
    const importPath = match[1];
    if (importPath === undefined) {
      continue;
    }

    const normalized = importPath.endsWith(".ts")
      ? importPath
      : `${importPath}.ts`;
    const resolved =
      scriptDir.length > 0
        ? path.posix.join(scriptDir, normalized)
        : normalized;
    imports.add(resolved);
  }

  return [...imports];
};
