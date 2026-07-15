"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import ConnectedClientsTable from "@/features/home/ConnectedClientsTable";
import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import type AgentWitchStatusResponse from "@/features/home/types/AgentWitchStatusResponse.type";
import type ConnectedClient from "@/features/home/types/ConnectedClient.type";

export default function ConnectedClientsList({
  compact = false,
}: {
  readonly compact?: boolean;
}) {
  const [clients, setClients] = useState<readonly ConnectedClient[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const loadClients = useCallback(async () => {
    const response = await fetch("/api/agent-witch/status");
    const payload = (await response.json()) as AgentWitchStatusResponse;

    if (!response.ok) {
      setMessage(payload.error ?? "Could not load connections.");
      return;
    }

    setMessage(null);
    setClients(payload.clients ?? []);
  }, []);

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    const refresh = async () => {
      if (isMountedRef.current) {
        await loadClients();
      }
    };

    void refresh();
    const intervalId = window.setInterval(() => {
      void refresh();
    }, 5000);

    return () => {
      isMountedRef.current = false;
      window.clearInterval(intervalId);
    };
  }, [loadClients]);

  const body =
    clients.length === 0 ? (
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Nothing connected yet.
      </p>
    ) : (
      <div className={compact ? "mt-2" : "mt-4"}>
        <ConnectedClientsTable clients={clients} />
      </div>
    );

  if (compact) {
    return (
      <>
        {message ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
        ) : null}
        {body}
      </>
    );
  }

  return (
    <AppPanel
      as="section"
      padding="compact"
      className="bg-gray-50 text-left dark:border-gray-700 dark:bg-white/[0.05]"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
          Active connections
        </h2>
        <button
          type="button"
          onClick={() => {
            void loadClients();
          }}
          className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-400"
        >
          Refresh
        </button>
      </div>
      <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Browsers and Macs currently connected to this server.
      </p>
      {message ? (
        <p className={`mt-4 ${APP_SURFACE_BODY_TEXT_CLASS}`}>{message}</p>
      ) : null}
      {body}
    </AppPanel>
  );
}
