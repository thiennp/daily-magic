"use client";

import { useState } from "react";

import ConnectCursorCloudModal from "@/features/home/ConnectCursorCloudModal";
import useCursorCloudConnection from "@/features/home/hooks/useCursorCloudConnection";
import { APP_SHELL_COMPUTERS_COPY } from "@/features/shell/v5/public-api/types";
import {
  APP_SHELL_V5_HEADING_CLASS,
  APP_SHELL_V5_META_CLASS,
  APP_SHELL_V5_PILL_BUTTON_CLASS,
} from "@/features/shell/v5/public-api/types";

/** Shell Cursor Cloud row (V5-2 chrome). Connect / Disconnect as today. */
export default function ConnectCursorCloudCard() {
  const { summary, isLoading, error, connect, disconnect } =
    useCursorCloudConnection();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <p className={APP_SHELL_V5_META_CLASS}>Checking Cursor Cloud…</p>;
  }

  if (summary.connected) {
    return (
      <div>
        <p className={APP_SHELL_V5_HEADING_CLASS}>Cursor Cloud connected</p>
        <p className={`mt-1 break-words ${APP_SHELL_V5_META_CLASS}`}>
          {summary.cursorUserEmail ?? summary.apiKeyName ?? "Cursor key saved"}.{" "}
          {APP_SHELL_COMPUTERS_COPY.cursorCloudHelper}
        </p>
        <button
          type="button"
          className={`mt-3 ${APP_SHELL_V5_PILL_BUTTON_CLASS}`}
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
        className={APP_SHELL_V5_PILL_BUTTON_CLASS}
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
