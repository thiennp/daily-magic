"use client";

import { useCallback, useState } from "react";

import { CheckLineIcon, CopyIcon } from "@/icons";

interface CopyableBashCommandProps {
  readonly command: string;
  readonly iconOnly?: boolean;
}

export default function CopyableBashCommand({
  command,
  iconOnly = false,
}: CopyableBashCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  }, [command]);

  return (
    <div className="relative mt-4">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy install command"}
        className={
          iconOnly
            ? "absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            : "absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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
      <pre
        className={
          iconOnly
            ? "overflow-x-auto rounded-lg border border-gray-200 bg-white p-4 pr-14 text-left text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200"
            : "overflow-x-auto rounded-lg border border-gray-200 bg-white p-4 pr-24 text-left text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200"
        }
      >
        <code>{command}</code>
      </pre>
    </div>
  );
}
