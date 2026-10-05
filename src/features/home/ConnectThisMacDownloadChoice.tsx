"use client";

import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface ConnectThisMacDownloadChoiceProps {
  readonly downloadUrl: string;
}

export default function ConnectThisMacDownloadChoice({
  downloadUrl,
}: ConnectThisMacDownloadChoiceProps) {
  return (
    <section className="mt-5 space-y-2 border-t border-gray-200 pt-4 dark:border-white/10">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
        Or download the Mac app
      </h3>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        <a
          href={downloadUrl}
          className="font-medium text-violet-700 underline-offset-2 hover:underline dark:text-violet-300"
        >
          Download for Mac
        </a>
        {" — "}
        starts and stops the same Agent Witch install from the menu bar.
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        The app is unsigned. On first launch, right-click the app and choose Open,
        or allow it under System Settings → Privacy &amp; Security → Open Anyway.
      </p>
    </section>
  );
}
