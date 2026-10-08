import Link from "next/link";

import OnboardingIcon from "@/features/onboarding/OnboardingIcon";
import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import {
  OB_PRIMARY_BTN_CLASS,
  OB_SECONDARY_BTN_CLASS,
} from "@/features/onboarding/onboardingShellClasses.constant";
import { buildOnboardingStepHref } from "@/features/onboarding/utils/buildOnboardingStepHref";

interface OnboardingCreateDoneProps {
  readonly projectId: string;
  readonly projectName: string;
}

export default function OnboardingCreateDone({
  projectId,
  projectName,
}: OnboardingCreateDoneProps) {
  const machineHref = buildOnboardingStepHref("machine", projectId) ?? "/";
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span
        className="grid h-16 w-16 place-items-center rounded-full bg-awc-ok-soft text-2xl text-awc-ok"
        aria-hidden="true"
      >
        <OnboardingIcon name="check" size={32} />
      </span>
      <h1
        id="ob-h"
        tabIndex={-1}
        className="text-[length:var(--awc-fs-h1)] font-bold tracking-[-0.02em] text-awc-blue-950"
      >
        {C.createdTitle}
      </h1>
      <p className="text-awc-fg-muted">{C.createdLead}</p>
      <div className="flex w-full items-center gap-3 rounded-[20px] bg-awc-tile p-4 text-left shadow-awc-card">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-awc-accent-soft text-awc-blue-700"
          aria-hidden="true"
        >
          <OnboardingIcon name="folder" size={22} />
        </span>
        <div className="min-w-0">
          <b className="block break-words text-awc-fg">{projectName}</b>
          <span className="text-[length:var(--awc-fs-sm)] text-awc-fg-muted">
            {C.createdOwnerLine}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Link
          href={`/projects/${encodeURIComponent(projectId)}`}
          className={OB_SECONDARY_BTN_CLASS}
        >
          {C.openProject}
        </Link>
        <Link href={machineHref} className={OB_PRIMARY_BTN_CLASS}>
          {C.connectComputer}
        </Link>
      </div>
    </div>
  );
}
