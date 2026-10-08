"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import AutomationCard from "@/features/automations/AutomationCard";
import AutomationsToolbar from "@/features/automations/AutomationsToolbar";
import {
  countAutomationsByFilter,
  selectVisibleAutomations,
  type AutomationSort,
  type AutomationStatusFilter,
} from "@/features/automations/automationsListView";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";

interface AutomationsListSectionProps {
  readonly automations: readonly AgentAutomationRecord[];
  readonly onChanged: () => void;
}

export default function AutomationsListSection({
  automations,
  onChanged,
}: AutomationsListSectionProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<AutomationSort>("next");
  const [filter, setFilter] = useState<AutomationStatusFilter>("all");
  const visible = selectVisibleAutomations(automations, query, filter, sort);
  const counts = {
    all: automations.length,
    enabled: countAutomationsByFilter(automations, "enabled"),
    paused: countAutomationsByFilter(automations, "paused"),
    error: countAutomationsByFilter(automations, "error"),
  };
  const trimmedQuery = query.trim();

  return (
    <div className="space-y-4">
      <AutomationsToolbar
        query={query}
        sort={sort}
        filter={filter}
        counts={counts}
        onQueryChange={setQuery}
        onSortChange={setSort}
        onFilterChange={setFilter}
      />
      <div role="region" aria-label="Automations" aria-live="polite">
        {visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-awc-border-strong px-4 py-8 text-center dark:border-gray-700">
            <p className="text-sm font-medium text-awc-fg dark:text-white/90">
              {trimmedQuery.length > 0
                ? `Nothing matches “${trimmedQuery}”`
                : "Nothing matches"}
            </p>
            <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
              Try a different word or remove a filter.
            </p>
            <div className="mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {visible.map((automation) => (
              <AutomationCard
                key={automation.id}
                automation={automation}
                onChanged={onChanged}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
