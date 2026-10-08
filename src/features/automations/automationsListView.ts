import { formatAutomationScheduleLabel } from "@/features/automations/formatAutomationScheduleLabel";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";

export type AutomationStatusFilter = "all" | "enabled" | "paused" | "error";
export type AutomationSort = "next" | "last" | "name";

export const isAutomationError = (automation: AgentAutomationRecord): boolean =>
  automation.lastRunStatus === "failed" || Boolean(automation.lastError);

const matchesFilter = (
  automation: AgentAutomationRecord,
  filter: AutomationStatusFilter,
): boolean => {
  if (filter === "enabled") return automation.enabled;
  if (filter === "paused") return !automation.enabled;
  if (filter === "error") return isAutomationError(automation);
  return true;
};

const timeOf = (value: string | null, fallback: number): number =>
  value === null ? fallback : new Date(value).getTime();

const compareBySort = (
  sort: AutomationSort,
  a: AgentAutomationRecord,
  b: AgentAutomationRecord,
): number => {
  if (sort === "last") {
    return timeOf(b.lastRunAt, 0) - timeOf(a.lastRunAt, 0);
  }
  if (sort === "next") {
    const nextA = a.enabled ? timeOf(a.nextRunAt, Infinity) : Infinity;
    const nextB = b.enabled ? timeOf(b.nextRunAt, Infinity) : Infinity;
    if (nextA !== nextB) return nextA < nextB ? -1 : 1;
  }
  return a.name.localeCompare(b.name);
};

export const countAutomationsByFilter = (
  automations: readonly AgentAutomationRecord[],
  filter: AutomationStatusFilter,
): number => automations.filter((item) => matchesFilter(item, filter)).length;

export const selectVisibleAutomations = (
  automations: readonly AgentAutomationRecord[],
  query: string,
  filter: AutomationStatusFilter,
  sort: AutomationSort,
): readonly AgentAutomationRecord[] => {
  const needle = query.trim().toLowerCase();
  return automations
    .filter(
      (item) =>
        matchesFilter(item, filter) &&
        (needle.length === 0 ||
          `${item.name} ${formatAutomationScheduleLabel(item)}`
            .toLowerCase()
            .includes(needle)),
    )
    .sort((a, b) => compareBySort(sort, a, b));
};
