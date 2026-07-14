"use client";

import Link from "next/link";

import { useAppPath } from "@/features/demo/DemoPreviewContext";
import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface WsTestComposerHelperTextProps {
  readonly isSendDisabled: boolean;
  readonly isWorkflowTask: boolean;
  readonly isBrowserOffline: boolean;
  readonly canCopyPrompt: boolean;
  readonly isTeamDispatch: boolean;
  readonly hasOnlineMac: boolean;
  readonly selectedDeviceIsOnline: boolean;
}

export default function WsTestComposerHelperText({
  isSendDisabled,
  isWorkflowTask,
  isBrowserOffline,
  canCopyPrompt,
  isTeamDispatch,
  hasOnlineMac,
  selectedDeviceIsOnline,
}: WsTestComposerHelperTextProps) {
  const appPath = useAppPath();

  if (isBrowserOffline) {
    return (
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-medium text-gray-700 dark:text-gray-300">
          Send to your Mac
        </span>{" "}
        needs this page connected to the server. Reconnect or refresh, then try
        again.
        {canCopyPrompt
          ? " You can still copy the prompt or queue the task for later."
          : null}
      </p>
    );
  }

  if (!isTeamDispatch && !hasOnlineMac) {
    return (
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        No Mac is online right now. Start Agent Witch on a paired Mac — it
        sends a heartbeat every 30 seconds.{" "}
        <Link href={appPath("/#your-setup")} className={APP_SURFACE_TEXT_LINK_CLASS}>
          Connect or manage Macs
        </Link>
        {canCopyPrompt
          ? ", or copy the prompt / queue the task until one comes online."
          : "."}
      </p>
    );
  }

  if (!isTeamDispatch && hasOnlineMac && !selectedDeviceIsOnline) {
    return (
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        The selected Mac is offline. Choose an online Mac above, or wait for it
        to reconnect.
        {canCopyPrompt ? " You can still copy the assembled prompt." : null}
      </p>
    );
  }

  if (isSendDisabled && !isWorkflowTask) {
    return (
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Enter a task description to continue.
      </p>
    );
  }

  if (isSendDisabled && isWorkflowTask) {
    return (
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Fill required questions to send, or copy the assembled prompt.
      </p>
    );
  }

  return null;
}
