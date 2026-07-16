"use client";

import { useMemo } from "react";

import { APP_SURFACE_CTA_SECONDARY_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectAnotherMacButton from "@/features/home/ConnectAnotherMacButton";
import { buildAgentWitchInstallScriptUrl } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";

interface SendTaskComposerConnectMacButtonProps {
  readonly hasExistingDevices: boolean;
}

export default function SendTaskComposerConnectMacButton({
  hasExistingDevices,
}: SendTaskComposerConnectMacButtonProps) {
  const connectContext = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        installCommand: "",
        host: "",
        isWebSocketSupported: true,
      };
    }

    const origin = window.location.origin;
    const installScriptUrl = buildAgentWitchInstallScriptUrl(origin);
    const host = window.location.host;

    return {
      installCommand: `curl -fsSL ${installScriptUrl} | bash`,
      host,
      isWebSocketSupported: isAgentWitchWebSocketSupportedHost(host),
    };
  }, []);

  return (
    <ConnectAnotherMacButton
      installCommand={connectContext.installCommand}
      isWebSocketSupported={connectContext.isWebSocketSupported}
      host={connectContext.host}
      hasExistingDevices={hasExistingDevices}
      className={`${APP_SURFACE_CTA_SECONDARY_CLASS} w-full`}
    />
  );
}
