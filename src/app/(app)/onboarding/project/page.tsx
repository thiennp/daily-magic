import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  OnboardingCreateProjectBody,
  OnboardingShell,
} from "@/features/onboarding/public-api/presentation";
import {
  ONBOARDING_COPY as C,
  buildOnboardingUserChrome,
} from "@/features/onboarding/public-api/types";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { getAuthActor } from "@/lib/auth/auth";
import { buildLoginCallbackPath } from "@/lib/shell/buildLoginCallbackPath";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Onboarding – Create project | ${AGENT_WITCH_PRODUCT_NAME}`,
  robots: { index: false, follow: false },
};

export default async function OnboardingCreateProjectPage() {
  const actor = await getAuthActor();
  if (!actor) {
    redirect(buildLoginCallbackPath("/onboarding/project"));
  }
  const chrome = buildOnboardingUserChrome({
    name: actor.name,
    email: actor.email,
  });

  return (
    <OnboardingShell
      active="project"
      projectId={null}
      skipConfirmText={C.createSkipText}
      userInitial={chrome.userInitial}
      userLabel={chrome.userLabel}
    >
      <OnboardingCreateProjectBody />
    </OnboardingShell>
  );
}
