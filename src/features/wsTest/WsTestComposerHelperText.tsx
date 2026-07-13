"use client";

import Link from "next/link";

import { useAppPath } from "@/features/demo/DemoPreviewContext";
import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface WsTestComposerHelperTextProps {
  readonly isSendDisabled: boolean;
  readonly isWorkflowTask: boolean;
  readonly isOffline: boolean;
  readonly canCopyPrompt: boolean;
}

export default function WsTestComposerHelperText({
  isSendDisabled,
  isWorkflowTask,
  isOffline,
  canCopyPrompt,
}: WsTestComposerHelperTextProps) {
  const appPath = useAppPath();

  if (isOffline) {
    return (
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-medium text-gray-700 dark:text-gray-300">
          Send to your Mac
        </span>{" "}
        needs your computer connected.{" "}
        <Link href={appPath("/#your-setup")} className={APP_SURFACE_TEXT_LINK_CLASS}>
          Connect your Mac
        </Link>
        {canCopyPrompt
          ? ", or copy the prompt / queue the task until you are online."
          : "."}
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
