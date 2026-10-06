import fs from "node:fs";
import path from "node:path";

const HISTORY_FILE_NAME = "estimate-history.ndjson";
const PROMPT_HISTORY_LIMIT = 100;
const MAX_TASK_CHARS = 500;
const MAX_HISTORY_TEXT_CHARS = 20_000;

export interface AgentRunEstimateHistoryRow {
  readonly id: string;
  readonly task: string;
  readonly writerLabel: string;
  readonly estimateSeconds: number | null;
  readonly actualSeconds: number | null;
  readonly estimateTokens: number | null;
  readonly actualTokens: number | null;
  readonly input: string;
  readonly output: string;
  readonly startedAt: string;
  readonly completedAt: string | null;
  readonly embedding: readonly number[];
}

const historyPath = (reportsDir: string): string =>
  path.join(reportsDir, HISTORY_FILE_NAME);

const redactTask = (task: string): string =>
  task
    .replace(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      "[redacted-email]",
    )
    .replace(/\bsk-[a-zA-Z0-9]{20,}\b/g, "[redacted-secret]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_TASK_CHARS);

const redactHistoryText = (value: string): string =>
  value
    .replace(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      "[redacted-email]",
    )
    .replace(/\bsk-[a-zA-Z0-9]{20,}\b/g, "[redacted-secret]")
    .trim()
    .slice(0, MAX_HISTORY_TEXT_CHARS);

const readStoredTokens = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) && value >= 1
    ? Math.round(value)
    : null;

const normalizeRow = (
  row: AgentRunEstimateHistoryRow,
): AgentRunEstimateHistoryRow => ({
  ...row,
  estimateTokens: readStoredTokens(row.estimateTokens),
  actualTokens: readStoredTokens(row.actualTokens),
  input: typeof row.input === "string" ? row.input : "",
  output: typeof row.output === "string" ? row.output : "",
});

const isRow = (value: unknown): value is AgentRunEstimateHistoryRow => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const row = value as AgentRunEstimateHistoryRow;
  return (
    typeof row.id === "string" &&
    typeof row.task === "string" &&
    typeof row.writerLabel === "string" &&
    Array.isArray(row.embedding)
  );
};

const readRows = (reportsDir: string): AgentRunEstimateHistoryRow[] => {
  const filePath = historyPath(reportsDir);
  if (!fs.existsSync(filePath)) {
    return [];
  }

  return fs
    .readFileSync(filePath, "utf8")
    .split("\n")
    .flatMap((line) => {
      const trimmed = line.trim();
      if (trimmed.length === 0) {
        return [];
      }
      try {
        const parsed: unknown = JSON.parse(trimmed);
        return isRow(parsed) ? [normalizeRow(parsed)] : [];
      } catch {
        return [];
      }
    });
};

const writeRows = (
  reportsDir: string,
  rows: readonly AgentRunEstimateHistoryRow[],
): void => {
  fs.mkdirSync(reportsDir, { recursive: true });
  const body =
    rows.length === 0
      ? ""
      : `${rows.map((row) => JSON.stringify(row)).join("\n")}\n`;
  fs.writeFileSync(historyPath(reportsDir), body, "utf8");
};

const tableCell = (value: string): string =>
  value.replace(/\|/g, "/").replace(/\s+/g, " ").slice(0, 80);

export const formatAgentRunEstimateHistoryTable = (
  rows: readonly AgentRunEstimateHistoryRow[],
): string => {
  const finished = rows.filter(
    (row) =>
      row.actualSeconds !== null &&
      row.estimateSeconds !== null &&
      row.task.length > 0,
  );
  if (finished.length === 0) {
    return "No finished tasks with a recorded duration yet.";
  }

  const lines = [
    "Latest finished tasks on this computer. Use estimated vs actual seconds to calibrate:",
    "| Task | Writer | Estimated seconds | Actual seconds |",
    "| --- | --- | --- | --- |",
    ...finished.map(
      (row) =>
        `| ${tableCell(row.task)} | ${tableCell(row.writerLabel)} | ${row.estimateSeconds} | ${row.actualSeconds} |`,
    ),
  ];
  return lines.join("\n");
};

export const rememberAgentRunEstimate = (input: {
  readonly reportsDir: string;
  readonly agentRunId: string;
  readonly task: string;
  readonly writerLabel: string;
  readonly estimateSeconds: number;
  readonly embedding: readonly number[] | null;
}): void => {
  const rows = readRows(input.reportsDir);
  const task = redactTask(input.task);
  const existing = rows.find((row) => row.id === input.agentRunId);
  const next: AgentRunEstimateHistoryRow = {
    id: input.agentRunId,
    task: task.length > 0 ? task : (existing?.task ?? ""),
    writerLabel: input.writerLabel,
    estimateSeconds: input.estimateSeconds,
    actualSeconds: existing?.actualSeconds ?? null,
    estimateTokens: existing?.estimateTokens ?? null,
    actualTokens: existing?.actualTokens ?? null,
    input: existing?.input ?? "",
    output: existing?.output ?? "",
    startedAt: existing?.startedAt ?? new Date().toISOString(),
    completedAt: existing?.completedAt ?? null,
    embedding:
      input.embedding !== null && input.embedding.length > 0
        ? input.embedding
        : (existing?.embedding ?? []),
  };
  const without = rows.filter((row) => row.id !== input.agentRunId);
  writeRows(input.reportsDir, [...without, next]);
};

