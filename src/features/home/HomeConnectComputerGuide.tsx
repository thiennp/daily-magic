"use client";

import { useSyncExternalStore } from "react";

import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import CopyableBashCommand from "@/features/home/CopyableBashCommand";
import buildConnectComputerGuideSteps from "@/features/home/utils/buildConnectComputerGuideSteps";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";

interface HomeConnectComputerGuideProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
}

const subscribeToOperatingSystem = () => () => undefined;

const getServerOperatingSystemSnapshot = () => "other" as const;

export default function HomeConnectComputerGuide({
  installCommand,
  isWebSocketSupported,
  host,
}: HomeConnectComputerGuideProps) {
  const operatingSystem = useSyncExternalStore(
    subscribeToOperatingSystem,
    detectBrowserOperatingSystem,
    getServerOperatingSystemSnapshot,
  );
  const steps = buildConnectComputerGuideSteps(operatingSystem);

  return (
    <section className="overflow-hidden rounded-3xl border border-brand-200/80 bg-gradient-to-br from-brand-50 via-white to-white p-8 shadow-theme-sm ring-1 ring-brand-100/80 dark:border-brand-900/40 dark:from-brand-950/30 dark:via-white/[0.02] dark:to-white/[0.02] dark:ring-brand-900/30">
      <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
        Connect your computer
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
        Link this account to your Mac
      </h1>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        Follow these steps on the Mac you want Agent Witch to run on. When
        pairing is complete, you can send tasks from this browser.
      </p>

      {!isWebSocketSupported ? (
        <div className="mt-6">
          <AgentWitchUnsupportedHostNotice host={host} />
        </div>
      ) : null}

      <ol className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex gap-4 rounded-xl border border-gray-200 bg-white/80 p-4 dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white">
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white/90">
                {step.title}
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {isWebSocketSupported ? (
        <CopyableBashCommand command={installCommand} iconOnly />
      ) : null}
    </section>
  );
}
