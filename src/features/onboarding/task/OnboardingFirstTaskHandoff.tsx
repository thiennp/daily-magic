import Link from "next/link";

import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import {
  OB_ACT_CLASS,
  OB_CARD_CLASS,
  OB_H1_CLASS,
  OB_LEAD_CLASS,
  OB_PRIMARY_BTN_CLASS,
  OB_SECONDARY_BTN_CLASS,
} from "@/features/onboarding/onboardingShellClasses.constant";
import {
  buildOnboardingProjectChatHref,
  buildOnboardingStepHref,
} from "@/features/onboarding/utils/buildOnboardingStepHref";

interface OnboardingFirstTaskHandoffProps {
  readonly projectId: string;
  readonly projectName: string;
}

/**
 * HARD: no standalone New task page. Hand off into project chat (?chat=1).
 * Claude HTML showed an embedded chat mock — adapted per Product rule.
 */
export default function OnboardingFirstTaskHandoff({
  projectId,
  projectName,
}: OnboardingFirstTaskHandoffProps) {
  const chatHref = buildOnboardingProjectChatHref(projectId);
  const botHref =
    buildOnboardingStepHref("bot", projectId) ?? "/onboarding/bot";

  return (
    <section className={OB_CARD_CLASS} aria-labelledby="ob-h">
      <h1 id="ob-h" tabIndex={-1} className={OB_H1_CLASS}>
        {C.taskTitle}
      </h1>
      <p className={OB_LEAD_CLASS}>{C.taskLead(projectName)}</p>
      <div className="rounded-2xl bg-awc-accent-soft p-4 text-sm text-awc-blue-900">
        {C.taskHint}
      </div>
      <div className={OB_ACT_CLASS}>
        <Link href={botHref} className={OB_SECONDARY_BTN_CLASS}>
          {C.back}
        </Link>
        <Link href={chatHref} className={OB_PRIMARY_BTN_CLASS}>
          {C.taskCta}
        </Link>
      </div>
    </section>
  );
}
