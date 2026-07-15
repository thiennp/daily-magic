"use client";

import Link from "next/link";

import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import { AUTOMATIONS_PAGE_COPY } from "@/features/automations/automationsPageCopy.constant";
import { formatAutomationScheduleLabel } from "@/features/automations/formatAutomationScheduleLabel";
import { useAutomationCardActions } from "@/features/automations/hooks/useAutomationCardActions";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";

interface AutomationCardProps {
  readonly automation: AgentAutomationRecord;
  readonly onChanged: () => void;
}

export default function AutomationCard({
  automation,
  onChanged,
}: AutomationCardProps) {
  const { error, isBusy, handleRun, handleToggle, handleDelete } =
    useAutomationCardActions(automation, onChanged);

  return (
    <AppPanel as="article" padding="compact">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          {automation.name}
        </p>
        <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {automation.enabled
            ? AUTOMATIONS_PAGE_COPY.enable
            : AUTOMATIONS_PAGE_COPY.disable}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {formatAutomationScheduleLabel(automation)}
      </p>
      {automation.nextRunAt !== null ? (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Next run: {new Date(automation.nextRunAt).toLocaleString()}
        </p>
      ) : null}
      {automation.lastError ? (
        <p className="mt-2 text-sm text-error-600 dark:text-error-400">
          {automation.lastError}
        </p>
      ) : null}
      {error ? (
        <p className="mt-2 text-sm text-error-600 dark:text-error-400">
          {error}
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="outline"
          disabled={isBusy}
          onClick={() => {
            void handleRun();
          }}
        >
          {AUTOMATIONS_PAGE_COPY.runNow}
        </Button>
        <Button
          variant="outline"
          disabled={isBusy}
          onClick={() => {
            void handleToggle();
          }}
        >
          {automation.enabled ? "Pause" : "Resume"}
        </Button>
        <Button
          variant="outline"
          disabled={isBusy}
          onClick={() => {
            void handleDelete();
          }}
        >
          {AUTOMATIONS_PAGE_COPY.delete}
        </Button>
        {automation.lastRunAt !== null ? (
          <Link href="/reports">
            <Button variant="outline">Job history</Button>
          </Link>
        ) : null}
      </div>
    </AppPanel>
  );
}