export const recordAgentRunEstimateActual = (input: {
  readonly reportsDir: string;
  readonly agentRunId: string;
  readonly actualSeconds: number;
  readonly task?: string;
  readonly writerLabel?: string;
}): void => {
  const rows = readRows(input.reportsDir);
  const existing = rows.find((row) => row.id === input.agentRunId);
  const completedAt = new Date().toISOString();
  const providedTask = input.task !== undefined ? redactTask(input.task) : "";
  const next: AgentRunEstimateHistoryRow = {
    id: input.agentRunId,
    task: providedTask.length > 0 ? providedTask : (existing?.task ?? ""),
    writerLabel: input.writerLabel ?? existing?.writerLabel ?? "",
    estimateSeconds: existing?.estimateSeconds ?? null,
    actualSeconds: input.actualSeconds,
    estimateTokens: existing?.estimateTokens ?? null,
    actualTokens: existing?.actualTokens ?? null,
    input: existing?.input ?? "",
    output: existing?.output ?? "",
    startedAt: existing?.startedAt ?? completedAt,
    completedAt,
    embedding: existing?.embedding ?? [],
  };
  const without = rows.filter((row) => row.id !== input.agentRunId);
  writeRows(input.reportsDir, [...without, next]);
};

const latestFinishedRows = (
  rows: readonly AgentRunEstimateHistoryRow[],
): AgentRunEstimateHistoryRow[] =>
  rows
    .filter((row) => row.actualSeconds !== null && row.estimateSeconds !== null)
    .slice(-PROMPT_HISTORY_LIMIT);

export const listAgentRunEstimateHistoryForDisplay = (
  reportsDir: string,
): readonly AgentRunEstimateHistoryRow[] =>
  [...readRows(reportsDir)]
    .filter(
      (row) =>
        row.task.trim().length > 0 ||
        row.input.trim().length > 0 ||
        row.output.trim().length > 0,
    )
    .reverse();

export const recordAgentRunPromptExchange = (input: {
  readonly reportsDir: string;
  readonly agentRunId: string;
  readonly input: string;
  readonly output: string;
  readonly writerLabel?: string;
}): void => {
  const rows = readRows(input.reportsDir);
  const existing = rows.find((row) => row.id === input.agentRunId);
  const promptInput = redactHistoryText(input.input);
  const promptOutput = redactHistoryText(input.output);
  const task = redactTask(promptInput);
  const writerLabel = input.writerLabel?.trim() ?? "";
  const next: AgentRunEstimateHistoryRow = {
    id: input.agentRunId,
    task: task.length > 0 ? task : (existing?.task ?? ""),
    writerLabel:
      writerLabel.length > 0 ? writerLabel : (existing?.writerLabel ?? ""),
    estimateSeconds: existing?.estimateSeconds ?? null,
    actualSeconds: existing?.actualSeconds ?? null,
    estimateTokens: existing?.estimateTokens ?? null,
    actualTokens: existing?.actualTokens ?? null,
    input: promptInput.length > 0 ? promptInput : (existing?.input ?? ""),
    output: promptOutput.length > 0 ? promptOutput : (existing?.output ?? ""),
    startedAt: existing?.startedAt ?? new Date().toISOString(),
    completedAt: existing?.completedAt ?? new Date().toISOString(),
    embedding: existing?.embedding ?? [],
  };
  const without = rows.filter((row) => row.id !== input.agentRunId);
  writeRows(input.reportsDir, [...without, next]);
};

export const readAgentRunEstimateComparison = (
  reportsDir: string,
  agentRunId: string,
): {
  readonly estimateSeconds: number | null;
  readonly actualSeconds: number | null;
} | null => {
  const row = readRows(reportsDir).find((item) => item.id === agentRunId);
  if (row === undefined) {
    return null;
  }

  return {
    estimateSeconds: row.estimateSeconds,
    actualSeconds: row.actualSeconds,
  };
};

export const queryAgentRunEstimateHistoryForPrompt = (
  reportsDir: string,
): {
  readonly table: string;
  readonly embedding: null;
} => ({
  table: formatAgentRunEstimateHistoryTable(
    latestFinishedRows(readRows(reportsDir)),
  ),
  embedding: null,
});

