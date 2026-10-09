import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import OnboardingAddBotBody from "@/features/onboarding/bot/OnboardingAddBotBody";
import OnboardingShell from "@/features/onboarding/OnboardingShell";
import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import { buildOnboardingUserChrome } from "@/features/onboarding/utils/buildOnboardingUserChrome";
import { requireOnboardingProjectId } from "@/features/onboarding/utils/requireOnboardingProjectId";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { getAuthActor } from "@/lib/auth/auth";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import { buildLoginCallbackPath } from "@/lib/shell/buildLoginCallbackPath";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Onboarding – Add assistant | ${AGENT_WITCH_PRODUCT_NAME}`,
  robots: { index: false, follow: false },
};

interface PageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function OnboardingAddAssistantPage({
  searchParams,
}: PageProps) {
  const actor = await getAuthActor();
  const params = await searchParams;
  const projectId = requireOnboardingProjectId(params.projectId);
  if (!actor) {
    const path = projectId
      ? `/onboarding/bot?projectId=${encodeURIComponent(projectId)}`
      : "/onboarding/project";
    redirect(buildLoginCallbackPath(path));
  }
  if (!projectId) {
    redirect("/onboarding/project");
  }
  const access = await authorizeProjectPageActor({
    projectId,
    actorUserId: actor.id,
  });
  // A viewer is read-only: adding assistants or tasks would be refused by the API.
  if (!access.ok || access.role === "viewer") {
    notFound();
  }
  const chrome = buildOnboardingUserChrome({
    name: actor.name,
    email: actor.email,
  });

  return (
    <OnboardingShell
      active="bot"
      projectId={projectId}
      skipConfirmText={C.botSkipText}
      userInitial={chrome.userInitial}
      userLabel={chrome.userLabel}
    >
      <OnboardingAddBotBody
        projectId={projectId}
        projectName={access.project.name}
      />
    </OnboardingShell>
  );
}
