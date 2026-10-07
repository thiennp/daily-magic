"use client";

import type HarnessRequestResult from "@/features/harness/hooks/types/HarnessRequestResult.type";
import { HARNESS_WRITER_LABELS } from "@/features/harness/constants/harnessFormOptions";
import { useHomeSetupEmbedded } from "@/features/home/HomeSetupEmbeddedContext";
import resolveHomeSetupNestedBoxClass from "@/features/home/resolveHomeSetupNestedBoxClass";

const LAST_REQUEST_BOX_CLASS =
  "mt-6 rounded-lg bg-awc-surface-2 p-4 text-sm dark:bg-white/[0.06]";

interface HarnessLastRequestResultProps {
  readonly result: HarnessRequestResult;
}

export default function HarnessLastRequestResult({
  result,
}: HarnessLastRequestResultProps) {
  const embedded = useHomeSetupEmbedded();
  const writerLabel =
    result.writerAgent in HARNESS_WRITER_LABELS
      ? HARNESS_WRITER_LABELS[
          result.writerAgent as keyof typeof HARNESS_WRITER_LABELS
        ]
      : result.writerAgent;

  return (
    <div
      className={resolveHomeSetupNestedBoxClass(
        embedded,
        LAST_REQUEST_BOX_CLASS,
        "text-sm",
      )}
    >
      <p className="font-medium text-awc-fg dark:text-white/90">
        Last request: {result.success ? "success" : "failed"} ({writerLabel})
      </p>
      {result.errorMessage ? (
        <p className="mt-2 text-awc-fg-muted dark:text-gray-400">
          {result.errorMessage}
        </p>
      ) : null}
      {result.output ? (
        <pre className="mt-3 max-h-48 overflow-auto text-xs text-awc-fg dark:text-gray-300">
          {result.output}
        </pre>
      ) : null}
    </div>
  );
}
