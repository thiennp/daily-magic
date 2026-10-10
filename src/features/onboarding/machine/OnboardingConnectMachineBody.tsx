"use client";

import { useRouter } from "next/navigation";

import ComputersDownloadLink from "@/features/home/ComputersDownloadLink";
import HomeConnectComputerGuide from "@/features/home/HomeConnectComputerGuide";
import HomeConnectedMacsPanel from "@/features/home/HomeConnectedMacsPanel";
import { useHomeConnectedMacs } from "@/features/home/hooks/public-api/presentation";
import OnboardingMachineStatus from "@/features/onboarding/machine/OnboardingMachineStatus";
import OnboardingStepActions from "@/features/onboarding/OnboardingStepActions";
import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import {
  OB_CARD_CLASS,
  OB_H1_CLASS,
  OB_LEAD_CLASS,
  OB_PRIMARY_BTN_CLASS,
} from "@/features/onboarding/onboardingShellClasses.constant";
import { buildOnboardingStepHref } from "@/features/onboarding/utils/buildOnboardingStepHref";
import { buildAgentWitchLocalMacAppDownloadUrl } from "@/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl";

interface OnboardingConnectMachineBodyProps {
  readonly projectId: string;
  readonly projectName: string;
  readonly appOrigin: string;
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
}

/**
 * Reuses Home connect guide + ComputersDownloadLink.
 * HARD: Download AgentWitch Local stays visible when a computer is connected
 * (title may flip to “Connect another computer”; button stays).
 */
export default function OnboardingConnectMachineBody({
  projectId,
  projectName,
  appOrigin,
  installCommand,
  isWebSocketSupported,
  host,
}: OnboardingConnectMachineBodyProps) {
  const router = useRouter();
  const { devices, isLoading } = useHomeConnectedMacs();
  const connected = !isLoading && devices.length > 0;
  const firstDevice = devices.find((d) => d.isOnline) ?? devices[0] ?? null;
  const botHref = buildOnboardingStepHref("bot", projectId);
  const backHref =
    buildOnboardingStepHref("project", null) ?? "/onboarding/project";
  const downloadHref = buildAgentWitchLocalMacAppDownloadUrl();

  return (
    <section className={OB_CARD_CLASS} aria-labelledby="ob-h">
      <h1 id="ob-h" tabIndex={-1} className={OB_H1_CLASS}>
        {connected ? C.machineTitleReady : C.machineTitle}
      </h1>
      <p className={OB_LEAD_CLASS}>
        {connected ? C.machineLeadReady(projectName) : C.machineLead}
      </p>

      <div className="flex flex-col gap-3 rounded-2xl bg-awc-tile p-4">
        <b className="text-awc-fg">
          {connected ? C.downloadTitleAnother : C.downloadTitle}
        </b>
        <div className="flex flex-wrap items-center gap-3">
          <a href={downloadHref} className={OB_PRIMARY_BTN_CLASS}>
            {C.downloadButton}
          </a>
          <ComputersDownloadLink className="text-sm font-medium text-awc-blue-700 underline-offset-2 hover:underline" />
        </div>
      </div>

      <HomeConnectedMacsPanel
        installCommand={installCommand}
        isWebSocketSupported={isWebSocketSupported}
        host={host}
        embedded
      />

      {!connected ? (
        <HomeConnectComputerGuide
          appOrigin={appOrigin}
          installCommand={installCommand}
          isWebSocketSupported={isWebSocketSupported}
          host={host}
          onLinked={() => {
            router.refresh();
          }}
        />
      ) : null}

      <OnboardingMachineStatus
        connected={connected}
        isLoading={isLoading}
        computerName={
          firstDevice?.displayName ?? firstDevice?.deviceLabel ?? null
        }
        isOnline={firstDevice?.isOnline ?? false}
        projectName={projectName}
      />

      <OnboardingStepActions
        backHref={backHref}
        skip={
          connected || !botHref
            ? null
            : {
                title: C.machineSkipConfirmTitle,
                text: C.machineSkipText,
                href: botHref,
              }
        }
        nextHref={botHref}
        nextLabel={C.machineContinue}
        nextEnabled={connected}
        nextWhy={C.machineNeedConnect}
      />
    </section>
  );
}
