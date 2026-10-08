"use client";

import { useState } from "react";

import DownloadStepDownload from "@/features/download/DownloadStepDownload";
import DownloadStepInstall from "@/features/download/DownloadStepInstall";
import DownloadStepSetup from "@/features/download/DownloadStepSetup";
import DownloadStepTabs, {
  type DownloadStepKey,
} from "@/features/download/DownloadStepTabs";
import useBrowserSnapshot from "@/hooks/useBrowserSnapshot";
import DownloadWizardBanner from "@/features/download/DownloadWizardBanner";
import type { DownloadOsKey } from "@/features/download/downloadOsOptions";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";

const STEP_HASHES: readonly DownloadStepKey[] = [
  "download",
  "install",
  "setup",
];

interface DownloadWizardProps {
  readonly signedInEmail: string | null;
}

/** Download → Install → Set up wizard (one step visible at a time). */
export default function DownloadWizard({ signedInEmail }: DownloadWizardProps) {
  const hash = useBrowserSnapshot(
    () => window.location.hash.replace("#", ""),
    "",
  ) as DownloadStepKey;
  const detected = useBrowserSnapshot(detectBrowserOperatingSystem, "mac");
  const [pickedStep, setStep] = useState<DownloadStepKey | null>(null);
  const [pickedOs, setOs] = useState<DownloadOsKey | null>(null);
  const [downloaded, setDownloaded] = useState(false);
  const step = pickedStep ?? (STEP_HASHES.includes(hash) ? hash : "download");
  const os = pickedOs ?? (detected === "linux" ? "linux" : "mac");

  const doneSteps: DownloadStepKey[] = downloaded ? ["download"] : [];

  return (
    <div className="flex flex-col gap-4">
      <DownloadWizardBanner
        detected={detected}
        showSignIn={step === "setup" && signedInEmail === null}
      />
      <DownloadStepTabs step={step} doneSteps={doneSteps} onSelect={setStep} />
      <div
        id="download-step-panel"
        role="tabpanel"
        aria-labelledby={`tab-${step}`}
        tabIndex={-1}
      >
        {step === "download" ? (
          <DownloadStepDownload
            os={os}
            onOsChange={setOs}
            downloaded={downloaded}
            onDownloaded={() => setDownloaded(true)}
            onNext={() => setStep("install")}
          />
        ) : null}
        {step === "install" ? (
          <DownloadStepInstall
            os={os}
            onBack={() => setStep("download")}
            onNext={() => setStep("setup")}
          />
        ) : null}
        {step === "setup" ? (
          <DownloadStepSetup
            signedInEmail={signedInEmail}
            onBack={() => setStep("install")}
          />
        ) : null}
      </div>
    </div>
  );
}
