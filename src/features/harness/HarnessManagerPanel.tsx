"use client";

import { useMemo, useState } from "react";

import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import {
  createHarnessItemId,
  HARNESS_KIND_OPTIONS,
  HARNESS_WRITER_OPTIONS,
} from "@/features/harness/constants/harnessFormOptions";
import type { UseAgentWitchHarnessSocketResult } from "@/features/harness/hooks/useAgentWitchHarnessSocket";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";
import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";
import type HarnessItemSpec from "@/lib/agentWitch/harness/types/HarnessItemSpec.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { WsTestConnectionStatus } from "@/features/wsTest/types/WsTestConnectionStatus.type";

const CONNECTION_LABELS: Record<WsTestConnectionStatus, string> = {
  idle: "Idle",
  connecting: "Connecting…",
  connected: "Connected",
  disconnected: "Disconnected",
  error: "Connection error",
};

interface HarnessItemDraft {
  readonly id: string;
  readonly kind: HarnessItemKind;
  readonly title: string;
  readonly content: string;
}

const createEmptyItem = (): HarnessItemDraft => ({
  id: createHarnessItemId(),
  kind: "rule",
  title: "",
  content: "",
});

export default function HarnessManagerPanel({
  harnessSocket,
}: {
  readonly harnessSocket: UseAgentWitchHarnessSocketResult;
}) {
  const {
    connectionStatus,
    localManifest,
    manifestHostname,
    lastRequestResult,
    sendHarnessRequest,
    pairingStatus,
  } = harnessSocket;
  const [setName, setSetName] = useState("");
  const [writerAgent, setWriterAgent] =
    useState<HarnessWriterAgent>("claude-cli");
  const [items, setItems] = useState<readonly HarnessItemDraft[]>([
    createEmptyItem(),
  ]);

  const host = typeof window !== "undefined" ? window.location.host : "";
  const isWebSocketSupported = isAgentWitchWebSocketSupportedHost(host);

  const readyItems = useMemo(
    (): readonly HarnessItemSpec[] =>
      items
        .filter(
          (item) =>
            item.title.trim().length > 0 && item.content.trim().length > 0,
        )
        .map((item) => ({
          id: item.id,
          kind: item.kind,
          title: item.title.trim(),
          content: item.content.trim(),
        })),
    [items],
  );

  const canSubmit =
    connectionStatus === "connected" &&
    pairingStatus === "paired" &&
    setName.trim().length > 0 &&
    readyItems.length > 0;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 text-left dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
            Local harness
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create a harness request in the browser, choose which local writer
            should materialize it, and view what your online local agent reports
            back. Nothing is stored on the server.
          </p>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Status:{" "}
          <span className="font-medium text-brand-600 dark:text-brand-400">
            {CONNECTION_LABELS[connectionStatus]}
          </span>
        </p>
      </div>

      {!isWebSocketSupported ? (
        <div className="mt-4">
          <AgentWitchUnsupportedHostNotice host={host} />
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-gray-800 dark:text-white/90">
            Harness set name
          </span>
          <input
            type="text"
            value={setName}
            onChange={(event) => {
              setSetName(event.target.value);
            }}
            placeholder="My frontend rules"
            className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-gray-800 dark:text-white/90">
            Writer agent
          </span>
          <select
            value={writerAgent}
            onChange={(event) => {
              setWriterAgent(event.target.value as HarnessWriterAgent);
            }}
            className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            {HARNESS_WRITER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Item {index + 1}
              </p>
              {items.length > 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    setItems((current) =>
                      current.filter((entry) => entry.id !== item.id),
                    );
                  }}
                  className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Remove
                </button>
              ) : null}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="block text-sm">
                <span className="font-medium text-gray-800 dark:text-white/90">
                  Type
                </span>
                <select
                  value={item.kind}
                  onChange={(event) => {
                    const nextKind = event.target.value as HarnessItemKind;
                    setItems((current) =>
                      current.map((entry) =>
                        entry.id === item.id
                          ? { ...entry, kind: nextKind }
                          : entry,
                      ),
                    );
                  }}
                  className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                >
                  {HARNESS_KIND_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm">
                <span className="font-medium text-gray-800 dark:text-white/90">
                  Title
                </span>
                <input
                  type="text"
                  value={item.title}
                  onChange={(event) => {
                    const nextTitle = event.target.value;
                    setItems((current) =>
                      current.map((entry) =>
                        entry.id === item.id
                          ? { ...entry, title: nextTitle }
                          : entry,
                      ),
                    );
                  }}
                  placeholder="Prefer const"
                  className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
              </label>
            </div>

            <label className="mt-3 block text-sm">
              <span className="font-medium text-gray-800 dark:text-white/90">
                Content
              </span>
              <textarea
                value={item.content}
                onChange={(event) => {
                  const nextContent = event.target.value;
                  setItems((current) =>
                    current.map((entry) =>
                      entry.id === item.id
                        ? { ...entry, content: nextContent }
                        : entry,
                    ),
                  );
                }}
                rows={6}
                placeholder="Harness content for the selected writer to save locally…"
                className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
            </label>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            setItems((current) => [...current, createEmptyItem()]);
          }}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Add item
        </button>
        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => {
            sendHarnessRequest({
              setName,
              writerAgent,
              items: readyItems,
            });
          }}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send to local writer
        </button>
      </div>

      {lastRequestResult ? (
        <div className="mt-6 rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-900/60">
          <p className="font-medium text-gray-800 dark:text-white/90">
            Last request: {lastRequestResult.success ? "success" : "failed"} (
            {lastRequestResult.writerAgent})
          </p>
          {lastRequestResult.errorMessage ? (
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {lastRequestResult.errorMessage}
            </p>
          ) : null}
          {lastRequestResult.output ? (
            <pre className="mt-3 max-h-48 overflow-auto text-xs text-gray-700 dark:text-gray-300">
              {lastRequestResult.output}
            </pre>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
          Reported local harness
        </h3>
        {localManifest ? (
          <>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Machine: {manifestHostname ?? "unknown"}
            </p>
            <pre className="mt-3 max-h-80 overflow-auto rounded-lg bg-gray-50 p-4 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300">
              {JSON.stringify(localManifest, null, 2)}
            </pre>
          </>
        ) : (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            No local harness manifest reported yet. Connect your local agent and
            send a harness request.
          </p>
        )}
      </div>
    </section>
  );
}
