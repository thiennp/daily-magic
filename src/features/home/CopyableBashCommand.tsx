"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
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

const renderCopyIcon = (copied: boolean, iconOnly: boolean): ReactNode => {
  if (copied) {
    return iconOnly ? (
      <CheckLineIcon className="h-5 w-5 shrink-0" />
    ) : (
      <>
        <CheckLineIcon className="h-3.5 w-3.5" />
        Copied
      </>
    );
  }

  return iconOnly ? (
    <CopyIcon className="h-5 w-5 shrink-0" />
  ) : (
    <>
      <CopyIcon className="h-3.5 w-3.5" />
      Copy
    </>
  );
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

  if (variant === "bash") {
    return (
      <div className="mt-4" onCopy={handleCopyEvent}>
        <div
          className={twMerge(
            APP_SURFACE_BASH_TERMINAL_PRE_CLASS,
            "grid grid-cols-[minmax(0,1fr)_auto] overflow-hidden p-0",
          )}
        >
          <pre
            ref={preRef}
            className="min-w-0 flex-1 overflow-x-auto p-3 font-mono text-xs text-white"
          >
            <code>{command}</code>
          </pre>
          <button
            type="button"
            onClick={handleCopyClick}
            aria-label={copied ? "Copied" : "Copy install command"}
            className={APP_SURFACE_BASH_TERMINAL_COPY_BUTTON_CLASS}
          >
            {renderCopyIcon(copied, true)}
          </button>
        </div>
      </div>
    );
  }

  const copyButtonClassName = iconOnly
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
        {renderCopyIcon(copied, iconOnly)}
      </button>
      <LocalTerminalPre
        ref={preRef}
        className={iconOnly ? "pr-14" : "pr-24"}
      >
        <code>{command}</code>
      </LocalTerminalPre>
    </div>
  );
}
