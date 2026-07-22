"use client";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_CLASS,
  APP_SURFACE_CTA_SECONDARY_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import CopyableBashCommand from "@/features/home/CopyableBashCommand";

export type DeleteLocalMacModalPhase =
  "confirm" | "deleting" | "success" | "manual";

interface DeleteLocalMacModalPhaseContentProps {
  readonly phase: DeleteLocalMacModalPhase;
  readonly resultMessage: string;
  readonly deleteCommand: string;
  readonly onCancel: () => void;
  readonly onConfirmDelete: () => void;
  readonly onClose: () => void;
}

export default function DeleteLocalMacModalPhaseContent({
  phase,
  resultMessage,
  deleteCommand,
  onCancel,
  onConfirmDelete,
  onClose,
}: DeleteLocalMacModalPhaseContentProps) {
  if (phase === "confirm") {
    return (
      <>
        <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          This stops LaunchAgents on this Mac, removes the local install folder,
          and kills background Agent Witch processes. Your cloud device entry
          stays until you choose Delete on the row.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className={APP_SURFACE_CTA_SECONDARY_CLASS}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirmDelete}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-rose-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 focus-visible:ring-offset-2"
          >
            Delete local install
          </button>
        </div>
      </>
    );
  }

  if (phase === "deleting") {
    return (
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Stopping local services and removing install files…
      </p>
    );
  }

  if (phase === "success") {
    return (
      <>
        <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>{resultMessage}</p>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className={APP_SURFACE_CTA_PRIMARY_CLASS}
          >
            Done
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        {resultMessage.length > 0
          ? `${resultMessage} Run this command in Terminal on this Mac to stop every Agent Witch process and remove the install files.`
          : "Run this command in Terminal on this Mac to stop every Agent Witch process and remove the install files."}
      </p>
      <CopyableBashCommand command={deleteCommand} variant="bash" />
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className={APP_SURFACE_CTA_PRIMARY_CLASS}
        >
          Close
        </button>
      </div>
    </>
  );
}
