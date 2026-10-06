import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import OnboardingConnectMachineBody from "@/features/onboarding/machine/OnboardingConnectMachineBody";
import OnboardingShell from "@/features/onboarding/OnboardingShell";
import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import { buildOnboardingUserChrome } from "@/features/onboarding/utils/buildOnboardingUserChrome";
import { requireOnboardingProjectId } from "@/features/onboarding/utils/requireOnboardingProjectId";
import { buildAppOriginFromHeaders } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { buildLocalAgentInstallUrlsFromHeaders } from "@/lib/agentWitch/buildLocalAgentInstallCommand";
import { isAgentWitchWebSocketAvailableForHost } from "@/lib/agentWitch/isAgentWitchWebSocketAvailable";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { getAuthActor } from "@/lib/auth/auth";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import { buildLoginCallbackPath } from "@/lib/shell/buildLoginCallbackPath";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Onboarding – Connect computer | ${AGENT_WITCH_PRODUCT_NAME}`,
  robots: { index: false, follow: false },
};

interface PageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function OnboardingConnectComputerPage({
  searchParams,
}: PageProps) {
  const actor = await getAuthActor();
  const params = await searchParams;
  const projectId = requireOnboardingProjectId(params.projectId);
  if (!actor) {
    const path = projectId
      ? `/onboarding/machine?projectId=${encodeURIComponent(projectId)}`
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
  if (!access.ok) {
    notFound();
  }

  const requestHeaders = await headers();
  const appOrigin = buildAppOriginFromHeaders(requestHeaders);
  const { installCommand } =
    buildLocalAgentInstallUrlsFromHeaders(requestHeaders);
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "";
  const isWebSocketSupported = isAgentWitchWebSocketAvailableForHost(host);
  const chrome = buildOnboardingUserChrome({
    name: actor.name,
    email: actor.email,
  });

  return (
    <OnboardingShell
      active="machine"
      projectId={projectId}
      skipConfirmText={C.machineSkipText}
      userInitial={chrome.userInitial}
      userLabel={chrome.userLabel}
    >
      <OnboardingConnectMachineBody
        projectId={projectId}
        projectName={access.project.name}
        appOrigin={appOrigin}
        installCommand={installCommand}
        isWebSocketSupported={isWebSocketSupported}
        host={host}
      />
    </OnboardingShell>
  );
}
