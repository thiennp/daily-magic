"use client";

import { useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import forkCapabilityToLibrary from "@/features/harness/hooks/forkCapabilityToLibrary";
import Button from "@/components/ui/button/Button";

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface SaveCapabilityToLibraryActionsProps {
  readonly capabilityId: string;
  readonly sourceOwnerLabel: string;
}

export default function SaveCapabilityToLibraryActions({
  capabilityId,
  sourceOwnerLabel,
}: SaveCapabilityToLibraryActionsProps) {
  const demoPreview = useDemoPreview();
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [savedName, setSavedName] = useState<string | null>(null);

  const handleSave = async (): Promise<void> => {
    if (demoPreview) {
      setStatus("error");
      setMessage("Demo preview does not save to your account.");
      return;
    }

    setStatus("saving");
    setMessage(null);

    const result = await forkCapabilityToLibrary(capabilityId);

    if (!result.ok) {
      setStatus("error");
      setMessage(result.errorMessage);
      return;
    }

    setStatus("saved");
    setSavedName(result.capability.name);
    setMessage(
      `Saved as a private draft. Edit it under Home → What teammates can request.`,
    );
  };

  return (
    <div className="mt-4 space-y-2">
      <Button
        disabled={status === "saving" || status === "saved"}
        onClick={() => {
          void handleSave();
        }}
      >
        {status === "saving"
          ? "Saving…"
          : status === "saved"
            ? "Saved to my library"
            : "Save to my library"}
      </Button>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Copies the prompt and workflow from {sourceOwnerLabel} into your
        account. Rules bundles are not copied — use Install bundle for that.
      </p>
      {savedName ? (
        <p className="text-xs font-medium text-brand-700 dark:text-brand-300">
          {savedName}
        </p>
      ) : null}
      {message ? (
        <p
          className={`text-xs ${
            status === "error"
              ? "text-amber-700 dark:text-amber-300"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
