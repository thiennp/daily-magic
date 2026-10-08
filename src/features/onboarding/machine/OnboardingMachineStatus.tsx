"use client";

import { useOnboardingOnline } from "@/features/onboarding/hooks/useOnboardingOnline";
import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";

interface OnboardingMachineStatusProps {
  readonly connected: boolean;
  readonly isLoading: boolean;
  readonly computerName: string | null;
  readonly isOnline: boolean;
  readonly projectName: string;
}

/** Design status panel: waiting (live) or connected, announced politely. */
export default function OnboardingMachineStatus({
  connected,
  isLoading,
  computerName,
  isOnline,
  projectName,
}: OnboardingMachineStatusProps) {
  const online = useOnboardingOnline();
  if (isLoading) {
    return null;
  }
  if (connected) {
    return (
      <div
        role="status"
        className="flex items-center gap-3 rounded-2xl bg-awc-ok-soft p-4 text-awc-ok"
      >
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full bg-awc-ok-dot"
          aria-hidden="true"
        />
        <div>
          <div className="font-semibold">
            {computerName ?? C.machineTitleReady} {C.machineConnectedText}
          </div>
          <div className="text-[length:var(--awc-fs-sm)]">
            {isOnline ? "Online" : "Offline"} · {projectName}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      role="status"
      className="flex items-center gap-3 rounded-2xl bg-awc-tile p-4"
    >
      <span
        className={`h-2.5 w-2.5 shrink-0 rounded-full ${online ? "animate-pulse bg-awc-blue-500" : "bg-awc-warn-dot"}`}
        aria-hidden="true"
      />
      <div>
        <div className="font-semibold text-awc-fg">
          {online ? C.machineWaitingTitle : C.machinePausedTitle}
        </div>
        <div className="text-[length:var(--awc-fs-sm)] text-awc-fg-muted">
          {online ? C.machineWaitingText : C.machinePausedText}
        </div>
      </div>
    </div>
  );
}
