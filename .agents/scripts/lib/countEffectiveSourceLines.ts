const IMPORT_START_PATTERN = /^\s*import\b/;

const isBlankLine = (line: string): boolean => line.trim() === "";

const importStatementCompletesOnLine = (line: string): boolean =>
  /;\s*(?:\/\/.*)?$/.test(line.trimEnd());

export const countEffectiveSourceLines = (content: string): number => {
  const lines = content.split("\n");
  let inImportStatement = false;
  let effectiveLineCount = 0;

  lines.forEach((line) => {
    if (isBlankLine(line)) {
      return;
    }

    if (inImportStatement) {
      if (importStatementCompletesOnLine(line)) {
        inImportStatement = false;
      }
      return;
    }

    if (IMPORT_START_PATTERN.test(line)) {
      if (!importStatementCompletesOnLine(line)) {
        inImportStatement = true;
      }
      return;
    }

    effectiveLineCount += 1;
  });

  return effectiveLineCount;
};
