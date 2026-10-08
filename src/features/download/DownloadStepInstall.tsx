"use client";

import { useState } from "react";

import {
  APP_SURFACE_CTA_PRIMARY_CLASS,
  APP_SURFACE_CTA_SECONDARY_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import DownloadStepCard from "@/features/download/DownloadStepCard";
import {
  DOWNLOAD_OS_OPTIONS,
  type DownloadOsKey,
} from "@/features/download/downloadOsOptions";

interface DownloadStepInstallProps {
  readonly os: DownloadOsKey;
  readonly onBack: () => void;
  readonly onNext: () => void;
}

export default function DownloadStepInstall({
  os,
  onBack,
  onNext,
}: DownloadStepInstallProps) {
  const option = DOWNLOAD_OS_OPTIONS[os];
  const [ticks, setTicks] = useState<readonly number[]>([]);

  return (
    <DownloadStepCard
      id="install-heading"
      title={`2 · Install on ${option.name}`}
    >
      <ul className="flex flex-col gap-3">
        {option.steps.map((text, index) => (
          <li key={text}>
            <label className="flex items-start gap-2 text-sm text-awc-fg">
              <input
                type="checkbox"
                checked={ticks.includes(index)}
                onChange={(event) =>
                  setTicks((current) =>
                    event.target.checked
                      ? [...current, index]
                      : current.filter((item) => item !== index),
                  )
                }
                className="mt-0.5 size-[18px] shrink-0 accent-awc-blue-600"
              />
              <span>{text}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onNext}
          className={APP_SURFACE_CTA_PRIMARY_CLASS}
        >
          Next: Set up →
        </button>
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
