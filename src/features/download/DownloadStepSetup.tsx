import Link from "next/link";

import {
  APP_SURFACE_CTA_PRIMARY_CLASS,
  APP_SURFACE_CTA_SECONDARY_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import DownloadStepCard from "@/features/download/DownloadStepCard";
import { DOWNLOAD_PAGE_COPY } from "@/features/download/downloadPageCopy.constant";

interface DownloadStepSetupProps {
  readonly signedInEmail: string | null;
  readonly onBack: () => void;
}

export default function DownloadStepSetup({
  signedInEmail,
  onBack,
}: DownloadStepSetupProps) {
  return (
    <DownloadStepCard id="setup-heading" title="3 · Set up">
      <div className="flex flex-col gap-4 text-sm">
        <div>
          <p className="text-[13px] font-medium">1. Sign in</p>
          {signedInEmail !== null ? (
            <p>
              ✓ Signed in as <b>{signedInEmail}</b>
            </p>
          ) : (
            <>
              <p className="text-awc-fg-muted">
                Sign in on the website, then come back.
              </p>
              <Link
                href="/login?callbackUrl=%2Fdownload"
                className={`${APP_SURFACE_CTA_PRIMARY_CLASS} mt-2`}
              >
                Sign in
              </Link>
            </>
          )}
        </div>
        <div>
          <p className="text-[13px] font-medium">2. Connect this computer</p>
          <p className="text-awc-fg-muted">
            {DOWNLOAD_PAGE_COPY.afterDownload}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Link href="/" className={APP_SURFACE_CTA_PRIMARY_CLASS}>
          Open Home
        </Link>
        <button
          type="button"
          onClick={onBack}
          className={APP_SURFACE_CTA_SECONDARY_CLASS}
        >
          Back
        </button>
      </div>
    </DownloadStepCard>
  );
}
