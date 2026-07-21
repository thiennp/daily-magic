"use client";

import { useState } from "react";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_SECONDARY_CLASS,
  APP_SURFACE_NESTED_CARD_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import useCursorCloudConnection from "@/features/home/hooks/useCursorCloudConnection";

export default function ConnectCursorCloudCard() {
  const { summary, isLoading, error, connect, disconnect } =
    useCursorCloudConnection();
  const [apiKey, setApiKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Checking Cursor Cloud…
      </p>
    );
  }

  if (summary.connected) {
    return (
      <div className={`mt-6 ${APP_SURFACE_NESTED_CARD_CLASS}`}>
        <p className="text-sm font-semibold text-gray-900 dark:text-white/90">
          Cursor Cloud connected
        </p>
        <p className={`mt-1 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          {summary.cursorUserEmail ?? summary.apiKeyName ?? "API key saved"}.
          Send tasks to Cursor Cloud from Agent when you pick it as the worker.
        </p>
        <button
          type="button"
          className={`mt-4 ${APP_SURFACE_CTA_SECONDARY_CLASS}`}
          onClick={() => {
            void disconnect();
          }}
        >
          Disconnect Cursor Cloud
        </button>
      </div>
    );
  }

  return (
    <div className={`mt-6 ${APP_SURFACE_NESTED_CARD_CLASS}`}>
      <p className="text-sm font-semibold text-gray-900 dark:text-white/90">
        Or connect Cursor Cloud
      </p>
      <p className={`mt-1 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Paste a Cursor Cloud API key from{" "}
        <a
          href="https://cursor.com/dashboard"
          className="font-medium text-brand-700 underline-offset-4 hover:underline dark:text-brand-300"
          target="_blank"
          rel="noreferrer"
        >
          cursor.com/dashboard
        </a>
        . Tasks can run in Cursor&apos;s cloud VMs when you do not have a Mac
        online.
      </p>
      <label className="mt-4 block text-sm font-medium text-gray-800 dark:text-white/90">
        API key
        <input
          type="password"
          autoComplete="off"
          value={apiKey}
          onChange={(event) => {
            setApiKey(event.target.value);
            setLocalError(null);
          }}
          className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          placeholder="key_…"
        />
      </label>
      {localError !== null || error !== null ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {localError ?? error}
        </p>
      ) : null}
      <button
        type="button"
        disabled={isSubmitting || apiKey.trim().length === 0}
        className={`mt-4 ${APP_SURFACE_CTA_SECONDARY_CLASS}`}
        onClick={() => {
          setIsSubmitting(true);
          setLocalError(null);
          void connect(apiKey.trim()).then((message) => {
            setIsSubmitting(false);
            if (message !== null) {
              setLocalError(message);
              return;
            }
            setApiKey("");
          });
        }}
      >
        {isSubmitting ? "Connecting…" : "Connect Cursor Cloud"}
      </button>
    </div>
  );
}
