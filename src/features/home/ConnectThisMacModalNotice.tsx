"use client";

import Link from "next/link";

import { AGENT_WITCH_LOCAL_TOO_OLD_COPY as TOO_OLD } from "@/features/home/agentWitchLocalTooOldCopy.constant";
import type { ConnectThisMacModalNotice as ConnectThisMacModalNoticeValue } from "@/features/home/utils/ConnectThisMacModalNotice.type";
import { AGENT_WITCH_LOCAL_DOWNLOAD_URL } from "@/lib/agentWitch/agentWitchLocalTooOld.constant";

interface ConnectThisMacModalNoticeProps {
  readonly notice: ConnectThisMacModalNoticeValue;
  readonly isRetrying: boolean;
  readonly onRetry: () => void;
}

const NOTICE_CLASS =
  "mt-4 rounded-lg border px-3 py-3 text-sm border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100";

const LINK_CLASS = "font-medium underline underline-offset-2";

export default function ConnectThisMacModalNotice({
  notice,
  isRetrying,
  onRetry,
}: ConnectThisMacModalNoticeProps) {
  const retryButton = (
    <button
      type="button"
      className={LINK_CLASS}
      disabled={isRetrying}
      onClick={onRetry}
    >
      {isRetrying ? "Checking…" : "Retry"}
    </button>
  );

  if (notice.kind === "version_too_old") {
    return (
      <div
        role="alert"
        className={NOTICE_CLASS}
        data-testid="connect-awl-too-old"
      >
        <p className="font-semibold">{TOO_OLD.title}</p>
        <p className="mt-1">{TOO_OLD.body}</p>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          <Link href={notice.downloadUrl} className={LINK_CLASS}>
            {TOO_OLD.primary}
          </Link>
          <button
            type="button"
            className={LINK_CLASS}
            disabled={isRetrying}
            onClick={onRetry}
          >
            {isRetrying ? "Checking…" : TOO_OLD.secondary}
          </button>
        </p>
      </div>
    );
  }

  if (notice.kind === "not_running") {
    return (
      <div
        role="status"
        className={NOTICE_CLASS}
        data-testid="connect-awl-not-running"
      >
        <p className="font-semibold">AgentWitch Local is not running</p>
        <p className="mt-1">
          Open AgentWitch Local on this computer, then retry. Not installed?{" "}
          <Link href={AGENT_WITCH_LOCAL_DOWNLOAD_URL} className={LINK_CLASS}>
            Download
          </Link>{" "}
          or run the command below.
        </p>
        <p className="mt-2">{retryButton}</p>
      </div>
    );
  }

  return (
    <div role="status" className={NOTICE_CLASS} data-testid="connect-awl-retry">
      <p className="font-semibold">This computer is not connected yet</p>
      <p className="mt-1">
        AgentWitch Local is running but has not connected to your account.
        Retry, or re-run the command below.{" "}
        <Link href={AGENT_WITCH_LOCAL_DOWNLOAD_URL} className={LINK_CLASS}>
          Download
        </Link>
      </p>
      <p className="mt-2">{retryButton}</p>
    </div>
  );
}
