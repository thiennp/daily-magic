"use client";

import { useState } from "react";

import AwcProjectConnectionDisconnectModal from "@/features/projects/settings/connections/AwcProjectConnectionDisconnectModal";
import AwcProjectConnectionRow from "@/features/projects/settings/connections/AwcProjectConnectionRow";
import AwcProjectConnectionsLoadNotes from "@/features/projects/settings/connections/AwcProjectConnectionsLoadNotes";
import type { ProjectConnectionProvider } from "@/features/projects/settings/connections/projectConnection.types";
import { PROJECT_CONNECTIONS_COPY as C } from "@/features/projects/settings/connections/projectConnectionsCopy.constant";
import { useProjectConnections } from "@/features/projects/settings/connections/useProjectConnections";

interface AwcProjectConnectionsSectionProps {
  readonly projectId: string;
  readonly isOwner: boolean;
}

/**
 * Settings → Connections (EN PASS UI). Six providers (Slack–Drive); owner-only mutate.
 * 404/501/network → Not connected + disabled Connect + honest unavailable line.
 */
export default function AwcProjectConnectionsSection({
  projectId,
  isOwner,
}: AwcProjectConnectionsSectionProps) {
  const { loadState, rows, reload } = useProjectConnections(projectId);
  const canMutate = isOwner && loadState === "ready";
  const [disconnectProvider, setDisconnectProvider] =
    useState<ProjectConnectionProvider | null>(null);
  const disconnectRow =
    disconnectProvider === null
      ? null
      : (rows.find((row) => row.provider === disconnectProvider) ?? null);
  const showList = loadState === "ready" || loadState === "unavailable";
  const allDisconnected =
    loadState === "ready" && rows.every((row) => row.status === "none");

  return (
    <section className="flex flex-col gap-2" aria-labelledby="p-set-conn-h">
      <h3
        id="p-set-conn-h"
        className="text-[13px] font-semibold text-awc-fg-muted dark:text-gray-400"
      >
        {C.heading}
      </h3>
      <p className="text-[13px] text-awc-fg-muted dark:text-gray-400">
        {C.intro}
      </p>
      <p className="text-[12px] text-awc-fg-muted dark:text-gray-400">
        {C.vsConnectHint}
      </p>
      <AwcProjectConnectionsLoadNotes
        loadState={loadState}
        isOwner={isOwner}
        onRetry={reload}
      />
      {showList ? (
        <>
          {allDisconnected ? (
            <p className="text-[13px] text-awc-fg-muted dark:text-gray-400">
              {C.empty}
            </p>
          ) : null}
          <p className="text-[13px] text-awc-fg-muted dark:text-gray-400">
            {C.vsResources}
          </p>
          <ul className="flex flex-col gap-2">
            {rows.map((item) => (
              <AwcProjectConnectionRow
                key={item.provider}
                item={item}
                isOwner={isOwner}
                canMutate={canMutate}
                projectId={projectId}
                onDisconnect={() => setDisconnectProvider(item.provider)}
              />
            ))}
          </ul>
        </>
      ) : null}
      <AwcProjectConnectionDisconnectModal
        item={disconnectRow}
        onClose={() => setDisconnectProvider(null)}
      />
    </section>
  );
}
