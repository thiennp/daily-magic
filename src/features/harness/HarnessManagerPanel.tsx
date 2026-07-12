"use client";

import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import HarnessItemEditor from "@/features/harness/components/HarnessItemEditor";
import HarnessLastRequestResult from "@/features/harness/components/HarnessLastRequestResult";
import HarnessLocalManifest from "@/features/harness/components/HarnessLocalManifest";
import HarnessManagerHeader from "@/features/harness/components/HarnessManagerHeader";
import HarnessSetManager from "@/features/harness/components/HarnessSetManager";
import type { UseAgentWitchHarnessSocketResult } from "@/features/harness/hooks/useAgentWitchHarnessSocket";
import { useHarnessManagerForm } from "@/features/harness/hooks/useHarnessManagerForm";
import listHarnessManifestSets from "@/lib/agentWitch/harness/listHarnessManifestSets";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";

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
    sendCreateHarnessSet,
    sendWriteHarnessItems,
    pairingStatus,
  } = harnessSocket;
  const form = useHarnessManagerForm();
  const availableSets = listHarnessManifestSets(localManifest);

  const host = typeof window !== "undefined" ? window.location.host : "";
  const isWebSocketSupported = isAgentWitchWebSocketSupportedHost(host);
  const isConnected =
    connectionStatus === "connected" && pairingStatus === "paired";

  const canCreateSet = isConnected && form.newSetName.trim().length > 0;
  const canSubmitItems = isConnected && form.readyItems.length > 0;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 text-left dark:border-gray-800 dark:bg-white/[0.03]">
      <HarnessManagerHeader connectionStatus={connectionStatus} />

      {!isWebSocketSupported ? (
        <div className="mt-4">
          <AgentWitchUnsupportedHostNotice host={host} />
        </div>
      ) : null}

      <HarnessSetManager
        localManifest={localManifest}
        newSetName={form.newSetName}
        writerAgent={form.writerAgent}
        canCreateSet={canCreateSet}
        onNewSetNameChange={form.setNewSetName}
        onWriterAgentChange={form.setWriterAgent}
        onCreateSet={() => {
          sendCreateHarnessSet({
            name: form.newSetName,
            writerAgent: form.writerAgent,
          });
          form.setNewSetName("");
        }}
      />

      <div className="mt-6 space-y-4">
        {form.items.map((item, index) => (
          <HarnessItemEditor
            key={item.id}
            item={item}
            index={index}
            availableSets={availableSets}
            canRemove={form.items.length > 1}
            onRemove={() => {
              form.removeItem(item.id);
            }}
            onChange={form.updateItem}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={form.addItem}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Add item
        </button>
        <button
          type="button"
          disabled={!canSubmitItems}
          onClick={() => {
            sendWriteHarnessItems({
              writerAgent: form.writerAgent,
              items: form.readyItems,
            });
          }}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send items to local writer
        </button>
      </div>

      {lastRequestResult ? (
        <HarnessLastRequestResult result={lastRequestResult} />
      ) : null}

      <HarnessLocalManifest
        localManifest={localManifest}
        manifestHostname={manifestHostname}
      />
    </section>
  );
}
