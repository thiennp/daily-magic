export const readAgentWitchInstallRelativeImports = (
  source: string,
): readonly string[] => {
  const imports = new Set<string>();

  for (const match of source.matchAll(
    /(?:from\s*|import\s*\(\s*)["']\.\/([^"']+)["']/g,
  )) {
    const importPath = match[1];
    if (importPath === undefined) {
      continue;
    }

    imports.add(importPath.endsWith(".ts") ? importPath : `${importPath}.ts`);
  }

  return [...imports];
};
