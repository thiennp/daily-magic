"use client";

import { useSession } from "next-auth/react";
import { useSyncExternalStore } from "react";

import HomeConnectedMacsPanel from "@/features/home/HomeConnectedMacsPanel";
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
  const isWebSocketSupported = isAgentWitchWebSocketAvailableForHost(host);

  if (!isAuthenticated) {
    return null;
  }

  // No install-token on mount: this panel is mounted twice (desktop rail +
  // md:hidden mobile rail) on every AppShell page, and each POST reserves a
  // device row and revokes the previous placeholder token. Connect buttons
  // mint their own token when their modal opens.
  return (
    <HomeConnectedMacsPanel
      installCommand=""
      isWebSocketSupported={isWebSocketSupported}
      host={host}
    />
  );
}
