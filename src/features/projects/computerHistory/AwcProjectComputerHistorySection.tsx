"use client";

import { useState } from "react";

import Switch from "@/components/form/switch/Switch";
import { AwcProjectDetailSection } from "@/features/projects/public-api/presentation";
import { AWC_PROJECT_COMPUTER_HISTORY_COPY } from "@/features/projects/computerHistory/awcProjectComputerHistoryCopy.constant";
import useAwcProjectComputerHistory from "@/features/projects/hooks/useAwcProjectComputerHistory";

interface AwcProjectComputerHistorySectionProps {
  readonly projectId: string;
}

/** Owner opt-in for project computer history. Setup lives in AgentWitch Local. */
export default function AwcProjectComputerHistorySection({
  projectId,
}: AwcProjectComputerHistorySectionProps) {
  const { enabled, isSaving, hasError, setEnabled } =
    useAwcProjectComputerHistory(projectId);
  // Remount the uncontrolled Switch after each save so it shows the server value.
  const [saveCount, setSaveCount] = useState(0);

  const handleChange = async (next: boolean): Promise<void> => {
    await setEnabled(next);
    setSaveCount((count) => count + 1);
  };

  return (
    <AwcProjectDetailSection
      title={AWC_PROJECT_COMPUTER_HISTORY_COPY.title}
      hint={AWC_PROJECT_COMPUTER_HISTORY_COPY.note}
    >
      <Switch
        key={`${String(enabled)}-${saveCount}`}
        label={AWC_PROJECT_COMPUTER_HISTORY_COPY.toggleLabel}
        defaultChecked={enabled === true}
        disabled={enabled === null || isSaving}
        onChange={(next) => void handleChange(next)}
      />
      {hasError ? (
        <p className="text-xs text-error-600 dark:text-error-400" role="alert">
          {AWC_PROJECT_COMPUTER_HISTORY_COPY.saveError}
        </p>
      ) : null}
    </AwcProjectDetailSection>
  );
}
