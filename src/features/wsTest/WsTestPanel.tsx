"use client";

import { useState } from "react";

import { useAgentWitchSocket } from "./hooks/useAgentWitchSocket";

import type { WsTestConnectionStatus } from "./types/WsTestConnectionStatus.type";

const CONNECTION_LABELS: Record<WsTestConnectionStatus, string> = {
  idle: "Idle",
  connecting: "Connecting…",
  connected: "Connected",
  disconnected: "Disconnected",
  error: "Connection error",
};

export default function WsTestPanel() {
  const { connectionStatus, lastResponse, sendClaudePrompt } =
    useAgentWitchSocket();
  const [prompt, setPrompt] = useState("");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <header className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-500">
          Agent Witch
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          WebSocket test
        </h1>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Send a task to the local Agent Witch client. When connected, it runs
          the Claude CLI on your computer.
        </p>
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          Status:{" "}
          <span className="font-medium text-brand-600 dark:text-brand-400">
            {CONNECTION_LABELS[connectionStatus]}
          </span>
        </p>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <label
          htmlFor="agent-witch-prompt"
          className="mb-2 block text-sm font-medium text-gray-800 dark:text-white/90"
        >
          Task for Claude CLI
        </label>
        <textarea
          id="agent-witch-prompt"
          value={prompt}
          onChange={(event) => {
            setPrompt(event.target.value);
          }}
          rows={8}
          placeholder="Describe what Claude should do on your local machine…"
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              sendClaudePrompt(prompt);
            }}
            disabled={
              connectionStatus !== "connected" || prompt.trim().length === 0
            }
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send to local agent
          </button>
          <button
            type="button"
            onClick={() => {
              setPrompt("");
            }}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
          >
            Clear
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
          Last WebSocket response
        </h2>
        <pre className="mt-3 max-h-80 overflow-auto rounded-lg bg-gray-50 p-4 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300">
          {lastResponse.length > 0 ? lastResponse : "No messages yet."}
        </pre>
      </section>
    </div>
  );
}
