import { useState } from "react";

import {
  submitDeleteAutomation,
  submitRunAutomation,
  submitToggleAutomation,
} from "@/features/automations/submitAutomationActions";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";

export const useAutomationCardActions = (
  automation: AgentAutomationRecord,
  onChanged: () => void,
): {
  readonly error: string | null;
  readonly isBusy: boolean;
  readonly handleRun: () => Promise<void>;
  readonly handleToggle: () => Promise<void>;
  readonly handleDelete: () => Promise<void>;
} => {
  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  const handleRun = async (): Promise<void> => {
    setError(null);
    setIsBusy(true);
    const result = await submitRunAutomation(
      automation.id,
      automation.triggerType,
      window.location.origin,
    );
    setIsBusy(false);

    if (!result.ok) {
      setError(result.errorMessage);
      return;
    }

    onChanged();
  };

  const handleToggle = async (): Promise<void> => {
    setError(null);
    setIsBusy(true);
    const result = await submitToggleAutomation(
      automation.id,
      !automation.enabled,
    );
    setIsBusy(false);

    if (!result.ok) {
      setError(result.errorMessage);
      return;
    }

    onChanged();
  };

  const handleDelete = async (): Promise<void> => {
    const confirmed = window.confirm(`Delete automation "${automation.name}"?`);

    if (!confirmed) {
      return;
    }

    setError(null);
    setIsBusy(true);
    const result = await submitDeleteAutomation(automation.id);
    setIsBusy(false);

    if (!result.ok) {
      setError(result.errorMessage);
      return;
    }

    onChanged();
  };

  return { error, isBusy, handleRun, handleToggle, handleDelete };
};
