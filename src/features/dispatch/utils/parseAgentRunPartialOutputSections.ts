export type AgentRunPartialOutputTable = {
  readonly headers: readonly string[];
  readonly rows: readonly (readonly string[])[];
};

export type AgentRunPartialOutputSection =
  | { readonly kind: "paragraph"; readonly text: string }
  | { readonly kind: "bullet-list"; readonly items: readonly string[] }
  | { readonly kind: "table"; readonly table: AgentRunPartialOutputTable }
  | { readonly kind: "callout"; readonly text: string };

const isMarkdownTableRow = (line: string): boolean => {
  const trimmed = line.trim();
  return (
    trimmed.startsWith("|") && trimmed.endsWith("|") && trimmed.includes("|")
  );
};

const isTableSeparatorRow = (line: string): boolean =>
  /^\|[\s\-:|]+\|$/.test(line.trim());

const parseMarkdownTableRow = (line: string): readonly string[] =>
  line
    .trim()
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());

const parseMarkdownTableBlock = (
  lines: readonly string[],
): AgentRunPartialOutputTable | null => {
  const tableLines = lines.filter(isMarkdownTableRow);
  if (tableLines.length < 2) {
    return null;
  }

  const headers = parseMarkdownTableRow(tableLines[0] ?? "");
  const bodyStartIndex =
    tableLines.length > 1 && isTableSeparatorRow(tableLines[1] ?? "") ? 2 : 1;
  const rows = tableLines
    .slice(bodyStartIndex)
    .map(parseMarkdownTableRow)
    .filter((row) => row.some((cell) => cell.length > 0));

  if (headers.length === 0 || rows.length === 0) {
    return null;
  }

  return { headers, rows };
};

const isBulletLine = (line: string): boolean =>
  /^[-*•]\s+/.test(line.trim()) || /^\d+\.\s+/.test(line.trim());

const stripBulletPrefix = (line: string): string =>
  line
    .trim()
    .replace(/^[-*•]\s+/, "")
    .replace(/^\d+\.\s+/, "");

const isBranchStatusLine = (text: string): boolean =>
  /commits?\s+behind/i.test(text) || /behind\s+origin\//i.test(text);

const parseBlock = (block: string): readonly AgentRunPartialOutputSection[] => {
  const lines = block.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) {
    return [];
  }

  const table = parseMarkdownTableBlock(lines);
  if (table !== null) {
    return [{ kind: "table", table }];
  }

  if (lines.every(isBulletLine)) {
    return [
      {
        kind: "bullet-list",
        items: lines.map(stripBulletPrefix),
      },
    ];
  }

  return lines.map((line) => {
    const text = line.trim();
    if (isBranchStatusLine(text)) {
      return { kind: "callout" as const, text };
    }
    return { kind: "paragraph" as const, text };
  });
};

export const parseAgentRunPartialOutputSections = (
  text: string,
): readonly AgentRunPartialOutputSection[] => {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return [];
  }

  return trimmed.split(/\n{2,}/).flatMap(parseBlock);
};
