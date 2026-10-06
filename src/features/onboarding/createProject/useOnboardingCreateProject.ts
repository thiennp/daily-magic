"use client";

import { useCallback, useState } from "react";

import { createUserProjectFromComposer } from "@/features/agent/utils/createUserProjectFromComposer";
import { slugifyOnboardingProjectName } from "@/features/onboarding/utils/slugifyOnboardingProjectName";

export type OnboardingCreateView = "welcome" | "form" | "done";

export const useOnboardingCreateProject = () => {
  const [view, setView] = useState<OnboardingCreateView>("welcome");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<{
    readonly id: string;
    readonly name: string;
  } | null>(null);

  const submit = useCallback(async () => {
    const trimmed = name.trim();
    const slug = slugifyOnboardingProjectName(trimmed);
    if (!trimmed) {
      setError("Give your project a name.");
      return;
    }
    if (slug.length < 2) {
      setError("Use at least 2 letters or numbers.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const result = await createUserProjectFromComposer({
        name: trimmed,
        folderPath: "",
        deviceId: "",
      });
      if (!result.ok) {
        setError(result.errorMessage);
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
    description,
    setDescription,
    busy,
    error,
    setError,
    created,
    submit,
  };
};
