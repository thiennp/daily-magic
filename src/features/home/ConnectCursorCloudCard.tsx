"use client";

import { useState } from "react";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_SECONDARY_CLASS,
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
  APP_SURFACE_NESTED_CARD_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectCursorCloudModal from "@/features/home/ConnectCursorCloudModal";
import useCursorCloudConnection from "@/features/home/hooks/useCursorCloudConnection";

export default function ConnectCursorCloudCard() {
  const { summary, isLoading, error, connect, disconnect } =
    useCursorCloudConnection();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Checking Cursor Cloud…
      </p>
    );
  }

  if (summary.connected) {
    return (
      <div className={APP_SURFACE_NESTED_CARD_CLASS}>
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
    <>
      <button
        type="button"
        className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Connect Cursor Cloud
      </button>
      <ConnectCursorCloudModal
        isOpen={isModalOpen}
        connectError={error}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onConnect={connect}
      />
    </>
  );
}
