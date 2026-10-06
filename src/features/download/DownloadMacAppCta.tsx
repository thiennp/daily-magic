import { DOWNLOAD_PAGE_COPY } from "@/features/download/downloadPageCopy.constant";
import { APP_SURFACE_CTA_PRIMARY_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { buildAgentWitchLocalMacAppDownloadUrl } from "@/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl";

interface DownloadMacAppCtaProps {
  readonly className?: string;
}

/** Tag-pinned Mac DMG CTA — same release source as Connect this computer. */
export default function DownloadMacAppCta({
  className = APP_SURFACE_CTA_PRIMARY_CLASS,
}: DownloadMacAppCtaProps) {
  return (
    <a href={buildAgentWitchLocalMacAppDownloadUrl()} className={className}>
      {DOWNLOAD_PAGE_COPY.downloadCta}
    </a>
  );
}
