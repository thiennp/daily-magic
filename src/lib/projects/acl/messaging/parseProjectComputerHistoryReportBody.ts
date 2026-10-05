import { isNonNullObject, isOneOf } from "guardz";

import {
  PROJECT_COMPUTER_HISTORY_REPORTS,
  type ProjectComputerHistoryReport,
} from "@/lib/projects/acl/messaging/projectComputerHistory.constants";

const isReport = isOneOf<ProjectComputerHistoryReport>(
  ...PROJECT_COMPUTER_HISTORY_REPORTS,
);

/**
 * Project computer report body: `{ report: "ready" | "degraded" }`.
 * Only the enum is read, so no other field (and never a key or secret)
 * can pass through to the cloud's storage.
 */
export const parseProjectComputerHistoryReportBody = (
  body: unknown,
): { readonly report: ProjectComputerHistoryReport } | null =>
  isNonNullObject(body) && isReport(body.report)
    ? { report: body.report }
    : null;
