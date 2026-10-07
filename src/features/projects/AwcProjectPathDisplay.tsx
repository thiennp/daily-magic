"use client";

import { useCallback, useState } from "react";

import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { PROJECT_PAGE_LAYOUT_V2_COPY } from "@/features/projects/projectPageLayoutV2Copy.constant";
import copyProjectPathToClipboard from "@/features/projects/utils/copyProjectPathToClipboard";
import formatProjectPathTruncation from "@/features/projects/utils/formatProjectPathTruncation";

interface AwcProjectPathDisplayProps {
  readonly folderPath: string;
}

/**
 * Project path with Copy. Truncates via middle-ellipsis (JS) — never CSS
 * CSS rtl direction, which flips a leading `~/` to the end.
 */
export default function AwcProjectPathDisplay({
  folderPath,
}: AwcProjectPathDisplayProps) {
  const copy = PROJECT_PAGE_LAYOUT_V2_COPY;
  const { display, full } = formatProjectPathTruncation(folderPath);
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const onCopy = useCallback(async () => {
    const ok = await copyProjectPathToClipboard(full);
    setStatus(ok ? "copied" : "failed");
    window.setTimeout(() => {
      setStatus("idle");
    }, 2000);
  }, [full]);

  const statusText =
    status === "copied"
      ? copy.copiedPath
      : status === "failed"
        ? copy.copyPathFailed
        : null;

  return (
    <div className="flex min-w-0 max-w-full items-center gap-2">
      <p
        className="min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[12.5px] text-awc-fg-muted dark:text-gray-300"
        title={full}
        aria-label={copy.pathLabel}
      >
        <bdi>{display}</bdi>
      </p>
      <button
        type="button"
        onClick={() => {
          void onCopy();
        }}
        className={`${APP_SURFACE_CTA_SECONDARY_SM_CLASS} shrink-0`}
      >
        {copy.copyPath}
      </button>
      {statusText !== null ? (
        <span className="sr-only" role="status" aria-live="polite">
          {statusText}
        </span>
      ) : null}
    </div>
  );
}
