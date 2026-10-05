import DownloadPageTextLink from "@/features/download/DownloadPageTextLink";
import { DOWNLOAD_PAGE_COPY } from "@/features/download/downloadPageCopy.constant";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

/** Plain note for phones and non-Mac browsers — link only, no DMG. */
export default function DownloadNonMacNote() {
  return (
    <p className={`mt-4 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
      {DOWNLOAD_PAGE_COPY.nonMacNote}{" "}
      <DownloadPageTextLink />
    </p>
  );
}
