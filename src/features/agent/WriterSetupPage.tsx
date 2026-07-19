"use client";

import { useCallback, useState } from "react";

import HarnessWriterAgentMark from "@/features/agent/icons/HarnessWriterAgentMark";
import { WRITER_SETUP_OPTIONS } from "@/features/agent/writerSetupOptions.constant";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { AGENT_WITCH_LOCAL_APP_ORIGIN } from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

const ensureWriterOnMac = async (
  writerAgent: HarnessWriterAgent,
): Promise<string> => {
  const response = await fetch("/api/agent-witch/writer/ensure", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ writerAgent }),
  });
  const body: unknown = await response.json();
  if (!response.ok) {
    if (
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof (body as { error: unknown }).error === "string"
    ) {
      return (body as { error: string }).error;
    }
    return "Could not reach your Mac.";
  }
  return "Ensure command sent to your Mac over WebSocket.";
};

export default function WriterSetupPage() {
  const [busyWriter, setBusyWriter] = useState<HarnessWriterAgent | null>(null);
  const [statusByWriter, setStatusByWriter] = useState<Record<string, string>>(
    {},
  );

  const ensureWriter = useCallback(async (writerAgent: HarnessWriterAgent) => {
    setBusyWriter(writerAgent);
    setStatusByWriter((previous) => ({
      ...previous,
      [writerAgent]: "Checking on your Mac…",
    }));
    try {
      const message = await ensureWriterOnMac(writerAgent);
      setStatusByWriter((previous) => ({
        ...previous,
        [writerAgent]: message,
      }));
    } catch {
      setStatusByWriter((previous) => ({
        ...previous,
        [writerAgent]: "Network error talking to agentwitch.com",
      }));
    } finally {
      setBusyWriter(null);
    }
  }, []);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Choose an AI for your Mac
      </h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Agent Witch will install and check login on the Mac linked to your
        account. You can change this later when you send a task.
      </p>
      <ul className="mt-8 space-y-3">
        {WRITER_SETUP_OPTIONS.map((writer) => (
          <li key={writer.id}>
            <button
              type="button"
              disabled={busyWriter !== null}
              onClick={() => {
                void ensureWriter(writer.id);
              }}
              className="flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:border-gray-400 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900"
            >
              <HarnessWriterAgentMark writerAgent={writer.id} />
              <span className="flex-1">
                <span className="block font-medium text-gray-900 dark:text-white">
                  {writer.label}
                </span>
                <span className="block text-sm text-gray-500">
                  {statusByWriter[writer.id] ?? writer.hint}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-gray-500">
        On the Mac, open the local Agent Witch UI for traffic and knowledge (
        <a
          href={AGENT_WITCH_LOCAL_APP_ORIGIN}
          className="font-medium text-zinc-700 underline-offset-4 hover:text-zinc-900 hover:underline"
        >
          {AGENT_WITCH_LOCAL_APP_ORIGIN}
        </a>
        ). Connection status here comes from the live WebSocket bridge, not that
        local page.
      </p>
    </main>
  );
}
