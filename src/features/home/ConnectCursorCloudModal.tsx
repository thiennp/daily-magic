"use client";

import { useState } from "react";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_SECONDARY_CLASS,
  APP_SURFACE_FIELD_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { Modal } from "@/components/ui/modal";

interface ConnectCursorCloudModalProps {
  readonly isOpen: boolean;
  readonly connectError: string | null;
  readonly onClose: () => void;
  readonly onConnect: (apiKey: string) => Promise<string | null>;
}

export default function ConnectCursorCloudModal({
  isOpen,
  connectError,
  onClose,
  onConnect,
}: ConnectCursorCloudModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleClose = () => {
    setApiKey("");
    setLocalError(null);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-lg p-6">
      <h2 className="pr-10 text-lg font-semibold text-gray-900 dark:text-white/90">
        Connect Cursor Cloud
      </h2>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Run tasks in Cursor cloud VMs when no Mac is online. Follow the steps,
        then paste your API key.
      </p>

      <ol
        className={`mt-4 list-decimal space-y-2 pl-5 ${APP_SURFACE_BODY_TEXT_CLASS}`}
      >
        <li>
          Open{" "}
          <a
            href="https://cursor.com/dashboard"
            className="font-medium text-brand-700 underline-offset-4 hover:underline dark:text-brand-300"
            target="_blank"
            rel="noreferrer"
          >
            cursor.com/dashboard
          </a>{" "}
          and sign in.
        </li>
        <li>
          Create or copy a Cloud Agents API key (starts with{" "}
          <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">
            key_
          </code>
          ).
        </li>
        <li>Paste it below and connect. Disconnect anytime from Home.</li>
      </ol>

      <label className="mt-5 block text-sm font-medium text-gray-800 dark:text-white/90">
        API key
        <input
          type="password"
          autoComplete="off"
          value={apiKey}
          onChange={(event) => {
            setApiKey(event.target.value);
            setLocalError(null);
          }}
          className={`mt-2 ${APP_SURFACE_FIELD_CLASS}`}
          placeholder="key_…"
        />
      </label>

      {localError !== null || connectError !== null ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {localError ?? connectError}
        </p>
      ) : null}

      <button
        type="button"
        disabled={isSubmitting || apiKey.trim().length === 0}
        className={`mt-5 w-full ${APP_SURFACE_CTA_SECONDARY_CLASS}`}
        onClick={() => {
          setIsSubmitting(true);
          setLocalError(null);
          void onConnect(apiKey.trim()).then((message) => {
            setIsSubmitting(false);
            if (message !== null) {
              setLocalError(message);
              return;
            }
            setApiKey("");
            onClose();
          });
        }}
      >
        {isSubmitting ? "Connecting…" : "Connect Cursor Cloud"}
      </button>
    </Modal>
  );
}
