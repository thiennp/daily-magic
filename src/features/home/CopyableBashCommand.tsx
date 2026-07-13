"use client";

import { useCallback, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import LocalTerminalPre from "@/components/surfaces/LocalTerminalPre";
import {
  APP_SURFACE_BASH_TERMINAL_COPY_BUTTON_CLASS,
  APP_SURFACE_BASH_TERMINAL_PRE_CLASS,
  APP_SURFACE_TERMINAL_COPY_BUTTON_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { doesClipboardMatchCommand } from "@/features/home/utils/doesClipboardMatchCommand";
import { readClipboardText } from "@/features/home/utils/readClipboardText";
import { CheckLineIcon, CopyIcon } from "@/icons";

interface CopyableBashCommandProps {
  readonly command: string;
  readonly iconOnly?: boolean;
  readonly variant?: "default" | "bash";
  readonly onEngaged?: () => void;
}

const verifyClipboardAndEngage = async (
  command: string,
  onEngaged?: () => void,
): Promise<boolean> => {
  const clipboardText = await readClipboardText();

  if (!doesClipboardMatchCommand(command, clipboardText)) {
    return false;
  }

  onEngaged?.();
  return true;
};

export default function CopyableBashCommand({
  command,
  iconOnly = false,
  variant = "default",
  onEngaged,
}: CopyableBashCommandProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const reportVerifiedCopy = useCallback(() => {
    void verifyClipboardAndEngage(command, onEngaged).then((verified) => {
      if (verified) {
        setCopied(true);
        window.setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    });
  }, [command, onEngaged]);

  const handleCopyClick = useCallback(() => {
    void navigator.clipboard.writeText(command).then(() => {
      reportVerifiedCopy();
    });
  }, [command, reportVerifiedCopy]);

  const handleCopyEvent = useCallback(() => {
    window.setTimeout(() => {
      reportVerifiedCopy();
    }, 0);
  }, [reportVerifiedCopy]);

  const terminalClassName =
    variant === "bash"
      ? APP_SURFACE_BASH_TERMINAL_PRE_CLASS
      : undefined;

  const copyButtonClassName =
    variant === "bash"
      ? APP_SURFACE_BASH_TERMINAL_COPY_BUTTON_CLASS
      : iconOnly
        ? APP_SURFACE_TERMINAL_COPY_BUTTON_CLASS
        : twMerge(
            "absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
          );

  return (
    <div className="relative mt-4" onCopy={handleCopyEvent}>
      <button
        type="button"
        onClick={handleCopyClick}
        aria-label={copied ? "Copied" : "Copy install command"}
        className={twMerge("absolute right-3 top-3", copyButtonClassName)}
      >
        {copied ? (
          iconOnly || variant === "bash" ? (
            <CheckLineIcon className="h-5 w-5 shrink-0" />
          ) : (
            <>
              <CheckLineIcon className="h-3.5 w-3.5" />
              Copied
            </>
          )
        ) : iconOnly || variant === "bash" ? (
          <CopyIcon className="h-5 w-5 shrink-0" />
        ) : (
          <>
            <CopyIcon className="h-3.5 w-3.5" />
            Copy
          </>
        )}
      </button>
      <LocalTerminalPre
        ref={preRef}
        className={twMerge(terminalClassName, iconOnly || variant === "bash" ? "pr-14" : "pr-24")}
      >
        <code>{command}</code>
      </LocalTerminalPre>
    </div>
  );
}
