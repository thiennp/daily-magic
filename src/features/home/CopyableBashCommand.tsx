"use client";

import { useCallback, useState } from "react";

import { CheckLineIcon, CopyIcon } from "@/icons";

interface CopyableBashCommandProps {
  readonly command: string;
}

export default function CopyableBashCommand({
  command,
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
        className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        {copied ? (
          <>
            <CheckLineIcon className="h-3.5 w-3.5" />
            Copied
          </>
        ) : (
          <>
            <CopyIcon className="h-3.5 w-3.5" />
            Copy
          </>
        )}
      </button>
      <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-white p-4 pr-24 text-left text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200">
        <code>{command}</code>
      </pre>
    </div>
  );
}
