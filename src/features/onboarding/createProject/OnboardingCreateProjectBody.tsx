"use client";

import OnboardingCreateDone from "@/features/onboarding/createProject/OnboardingCreateDone";
import OnboardingCreateForm from "@/features/onboarding/createProject/OnboardingCreateForm";
import OnboardingCreateWelcome from "@/features/onboarding/createProject/OnboardingCreateWelcome";
import { useOnboardingCreateProject } from "@/features/onboarding/createProject/useOnboardingCreateProject";
import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import { OB_CARD_CLASS } from "@/features/onboarding/onboardingShellClasses.constant";

export default function OnboardingCreateProjectBody() {
  const state = useOnboardingCreateProject();

  return (
    <>
      <section className={OB_CARD_CLASS} aria-labelledby="ob-h">
        {state.view === "welcome" ? (
          <OnboardingCreateWelcome onStart={() => state.setView("form")} />
        ) : null}
        {state.view === "form" ? (
          <OnboardingCreateForm
            name={state.name}
            busy={state.busy}
            error={state.error}
            onNameChange={(value) => {
              state.setError(null);
              state.setName(value);
            }}
            onIdea={(idea) => {
              state.setError(null);
              state.setName(idea);
            }}
            onBack={() => state.setView("welcome")}
            onSubmit={() => {
              void state.submit();
            }}
          />
        ) : null}
        {state.view === "done" && state.created ? (
          <OnboardingCreateDone
            projectId={state.created.id}
            projectName={state.created.name}
          />
        ) : null}
      </section>
      {state.view !== "done" ? (
        <p className="text-center text-[length:var(--awc-fs-sm)] text-awc-fg-muted">
          {C.skipNote}
        </p>
      ) : null}
    </>
  );
}
