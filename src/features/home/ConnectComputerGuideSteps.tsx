"use client";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_NESTED_CARD_CLASS,
  APP_SURFACE_STEP_BADGE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import DownloadAgentWitchAppButton from "@/features/home/DownloadAgentWitchAppButton";
import buildConnectComputerGuideSteps, {
  CONNECT_COMPUTER_DOWNLOAD_STEP_TITLE,
} from "@/features/home/utils/buildConnectComputerGuideSteps";
import type detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";

interface ConnectComputerGuideStepsProps {
  readonly operatingSystem: ReturnType<typeof detectBrowserOperatingSystem>;
  readonly dmgDownloadUrl: string;
  readonly isWebSocketSupported: boolean;
  readonly showDownloadCta: boolean;
  readonly onInstallEngaged: () => void;
}

export default function ConnectComputerGuideSteps({
  operatingSystem,
  dmgDownloadUrl,
  isWebSocketSupported,
  showDownloadCta,
  onInstallEngaged,
}: ConnectComputerGuideStepsProps) {
  const steps = buildConnectComputerGuideSteps(operatingSystem);

  return (
    <ol className="mt-6 space-y-4">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={`flex gap-4 ${APP_SURFACE_NESTED_CARD_CLASS}`}
        >
          <span className={`h-8 w-8 ${APP_SURFACE_STEP_BADGE_CLASS}`}>
            {index + 1}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white/90">
              {step.title}
            </p>
            <p className={`mt-1 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
              {step.description}
            </p>
            {isWebSocketSupported &&
            showDownloadCta &&
            step.title === CONNECT_COMPUTER_DOWNLOAD_STEP_TITLE ? (
              <DownloadAgentWitchAppButton
                dmgDownloadUrl={dmgDownloadUrl}
                onEngaged={onInstallEngaged}
              />
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
