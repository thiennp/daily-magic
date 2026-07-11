"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { formatClientId } from "@/features/home/formatClientId";
import { formatConnectedAt } from "@/features/home/formatConnectedAt";
import type AgentWitchStatusResponse from "@/features/home/types/AgentWitchStatusResponse.type";
import type ConnectedClient from "@/features/home/types/ConnectedClient.type";

export default function ConnectedClientsList() {
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

      {clients.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          No clients connected yet.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-3 py-2">Client</th>
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2">Connected at</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-gray-100 dark:border-gray-800/80"
                >
                  <td className="px-3 py-2 font-mono text-xs text-gray-700 dark:text-gray-300">
                    {formatClientId(client.id)}
                  </td>
                  <td className="px-3 py-2">{client.role}</td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {formatConnectedAt(client.connectedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
