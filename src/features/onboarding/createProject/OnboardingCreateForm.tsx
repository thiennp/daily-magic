import OnboardingCreateFormFields from "@/features/onboarding/createProject/OnboardingCreateFormFields";
import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import {
  OB_ACT_CLASS,
  OB_H1_CLASS,
  OB_LEAD_CLASS,
  OB_PRIMARY_BTN_CLASS,
  OB_SECONDARY_BTN_CLASS,
} from "@/features/onboarding/onboardingShellClasses.constant";

interface OnboardingCreateFormProps {
  readonly name: string;
  readonly busy: boolean;
  readonly error: string | null;
  readonly onNameChange: (value: string) => void;
  readonly onIdea: (idea: string) => void;
  readonly onBack: () => void;
  readonly onSubmit: () => void;
}

export default function OnboardingCreateForm({
  name,
  busy,
  error,
  onNameChange,
  onIdea,
  onBack,
  onSubmit,
}: OnboardingCreateFormProps) {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      noValidate
    >
      <h1 id="ob-h" tabIndex={-1} className={OB_H1_CLASS}>
        {C.createTitle}
      </h1>
      <p className={OB_LEAD_CLASS}>{C.createLead}</p>
      <OnboardingCreateFormFields
        name={name}
        busy={busy}
        error={error}
        onNameChange={onNameChange}
        onIdea={onIdea}
      />
      <div className={OB_ACT_CLASS}>
        <button
          type="button"
          className={OB_SECONDARY_BTN_CLASS}
          onClick={onBack}
          disabled={busy}
        >
          {C.back}
        </button>
        <button type="submit" className={OB_PRIMARY_BTN_CLASS} disabled={busy}>
          {busy ? C.creating : C.createProject}
        </button>
      </div>
    </form>
  );
}
