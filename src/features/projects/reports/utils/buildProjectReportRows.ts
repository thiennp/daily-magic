import { PROJECT_PAGE_REPORTS_COPY as C } from "@/features/projects/reports/projectPageReportsCopy.constant";
import {
  buildProjectReportExtras,
  type ProjectReportExtras,
} from "@/features/projects/reports/utils/buildProjectReportExtras";
import { fillProjectPageCopy } from "@/features/projects/utils/fillProjectPageCopy";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";
import { resolveAgentRunTitleSummary } from "@/lib/dispatch/resolveAgentRunTitleSummary";

const TITLE_MAX = 120;

export interface ProjectReportRow extends ProjectReportExtras {
  readonly id: string;
  readonly title: string;
  readonly from: string;
  readonly createdAt: string;
}

const firstLine = (value: string | null | undefined): string =>
  (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0) ?? "";

/** Report summary first line, else the ask; empty → detail heading fallback. */
export const resolveProjectReportTitle = (
  run: EnrichedAgentRunRecord,
): string => {
  const line =
    firstLine(resolveAgentRunTitleSummary(run)) || firstLine(run.prompt);
  if (line.length === 0) {
    return C["reports.detail.heading"];
  }
  return line.length > TITLE_MAX ? `${line.slice(0, TITLE_MAX - 1)}…` : line;
};

/** Who ran it (executor). Cache-only rows carry ids, not emails → Unknown. */
export const resolveProjectReportFrom = (
  run: EnrichedAgentRunRecord,
): string => {
  const name = run.executorName?.trim() ?? "";
  const email = run.executorEmail.includes("@") ? run.executorEmail : "";
  const who = name.length > 0 ? name : email;
  return who.length > 0
    ? fillProjectPageCopy(C["reports.row.from.person"], { name: who })
    : C["reports.row.from.unknown"];
};

export const buildProjectReportRows = (
  runs: readonly EnrichedAgentRunRecord[],
  projectId: string,
): readonly ProjectReportRow[] =>
  runs
    .filter((run) => run.projectId === projectId)
    .map((run) => ({
      id: run.id,
      title: resolveProjectReportTitle(run),
      from: resolveProjectReportFrom(run),
      createdAt: run.createdAt,
      ...buildProjectReportExtras(run),
    }));

/** Search by title or who ran it (case-insensitive). */
export const filterProjectReportRows = (
  rows: readonly ProjectReportRow[],
  query: string,
): readonly ProjectReportRow[] => {
  const needle = query.trim().toLowerCase();
  if (needle.length === 0) {
    return rows;
  }
  return rows.filter(
    (row) =>
      row.title.toLowerCase().includes(needle) ||
      row.from.toLowerCase().includes(needle),
  );
};
