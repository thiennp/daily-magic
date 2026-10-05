import Link from "next/link";

import { DOWNLOAD_PAGE_COPY } from "@/features/download/downloadPageCopy.constant";
import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface DownloadPageTextLinkProps {
  readonly className?: string;
  readonly label?: string;
}

/** In-app link to /download — never embeds a GitHub DMG href. */
export default function DownloadPageTextLink({
  className = APP_SURFACE_TEXT_LINK_CLASS,
  label = DOWNLOAD_PAGE_COPY.nonMacLinkLabel,
}: DownloadPageTextLinkProps) {
  return (
    <Link href="/download" className={className}>
      {label}
    </Link>
  );
}
