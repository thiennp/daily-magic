import { headers } from "next/headers";

import HomeDashboardSectionClient from "@/features/home/HomeDashboardSectionClient";
import { buildAppOriginFromHeaders } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { buildLocalAgentInstallCommandFromHeaders } from "@/lib/agentWitch/buildLocalAgentInstallCommand";
import { isAgentWitchWebSocketAvailableForHost } from "@/lib/agentWitch/isAgentWitchWebSocketAvailable";
import type { GlobalRoleValue } from "@/lib/auth/roles";

interface HomeDashboardSectionProps {
  readonly user: {
    readonly email: string;
    readonly name: string | null;
    readonly globalRole: GlobalRoleValue;
  };
}

export default async function HomeDashboardSection({
  user,
}: HomeDashboardSectionProps) {
  const requestHeaders = await headers();
  const appOrigin = buildAppOriginFromHeaders(requestHeaders);
  const { installCommand } =
    buildLocalAgentInstallCommandFromHeaders(requestHeaders);
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "";

  return (
    <HomeDashboardSectionClient
      user={user}
      appOrigin={appOrigin}
      installCommand={installCommand}
      isWebSocketSupported={isAgentWitchWebSocketAvailableForHost(host)}
      host={host}
    />
  );
}
