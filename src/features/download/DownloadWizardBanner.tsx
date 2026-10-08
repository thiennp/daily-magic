import Link from "next/link";

import { DOWNLOAD_PAGE_COPY } from "@/features/download/downloadPageCopy.constant";

const bannerClass =
  "flex flex-wrap items-start gap-3 rounded-lg border border-awc-warn-dot/40 bg-awc-warn-soft px-4 py-3 text-sm text-awc-fg";

interface DownloadWizardBannerProps {
  readonly detected: string;
  readonly showSignIn: boolean;
}

/** Warning banners: unsupported computer, or signed out on the Set up step. */
export default function DownloadWizardBanner({
  detected,
  showSignIn,
}: DownloadWizardBannerProps) {
  const unsupported = detected === "windows" || detected === "other";
  return (
    <>
      {unsupported ? (
        <div role="status" className={bannerClass}>
          <p className="min-w-0 flex-1 basis-60">
            {DOWNLOAD_PAGE_COPY.unsupportedNote}
          </p>
        </div>
      ) : null}
      {showSignIn ? (
        <div role="status" className={bannerClass}>
          <p className="min-w-0 flex-1 basis-60">
            <b>You are signed out.</b> Sign in to connect this computer.
          </p>
          <Link
            href="/login?callbackUrl=%2Fdownload"
            className="font-semibold text-awc-blue-700 underline"
          >
            Sign in
          </Link>
        </div>
      ) : null}
    </>
  );
}
