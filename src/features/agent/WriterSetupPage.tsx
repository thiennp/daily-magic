"use client";

import { useCallback, useState } from "react";

import WriterSetupPageFooter from "@/features/agent/components/WriterSetupPageFooter";
import HarnessWriterAgentMark from "@/features/agent/icons/HarnessWriterAgentMark";
import { ensureWriterOnMac } from "@/features/agent/utils/ensureWriterOnMac.util";
import { WRITER_SETUP_OPTIONS } from "@/features/agent/writerSetupOptions.constant";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export default function WriterSetupPage() {
  const [busyWriter, setBusyWriter] = useState<HarnessWriterAgent | null>(null);
  const [statusByWriter, setStatusByWriter] = useState<Record<string, string>>(
    {},
  );

  const ensureWriter = useCallback(async (writerAgent: HarnessWriterAgent) => {
    setBusyWriter(writerAgent);
    setStatusByWriter((previous) => ({
      ...previous,
      [writerAgent]: "Checking on your computer…",
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
    <main className="mx-auto max-w-2xl px-4 py-10 pb-32 md:pb-10">
      <h1 className="text-2xl font-semibold text-awc-fg dark:text-white">
        Choose an AI for your computer
      </h1>
      <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-300">
        AgentWitch will install and check login on the computer linked to your
        account. You can change this later from New task.
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
              className="flex w-full items-center gap-4 rounded-xl border border-awc-border bg-white p-4 text-left transition hover:border-gray-400 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900"
            >
              <HarnessWriterAgentMark writerAgent={writer.id} />
              <span className="flex-1">
                <span className="block font-medium text-awc-fg dark:text-white">
                  {writer.label}
                </span>
                <span className="block text-sm text-awc-fg-muted dark:text-gray-400">
                  {statusByWriter[writer.id] ?? writer.hint}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <WriterSetupPageFooter />
    </main>
  );
}
