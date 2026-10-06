"use client";

import { useId } from "react";

import { APP_SURFACE_CTA_SECONDARY_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

/** Shown under the disabled Connect button while the key field is empty. */
export const CONNECT_CURSOR_CLOUD_EMPTY_KEY_REASON =
  "Paste your key to connect.";

interface ConnectCursorCloudSubmitButtonProps {
  readonly isSubmitting: boolean;
  readonly isKeyEmpty: boolean;
  readonly onSubmit: () => void;
}

export default function ConnectCursorCloudSubmitButton({
  isSubmitting,
  isKeyEmpty,
  onSubmit,
}: ConnectCursorCloudSubmitButtonProps) {
  const reasonId = useId();
  const showReason = isKeyEmpty && !isSubmitting;

  return (
    <>
      <button
        type="button"
        disabled={isSubmitting || isKeyEmpty}
        title={showReason ? CONNECT_CURSOR_CLOUD_EMPTY_KEY_REASON : undefined}
        aria-describedby={showReason ? reasonId : undefined}
        className={`mt-5 w-full ${APP_SURFACE_CTA_SECONDARY_CLASS}`}
        onClick={onSubmit}
      >
        {isSubmitting ? "Connecting…" : "Connect Cursor Cloud"}
      </button>
      {showReason ? (
        <p
          id={reasonId}
          className="mt-2 text-xs text-gray-500 dark:text-gray-400"
        >
          {CONNECT_CURSOR_CLOUD_EMPTY_KEY_REASON}
        </p>
      ) : null}
    </>
  );
}
