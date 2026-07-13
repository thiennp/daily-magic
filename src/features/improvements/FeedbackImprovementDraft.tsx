"use client";

import { useState } from "react";

import {
  APP_SURFACE_CTA_PRIMARY_SM_CLASS,
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

interface FeedbackImprovementDraftProps {
  readonly feedbackId: string;
  readonly defaultSuggestion: string;
  readonly onCreated: () => void;
}

export default function FeedbackImprovementDraft({
  feedbackId,
  defaultSuggestion,
  onCreated,
}: FeedbackImprovementDraftProps) {
  const [suggestion, setSuggestion] = useState(defaultSuggestion);
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
        className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
      >
        Plan an update
      </button>
    );
  }

  return (
    <div className="mt-3 space-y-2">
      <textarea
        value={suggestion}
        onChange={(event) => {
          setSuggestion(event.target.value);
        }}
        rows={3}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
      />
      <button
        type="button"
        disabled={suggestion.trim().length === 0}
        onClick={() => {
          void fetch(`/api/capabilities/feedback/${feedbackId}/improvements`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ suggestion: suggestion.trim() }),
          }).then(() => {
            onCreated();
            setIsOpen(false);
          });
        }}
        className={`${APP_SURFACE_CTA_PRIMARY_SM_CLASS} disabled:opacity-50`}
      >
        Save improvement plan
      </button>
    </div>
  );
}
