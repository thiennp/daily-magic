"use client";

import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface ConnectThisLinuxDownloadChoiceProps {
  readonly appImageUrl: string;
  readonly debUrl: string;
}

export default function ConnectThisLinuxDownloadChoice({
  appImageUrl,
  debUrl,
}: ConnectThisLinuxDownloadChoiceProps) {
  return (
    <section className="mt-5 space-y-2 border-t border-awc-border pt-4 dark:border-white/10">
      <h3 className="text-sm font-semibold text-awc-fg dark:text-white/90">
        Or download the Linux app
      </h3>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        <a
          href={appImageUrl}
          className="font-medium text-awc-blue-700 underline-offset-2 hover:underline"
        >
          AppImage
        </a>
        {" · "}
        <a
          href={debUrl}
          className="font-medium text-awc-blue-700 underline-offset-2 hover:underline"
        >
          .deb
        </a>
        {" — "}
        starts and stops the same AgentWitch install from the tray.
      </p>
      <p className="text-xs text-awc-fg-muted dark:text-gray-400">
        Run the terminal install first. AppImage:{" "}
        <code className="rounded bg-awc-fill px-1 dark:bg-white/10">
          chmod +x AgentWitchLocal-x86_64.AppImage
        </code>{" "}
        then run it. .deb:{" "}
        <code className="rounded bg-awc-fill px-1 dark:bg-white/10">
          sudo apt install ./agent-witch-local_0.1.0_amd64.deb
        </code>
        . On stock GNOME, enable the AppIndicator extension for the tray icon.
      </p>
    </section>
  );
}
