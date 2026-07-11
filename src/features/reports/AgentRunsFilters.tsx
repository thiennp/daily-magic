"use client";

import { SCOPE_FILTER_OPTIONS } from "@/features/reports/agentRunScopeFilterOptions.constant";
import { STATUS_FILTER_OPTIONS } from "@/features/reports/agentRunStatusFilterOptions.constant";
import type { DispatchTargetGroup } from "@/features/dispatch/hooks/useDispatchTargets";
import {
  AgentRunScope,
  type AgentRunScopeValue,
} from "@/lib/dispatch/AgentRunScope.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

interface AgentRunsFiltersProps {
  readonly groups: readonly DispatchTargetGroup[];
  readonly scopeFilter: AgentRunScopeValue;
  readonly groupFilter: string;
  readonly statusFilter: AgentRunStatusValue | "all";
  readonly onScopeChange: (value: AgentRunScopeValue) => void;
  readonly onGroupChange: (value: string) => void;
  readonly onStatusChange: (value: AgentRunStatusValue | "all") => void;
}

export default function AgentRunsFilters({
  groups,
  scopeFilter,
  groupFilter,
  statusFilter,
  onScopeChange,
  onGroupChange,
  onStatusChange,
}: AgentRunsFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <label className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        Scope
        <select
          value={scopeFilter}
          onChange={(event) => {
            onScopeChange(event.target.value as AgentRunScopeValue);
          }}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-950"
        >
          {SCOPE_FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {scopeFilter === AgentRunScope.GROUP ? (
        <label className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          Group
          <select
            value={groupFilter}
            onChange={(event) => {
              onGroupChange(event.target.value);
            }}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="">All groups</option>
            {groups.map((group) => (
              <option key={group.groupId} value={group.groupId}>
                {group.groupName}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <label className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        Status
        <select
          value={statusFilter}
          onChange={(event) => {
            onStatusChange(event.target.value as AgentRunStatusValue | "all");
          }}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-950"
        >
          {STATUS_FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
