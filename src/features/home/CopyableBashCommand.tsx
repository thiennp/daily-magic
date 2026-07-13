"use client";

import { useCallback, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import LocalTerminalPre from "@/components/surfaces/LocalTerminalPre";
import { APP_SURFACE_TERMINAL_COPY_BUTTON_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { CheckLineIcon, CopyIcon } from "@/icons";

interface CopyableBashCommandProps {
  readonly command: string;
  readonly iconOnly?: boolean;
  readonly onEngaged?: () => void;
}

export default function CopyableBashCommand({
  command,
  iconOnly = false,
  onEngaged,
}: CopyableBashCommandProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const reportEngaged = useCallback(() => {
    onEngaged?.();
  }, [onEngaged]);

  const handleCopy = useCallback(() => {
    reportEngaged();
    void navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  }, [command, reportEngaged]);

  const handleSelectionEngage = useCallback(() => {
    const selection = window.getSelection();
    const preElement = preRef.current;

    if (
      selection === null ||
      selection.isCollapsed ||
      preElement === null ||
      !preElement.contains(selection.anchorNode)
    ) {
      return;
    }

    reportEngaged();
  }, [reportEngaged]);

  return (
    <div className="relative mt-4">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy install command"}
        className={
          iconOnly
            ? twMerge(
                "absolute right-3 top-3",
                APP_SURFACE_TERMINAL_COPY_BUTTON_CLASS,
              )
            : twMerge(
                "absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
              )
        }
      >
        {copied ? (
          iconOnly ? (
            <CheckLineIcon className="h-4 w-4" />
          ) : (
            <>
              <CheckLineIcon className="h-3.5 w-3.5" />
              Copied
            </>
          )
        ) : iconOnly ? (
          <CopyIcon className="h-4 w-4" />
        ) : (
          <>
            <CopyIcon className="h-3.5 w-3.5" />
            Copy
          </>
        )}
      </button>
      <LocalTerminalPre
        ref={preRef}
        onMouseUp={handleSelectionEngage}
        onKeyUp={handleSelectionEngage}
        className={iconOnly ? "pr-14" : "pr-24"}
      >
        <code>{command}</code>
      </LocalTerminalPre>
    </div>
  );
}
