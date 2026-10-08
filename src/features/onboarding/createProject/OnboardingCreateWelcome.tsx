import AgentWitchLogoMark from "@/components/branding/AgentWitchLogoMark";
import OnboardingIcon, {
  type OnboardingIconName,
} from "@/features/onboarding/OnboardingIcon";
import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import { OB_PRIMARY_BTN_CLASS } from "@/features/onboarding/onboardingShellClasses.constant";

const PT_ICONS: readonly OnboardingIconName[] = ["send", "folder", "lock"];

interface OnboardingCreateWelcomeProps {
  readonly onStart: () => void;
}

export default function OnboardingCreateWelcome({
  onStart,
}: OnboardingCreateWelcomeProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span
        className="grid h-[72px] w-[72px] place-items-center rounded-[22px] bg-gradient-to-br from-awc-accent-soft to-awc-accent-soft-2 text-awc-blue-700"
        aria-hidden="true"
      >
        <AgentWitchLogoMark className="h-10 w-10" />
      </span>
      <h1
        id="ob-h"
        tabIndex={-1}
        className="text-[length:var(--awc-fs-h1)] font-bold tracking-[-0.02em] text-awc-blue-950"
      >
        {C.welcomeTitle}
      </h1>
      <p className="text-awc-fg-muted">{C.welcomeLead}</p>
      <ul className="m-0 grid w-full list-none grid-cols-1 gap-3 p-0 text-left sm:grid-cols-3">
        {C.welcomePts.map((pt, index) => (
          <li
            key={pt.title}
            className="flex flex-col gap-1.5 rounded-2xl bg-awc-tile p-4"
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-xl bg-awc-surface text-awc-blue-600"
              aria-hidden="true"
            >
              <OnboardingIcon name={PT_ICONS[index] ?? "send"} />
            </span>
            <b className="font-bold text-awc-fg">{pt.title}</b>
            <span className="text-[length:var(--awc-fs-sm)] text-awc-fg-muted">
              {pt.detail}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <button
          type="button"
          className={OB_PRIMARY_BTN_CLASS}
          onClick={onStart}
        >
          {C.getStarted}
        </button>
      </div>
    </div>
  );
}
