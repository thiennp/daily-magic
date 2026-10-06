import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import { OB_FIELD_CLASS } from "@/features/onboarding/onboardingShellClasses.constant";
import { slugifyOnboardingProjectName } from "@/features/onboarding/utils/slugifyOnboardingProjectName";

interface OnboardingCreateFormFieldsProps {
  readonly name: string;
  readonly busy: boolean;
  readonly error: string | null;
  readonly onNameChange: (value: string) => void;
  readonly onIdea: (idea: string) => void;
}

export default function OnboardingCreateFormFields({
  name,
  busy,
  error,
  onNameChange,
  onIdea,
}: OnboardingCreateFormFieldsProps) {
  const slug = slugifyOnboardingProjectName(name);
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-awc-fg" htmlFor="ob-pn">
          {C.projectNameLabel}
        </label>
        <input
          id="ob-pn"
          className={OB_FIELD_CLASS}
          maxLength={40}
          autoComplete="off"
          spellCheck={false}
          value={name}
          disabled={busy}
          aria-invalid={error ? true : undefined}
          aria-describedby="ob-pn-h"
          onChange={(event) => onNameChange(event.target.value)}
        />
        <p className="text-[length:var(--awc-fs-sm)] text-awc-fg-muted" id="ob-pn-h">
          {slug ? C.projectNameSavedAs(slug) : C.projectNameHelp}
        </p>
        {error ? (
          <p className="text-sm text-awc-bad" role="alert">
            {error}
          </p>
        ) : null}
      </div>
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label={C.nameIdeasLabel}
      >
        <span className="text-awc-fg-muted">{C.nameIdeasLabel}</span>
        {C.nameIdeas.map((idea) => (
          <button
            key={idea}
            type="button"
            className="rounded-full border border-awc-border-strong bg-awc-surface px-3 py-1 text-xs font-medium text-awc-fg hover:bg-awc-tile"
            onClick={() => onIdea(idea)}
            disabled={busy}
          >
            {idea}
          </button>
        ))}
      </div>
    </>
  );
}
