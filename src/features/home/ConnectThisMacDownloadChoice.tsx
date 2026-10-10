"use client";

import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { DOWNLOAD_PAGE_COPY } from "@/features/download/public-api/types";

interface ConnectThisMacDownloadChoiceProps {
  readonly downloadUrl: string;
}

export default function ConnectThisMacDownloadChoice({
  downloadUrl,
}: ConnectThisMacDownloadChoiceProps) {
  return (
    <section className="mt-5 space-y-2 border-t border-awc-border pt-4 dark:border-white/10">
      <h3 className="text-sm font-semibold text-awc-fg dark:text-white/90">
        Mac menu bar app
      </h3>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        Already ran the command above? Add the Mac menu bar app to start, stop,
        and check AgentWitch.{" "}
        <a
          href={downloadUrl}
          className="font-medium text-awc-blue-700 underline-offset-2 hover:underline"
        >
          Download for Mac
        </a>
      </p>
      <p className="text-xs text-awc-fg-muted dark:text-gray-400">
        {DOWNLOAD_PAGE_COPY.signedNote}
      </p>
    </section>
  );
}
