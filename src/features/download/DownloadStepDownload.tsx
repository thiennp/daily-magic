"use client";

import { useState } from "react";

import {
  APP_SURFACE_CTA_PRIMARY_CLASS,
  APP_SURFACE_CTA_SECONDARY_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import DownloadStepCard from "@/features/download/DownloadStepCard";
import DownloadOsPicker from "@/features/download/DownloadOsPicker";
import {
  DOWNLOAD_OS_OPTIONS,
  type DownloadOsKey,
} from "@/features/download/downloadOsOptions";
import { DOWNLOAD_PAGE_COPY } from "@/features/download/downloadPageCopy.constant";

interface DownloadStepDownloadProps {
  readonly os: DownloadOsKey;
  readonly onOsChange: (os: DownloadOsKey) => void;
  readonly downloaded: boolean;
  readonly onDownloaded: () => void;
  readonly onNext: () => void;
}

export default function DownloadStepDownload({
  os,
  onOsChange,
  downloaded,
  onDownloaded,
  onNext,
}: DownloadStepDownloadProps) {
  const [fileIndex, setFileIndex] = useState(0);
  const option = DOWNLOAD_OS_OPTIONS[os];
  const file = option.files[Math.min(fileIndex, option.files.length - 1)];

  return (
    <DownloadStepCard
      id="download-heading"
      title="1 · Download"
      done={downloaded}
      doneLabel="Downloaded"
    >
      <DownloadOsPicker
        os={os}
        fileIndex={fileIndex}
        onOsChange={(key) => {
          setFileIndex(0);
          onOsChange(key);
        }}
        onFileChange={setFileIndex}
      />
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 text-sm">
        <div>
          <dt className="text-[13px] text-awc-fg-muted">File</dt>
          <dd className="break-all font-mono font-semibold">{file.name}</dd>
        </div>
        <div>
          <dt className="text-[13px] text-awc-fg-muted">Version</dt>
          <dd className="font-semibold">{option.version}</dd>
        </div>
      </dl>
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={file.url}
          onClick={onDownloaded}
          className={
            downloaded
              ? APP_SURFACE_CTA_SECONDARY_CLASS
              : APP_SURFACE_CTA_PRIMARY_CLASS
          }
        >
          {downloaded ? "Download again" : `Download for ${option.name}`}
        </a>
        {downloaded ? (
          <button
            type="button"
            onClick={onNext}
            className={APP_SURFACE_CTA_PRIMARY_CLASS}
          >
            Next: Install →
          </button>
        ) : null}
      </div>
      <ul className="list-disc space-y-1 pl-5 text-[13px] text-awc-fg-muted">
        <li>{DOWNLOAD_PAGE_COPY.freeNote}</li>
        {os === "mac" ? (
          <>
            <li>{DOWNLOAD_PAGE_COPY.siliconNote}</li>
            <li>{DOWNLOAD_PAGE_COPY.signedNote}</li>
          </>
        ) : (
          <li>{DOWNLOAD_PAGE_COPY.linuxNote}</li>
        )}
      </ul>
    </DownloadStepCard>
  );
}
