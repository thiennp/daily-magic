import { headers } from "next/headers";

import HomeDashboardSectionClient from "@/features/home/HomeDashboardSectionClient";
import { buildLocalAgentInstallCommandFromHeaders } from "@/lib/agentWitch/buildLocalAgentInstallCommand";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";
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
  const { installCommand } =
    buildLocalAgentInstallCommandFromHeaders(requestHeaders);
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "";

  return (
    <HomeDashboardSectionClient
      user={user}
      installCommand={installCommand}
      isWebSocketSupported={isAgentWitchWebSocketSupportedHost(host)}
      host={host}
    />
  );
}
