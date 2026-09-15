"use client";

import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN } from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

interface HomeOpenLocalConsoleLinkProps {
  readonly className?: string;
  readonly label?: string;
}

export default function HomeOpenLocalConsoleLink({
  className = "",
  label = "Open Mac console",
}: HomeOpenLocalConsoleLinkProps) {
  return (
    <a
      href={AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN}
      target="_blank"
      rel="noopener noreferrer"
      className={`${APP_SURFACE_CTA_SECONDARY_SM_CLASS} ${className}`.trim()}
    >
      {label}
    </a>
  );
}
