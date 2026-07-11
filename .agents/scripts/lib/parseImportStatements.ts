export interface ParsedImportStatement {
  readonly specifier: string;
  readonly line: number;
  readonly isTypeOnly: boolean;
}

const IMPORT_FROM_PATTERN =
  /^\s*import\s+(?:type\s+)?(?:[\w*{}\s,$]+from\s+)?['"]([^'"]+)['"]\s*;?\s*$/;

export const parseImportStatements = (
  content: string,
): readonly ParsedImportStatement[] => {
  const lines = content.split("\n");
  const imports: ParsedImportStatement[] = [];

  lines.forEach((line, index) => {
    const match = line.match(IMPORT_FROM_PATTERN);
    if (match !== null) {
      imports.push({
        specifier: match[1],
        line: index + 1,
        isTypeOnly: /^\s*import\s+type\s+/.test(line),
      });
    }
  });

  return imports;
};
