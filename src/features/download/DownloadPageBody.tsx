import DownloadMacAppCta from "@/features/download/DownloadMacAppCta";
import { DOWNLOAD_PAGE_COPY } from "@/features/download/downloadPageCopy.constant";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_EYEBROW_TEXT_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

export default function DownloadPageBody() {
  const copy = DOWNLOAD_PAGE_COPY;
  return (
    <article className="mx-auto max-w-2xl space-y-6 py-2 sm:py-4">
      <header className="space-y-2">
        <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>Mac app</p>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {copy.title}
        </h1>
        <p className={`text-base ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          {copy.intro}
        </p>
      </header>
      <div className="flex flex-wrap items-center gap-3">
        <DownloadMacAppCta />
      </div>
      <ul className={`list-disc space-y-2 pl-5 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        <li>{copy.siliconNote}</li>
        <li>{copy.unsignedNote}</li>
        <li>{copy.afterDownload}</li>
      </ul>
    </article>
  );
}
