"use client";

import { APP_SURFACE_CTA_PRIMARY_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface DownloadAgentWitchAppButtonProps {
  readonly dmgDownloadUrl: string;
  readonly onEngaged?: () => void;
  readonly className?: string;
}

export default function DownloadAgentWitchAppButton({
  dmgDownloadUrl,
  onEngaged,
  className,
}: DownloadAgentWitchAppButtonProps) {
  return (
    <a
      href={dmgDownloadUrl}
      download="AgentWitch.dmg"
      onClick={() => {
        onEngaged?.();
      }}
      className={
        className ??
        `${APP_SURFACE_CTA_PRIMARY_CLASS} mt-4 inline-flex w-full justify-center sm:w-auto`
      }
    >
      Download Agent Witch
    </a>
  );
}
