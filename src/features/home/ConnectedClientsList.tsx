"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import ConnectedClientsTable from "@/features/home/ConnectedClientsTable";
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
      setMessage(payload.error ?? "Could not load connected clients.");
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
        No clients connected yet.
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
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-left dark:border-gray-700 dark:bg-gray-900/50">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
          Connected clients
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
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Live Agent Witch WebSocket connections on this server.
      </p>
      {message ? (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {message}
        </p>
      ) : null}
      {body}
    </section>
  );
}
