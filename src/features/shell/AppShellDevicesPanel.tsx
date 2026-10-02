"use client";

import { useSession } from "next-auth/react";
import { useSyncExternalStore } from "react";

import HomeConnectedMacsPanel from "@/features/home/HomeConnectedMacsPanel";
import usePersonalizedAgentWitchInstallCommand from "@/features/home/hooks/usePersonalizedAgentWitchInstallCommand";
import { isAgentWitchWebSocketAvailableForHost } from "@/lib/agentWitch/isAgentWitchWebSocketAvailable";

const subscribeHost = (): (() => void) => () => undefined;

const getHostSnapshot = (): string =>
  typeof window !== "undefined" ? window.location.host : "";

const getServerHostSnapshot = (): string => "";

export default function AppShellDevicesPanel() {
  const { data: session, status } = useSession();
  const host = useSyncExternalStore(
    subscribeHost,
    getHostSnapshot,
    getServerHostSnapshot,
  );
  const isAuthenticated = status === "authenticated" && session !== null;
  const { installCommand } = usePersonalizedAgentWitchInstallCommand({
    enabled: isAuthenticated,
    fallbackInstallCommand: "",
  });
  const isWebSocketSupported = isAgentWitchWebSocketAvailableForHost(host);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <HomeConnectedMacsPanel
      installCommand={installCommand}
      isWebSocketSupported={isWebSocketSupported}
      host={host}
    />
  );
}
