"use client";

import { useCallback, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import LocalTerminalPre from "@/components/surfaces/LocalTerminalPre";
import {
  APP_SURFACE_BASH_TERMINAL_COPY_BUTTON_CLASS,
  APP_SURFACE_BASH_TERMINAL_PRE_CLASS,
  APP_SURFACE_TERMINAL_COPY_BUTTON_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import renderCopyableBashCommandCopyIcon from "@/features/home/utils/renderCopyableBashCommandCopyIcon";

interface CopyableBashCommandProps {
  readonly command: string;
  readonly iconOnly?: boolean;
  readonly variant?: "default" | "bash";
  readonly onEngaged?: () => void;
}

export default function CopyableBashCommand({
  command,
  iconOnly = false,
  variant = "default",
  onEngaged,
}: CopyableBashCommandProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyClick = useCallback(() => {
    void navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      onEngaged?.();
      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  }, [command, onEngaged]);

  if (variant === "bash") {
    return (
      <div className="mt-4">
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
            {renderCopyableBashCommandCopyIcon(copied, true)}
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
    <div className="relative mt-4">
      <button
        type="button"
        onClick={handleCopyClick}
        aria-label={copied ? "Copied" : "Copy install command"}
        className={twMerge("absolute right-3 top-3", copyButtonClassName)}
      >
        {renderCopyableBashCommandCopyIcon(copied, iconOnly)}
      </button>
      <LocalTerminalPre ref={preRef} className={iconOnly ? "pr-14" : "pr-24"}>
        <code>{command}</code>
      </LocalTerminalPre>
    </div>
  );
}
