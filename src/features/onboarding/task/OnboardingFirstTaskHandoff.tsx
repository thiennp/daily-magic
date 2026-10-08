import OnboardingStepActions from "@/features/onboarding/OnboardingStepActions";
import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import {
  OB_CARD_CLASS,
  OB_H1_CLASS,
  OB_LEAD_CLASS,
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
      <OnboardingStepActions
        backHref={botHref}
        skip={{
          title: C.taskSkipConfirmTitle,
          text: C.taskSkipText,
          href: `/projects/${encodeURIComponent(projectId)}`,
        }}
        nextHref={chatHref}
        nextLabel={C.taskCta}
        nextEnabled
        nextWhy=""
      />
    </section>
  );
}
