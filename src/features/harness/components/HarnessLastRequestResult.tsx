"use client";

import type HarnessRequestResult from "@/features/harness/hooks/types/HarnessRequestResult.type";
import { useHomeSetupEmbedded } from "@/features/home/HomeSetupEmbeddedContext";
import resolveHomeSetupNestedBoxClass from "@/features/home/resolveHomeSetupNestedBoxClass";

const LAST_REQUEST_BOX_CLASS =
  "mt-6 rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-900/60";

interface HarnessLastRequestResultProps {
  readonly result: HarnessRequestResult;
}

export default function HarnessLastRequestResult({
  result,
}: HarnessLastRequestResultProps) {
  const embedded = useHomeSetupEmbedded();

  return (
    <div
      className={resolveHomeSetupNestedBoxClass(
        embedded,
        LAST_REQUEST_BOX_CLASS,
        "mt-6 text-sm",
      )}
    >
      <p className="font-medium text-gray-800 dark:text-white/90">
        Last request: {result.success ? "success" : "failed"} (
        {result.writerAgent})
      </p>
      {result.errorMessage ? (
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {result.errorMessage}
        </p>
      ) : null}
      {result.output ? (
        <pre className="mt-3 max-h-48 overflow-auto text-xs text-gray-700 dark:text-gray-300">
          {result.output}
        </pre>
      ) : null}
    </div>
  );
}