const withoutTokenSpikes = (
  rows: readonly AgentRunEstimateHistoryRow[],
): AgentRunEstimateHistoryRow[] => {
  const byWriter = new Map<string, number[]>();
  for (const row of rows) {
    if (row.actualTokens === null) {
      continue;
    }
    const writer = row.writerLabel.trim() || "Writer";
    const totals = byWriter.get(writer) ?? [];
    totals.push(row.actualTokens);
    byWriter.set(writer, totals);
  }
  const spikes = new Set<string>();
  for (const [writer, totals] of byWriter) {
    const sorted = [...totals].sort((left, right) => left - right);
    const top = sorted[sorted.length - 1];
    const next = sorted[sorted.length - 2];
    if (
      sorted.length >= 3 &&
      top !== undefined &&
      next !== undefined &&
      top > next * 1.5
    ) {
      spikes.add(`${writer}:${top}`);
    }
  }
  return rows.filter((row) => {
    const writer = row.writerLabel.trim() || "Writer";
    return !spikes.has(`${writer}:${row.actualTokens}`);
  });
};

const latestFinishedTokenRows = (
  rows: readonly AgentRunEstimateHistoryRow[],
): AgentRunEstimateHistoryRow[] =>
  rows
    .filter(
      (row) =>
        row.estimateTokens !== null &&
        row.actualTokens !== null &&
        row.task.length > 0,
    )
    .slice(-PROMPT_HISTORY_LIMIT);

export const formatAgentRunTokenEstimateHistoryTable = (
  rows: readonly AgentRunEstimateHistoryRow[],
): string => {
  const finished = withoutTokenSpikes(latestFinishedTokenRows(rows));
  if (finished.length === 0) {
    return "No finished tasks with a recorded token count yet.";
  }

  const actualsByWriter = new Map<string, number[]>();
  for (const row of finished) {
    if (row.actualTokens === null) {
      continue;
    }
    const writer = row.writerLabel.trim() || "Writer";
    const totals = actualsByWriter.get(writer) ?? [];
    totals.push(row.actualTokens);
    actualsByWriter.set(writer, totals);
  }
  const ranges = [...actualsByWriter.entries()].map(([writer, totals]) => {
    const low = Math.min(...totals);
    const high = Math.max(...totals);
    return low === high
      ? `${writer} actuals are ${low}`
      : `${writer} actuals are ${low}–${high}`;
  });
  const lines = [
    "Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",
    ranges.join(". ") + (ranges.length > 0 ? "." : ""),
    "| Task | Writer | Task chars | Actual tokens |",
    "| --- | --- | --- | --- |",
    ...finished.map((row) => {
      const taskChars =
        row.input.length > 0 ? row.input.length : row.task.length;
      return `| ${tableCell(row.task)} | ${tableCell(row.writerLabel)} | ${taskChars} | ${row.actualTokens} |`;
    }),
  ];
  return lines.join("\n");
};

export const rememberAgentRunTokenEstimate = (input: {
  readonly reportsDir: string;
  readonly agentRunId: string;
  readonly task: string;
  readonly writerLabel: string;
  readonly estimateTokens: number;
}): void => {
  const rows = readRows(input.reportsDir);
  const task = redactTask(input.task);
  const existing = rows.find((row) => row.id === input.agentRunId);
  const next: AgentRunEstimateHistoryRow = {
    id: input.agentRunId,
    task: task.length > 0 ? task : (existing?.task ?? ""),
    writerLabel:
      input.writerLabel.length > 0
        ? input.writerLabel
        : (existing?.writerLabel ?? ""),
    estimateSeconds: existing?.estimateSeconds ?? null,
    actualSeconds: existing?.actualSeconds ?? null,
    estimateTokens: input.estimateTokens,
    actualTokens: existing?.actualTokens ?? null,
    input: existing?.input ?? "",
    output: existing?.output ?? "",
    startedAt: existing?.startedAt ?? new Date().toISOString(),
    completedAt: existing?.completedAt ?? null,
    embedding: existing?.embedding ?? [],
  };
  const without = rows.filter((row) => row.id !== input.agentRunId);
  writeRows(input.reportsDir, [...without, next]);
};

export const recordAgentRunTokenEstimateActual = (input: {
  readonly reportsDir: string;
  readonly agentRunId: string;
  readonly actualTokens: number;
}): void => {
  const rows = readRows(input.reportsDir);
  const existing = rows.find((row) => row.id === input.agentRunId);
  const completedAt = new Date().toISOString();
  const next: AgentRunEstimateHistoryRow = {
    id: input.agentRunId,
    task: existing?.task ?? "",
    writerLabel: existing?.writerLabel ?? "",
    estimateSeconds: existing?.estimateSeconds ?? null,
    actualSeconds: existing?.actualSeconds ?? null,
    estimateTokens: existing?.estimateTokens ?? null,
    actualTokens: input.actualTokens,
    input: existing?.input ?? "",
    output: existing?.output ?? "",
    startedAt: existing?.startedAt ?? completedAt,
    completedAt: existing?.completedAt ?? completedAt,
    embedding: existing?.embedding ?? [],
  };
  const without = rows.filter((row) => row.id !== input.agentRunId);
  writeRows(input.reportsDir, [...without, next]);
};

export const queryAgentRunTokenEstimateHistoryForPrompt = (
  reportsDir: string,
): string => formatAgentRunTokenEstimateHistoryTable(readRows(reportsDir));
