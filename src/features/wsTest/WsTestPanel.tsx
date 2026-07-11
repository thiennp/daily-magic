"use client";

import { useState } from "react";

import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import { ConnectionStatusBadge } from "@/features/shell/ConnectionStatusBadge";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";
import { useAgentWitchSocket } from "./hooks/useAgentWitchSocket";

export default function WsTestPanel() {
  const { connectionStatus, lastResponse, sendClaudePrompt } =
    useAgentWitchSocket();
  const [prompt, setPrompt] = useState("");
  const host = typeof window !== "undefined" ? window.location.host : "";
  const isWebSocketSupported = isAgentWitchWebSocketSupportedHost(host);
  const isSendDisabled =
    connectionStatus !== "connected" || prompt.trim().length === 0;

  return (
    <div className="flex w-full flex-col gap-6">
      {!isWebSocketSupported ? (
        <AgentWitchUnsupportedHostNotice host={host} />
      ) : null}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Send a task to your paired local agent. When connected, it runs
              the Claude CLI on your computer.
            </p>
          </div>
          <ConnectionStatusBadge status={connectionStatus} />
        </div>
      </section>

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
            disabled={isSendDisabled}
            aria-describedby={
              isSendDisabled ? "agent-send-disabled-hint" : undefined
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
        {isSendDisabled ? (
          <p
            id="agent-send-disabled-hint"
            className="mt-3 text-sm text-gray-500 dark:text-gray-400"
          >
            {connectionStatus !== "connected"
              ? "Connect and pair your local agent from Home before sending a task."
              : "Enter a task description to continue."}
          </p>
        ) : null}
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
          Last response
        </h2>
        <pre className="mt-3 max-h-80 overflow-auto rounded-lg bg-gray-50 p-4 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300">
          {lastResponse.length > 0 ? lastResponse : "No messages yet."}
        </pre>
      </section>
    </div>
  );
}
