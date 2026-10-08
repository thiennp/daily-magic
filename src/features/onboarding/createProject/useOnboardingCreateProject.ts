"use client";

import { ONBOARDING_CREATE_COPY as CC } from "@/features/onboarding/createProject/onboardingCreateErrors.constant";
import { useCallback, useState } from "react";

import { createUserProjectFromComposer } from "@/features/agent/utils/createUserProjectFromComposer";
import { slugifyOnboardingProjectName } from "@/features/onboarding/utils/slugifyOnboardingProjectName";

export type OnboardingCreateView = "welcome" | "form" | "done";

export const useOnboardingCreateProject = () => {
  const [view, setView] = useState<OnboardingCreateView>("welcome");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  const [created, setCreated] = useState<{
    readonly id: string;
    readonly name: string;
  } | null>(null);

  const submit = useCallback(async () => {
    const trimmed = name.trim();
    const slug = slugifyOnboardingProjectName(trimmed);
    if (!trimmed) {
      setError(CC.nameRequired);
      return;
    }
    if (slug.length < 2) {
      setError(CC.nameTooShort);
      return;
    }
    setBusy(true);
    setError(null);
    setFailure(null);
    try {
      const result = await createUserProjectFromComposer({
        name: trimmed,
        folderPath: "",
        deviceId: "",
      });
      if (!result.ok) {
        setFailure(result.errorMessage);
        return;
      }
      setCreated({ id: result.project.id, name: result.project.name });
      setView("done");
    } finally {
      setBusy(false);
    }
  }, [name]);

  return {
    view,
    setView,
    name,
    setName,
    busy,
    error,
    setError,
    failure,
    created,
    submit,
  };
};
