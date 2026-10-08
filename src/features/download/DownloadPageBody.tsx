import DownloadWizard from "@/features/download/DownloadWizard";
import { DOWNLOAD_PAGE_COPY } from "@/features/download/downloadPageCopy.constant";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface DownloadPageBodyProps {
  readonly signedInEmail?: string | null;
}

export default function DownloadPageBody({
  signedInEmail = null,
}: DownloadPageBodyProps) {
  const copy = DOWNLOAD_PAGE_COPY;
  return (
    <article className="mx-auto max-w-2xl space-y-5 py-2 sm:py-4">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-awc-fg dark:text-white">
          {copy.title}
        </h1>
        <p className={`text-base ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          {copy.intro}
        </p>
      </header>
      <DownloadWizard signedInEmail={signedInEmail} />
    </article>
  );
}
