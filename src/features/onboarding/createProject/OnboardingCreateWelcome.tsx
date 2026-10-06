import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import { OB_PRIMARY_BTN_CLASS } from "@/features/onboarding/onboardingShellClasses.constant";

interface OnboardingCreateWelcomeProps {
  readonly onStart: () => void;
}

export default function OnboardingCreateWelcome({
  onStart,
}: OnboardingCreateWelcomeProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span
        className="grid h-[72px] w-[72px] place-items-center rounded-[22px] bg-gradient-to-br from-[#dbe7ff] to-[#e8e0ff] text-2xl text-awc-blue-700"
        aria-hidden="true"
      >
        ◆
      </span>
      <h1 id="ob-h" tabIndex={-1} className="text-[length:var(--awc-fs-h1)] font-bold tracking-[-0.02em] text-awc-blue-950">
        {C.welcomeTitle}
      </h1>
      <p className="text-awc-fg-muted">{C.welcomeLead}</p>
      <ul className="m-0 grid w-full list-none grid-cols-1 gap-3 p-0 text-left sm:grid-cols-3">
        {C.welcomePts.map((pt) => (
          <li
            key={pt.title}
            className="flex flex-col gap-1.5 rounded-2xl bg-awc-tile p-4"
          >
            <b className="font-bold text-awc-fg">{pt.title}</b>
            <span className="text-[length:var(--awc-fs-sm)] text-awc-fg-muted">
              {pt.detail}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <button type="button" className={OB_PRIMARY_BTN_CLASS} onClick={onStart}>
          {C.getStarted}
        </button>
      </div>
    </div>
  );
}
