"use client";

import Link from "next/link";
import { useState } from "react";
import { buildProjectTabRedirectPath } from "@/lib/shell/buildNavConsolidationRedirect";
import { PROJECTS_REPORTS_INTENT_HREF } from "@/lib/shell/projectTabIntentHrefs.constant";

import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import AutomationRunHistory from "@/features/automations/AutomationRunHistory";
import AutomationRunCells from "@/features/automations/AutomationRunCells";
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
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <AppPanel as="article" padding="compact">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-awc-fg dark:text-white/90">
          {automation.name}
        </p>
        <span className="text-xs uppercase tracking-wide text-awc-fg-muted dark:text-gray-400">
          {automation.enabled
            ? AUTOMATIONS_PAGE_COPY.enable
            : AUTOMATIONS_PAGE_COPY.disable}
        </span>
      </div>
      <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
        {formatAutomationScheduleLabel(automation)}
      </p>
      <AutomationRunCells automation={automation} />
      {automation.lastError ? (
        <p className="mt-2 text-sm text-error-600 dark:text-error-400">
          {automation.lastError}
        </p>
      ) : null}
      {error ? (
        <p
          role="alert"
          className="mt-2 text-sm text-error-600 dark:text-error-400"
        >
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
        <Button
          variant="outline"
          aria-expanded={historyOpen}
          onClick={() => setHistoryOpen(!historyOpen)}
        >
          {historyOpen ? "Hide history" : "Run history"}
        </Button>
        {automation.lastRunAt !== null ? (
          <Link
            href={
              automation.projectId !== null
                ? buildProjectTabRedirectPath(automation.projectId, "reports")
                : PROJECTS_REPORTS_INTENT_HREF
            }
          >
            <Button variant="outline">Reports</Button>
          </Link>
        ) : null}
      </div>
      {historyOpen ? (
        <AutomationRunHistory automationId={automation.id} />
      ) : null}
    </AppPanel>
  );
}
