"use client";

import AwcProjectConnectionConnectDialog from "@/features/projects/settings/connections/AwcProjectConnectionConnectDialog";
import AwcProjectConnectionDisconnectModal from "@/features/projects/settings/connections/AwcProjectConnectionDisconnectModal";
import AwcProjectConnectionRow from "@/features/projects/settings/connections/AwcProjectConnectionRow";
import AwcProjectConnectionsEmpty from "@/features/projects/settings/connections/AwcProjectConnectionsEmpty";
import AwcProjectConnectionsHeading from "@/features/projects/settings/connections/AwcProjectConnectionsHeading";
import AwcProjectConnectionsLoadNotes from "@/features/projects/settings/connections/AwcProjectConnectionsLoadNotes";
import AwcProjectConnectionsNotice from "@/features/projects/settings/connections/AwcProjectConnectionsNotice";
import { useProjectConnectionsActions } from "@/features/projects/settings/connections/useProjectConnectionsActions";
import { useProjectConnections } from "@/features/projects/settings/connections/useProjectConnections";
import { PROJECT_PANEL_CARD_CLASS as CARD } from "@/features/projects/public-api/types";

interface AwcProjectConnectionsSectionProps {
  readonly projectId: string;
  readonly projectName: string;
  readonly isOwner: boolean;
}

/**
 * Settings → Connections (design: AgentWitch – Project Connections). Six
 * providers; owner-only Connect / Reconnect (OAuth window) / Disconnect.
 * 404/501/network → Not connected + disabled actions + honest unavailable line.
 */
export default function AwcProjectConnectionsSection({
  projectId,
  projectName,
  isOwner,
}: AwcProjectConnectionsSectionProps) {
  const { loadState, rows, reload } = useProjectConnections(projectId);
  const { notice, connectFlow, disconnect } = useProjectConnectionsActions({
    projectId,
    reload,
  });
  const canMutate = isOwner && loadState === "ready";
  const showList = loadState === "ready" || loadState === "unavailable";
  const allDisconnected =
    loadState === "ready" &&
    rows.every((row) => row.status === "none") &&
    rows.some((row) => row.connectEnabled);
  const current = connectFlow.state;

  return (
    <section
      className={`flex flex-col gap-3 ${CARD}`}
      aria-labelledby="p-set-conn-h"
    >
      <AwcProjectConnectionsHeading
        rows={rows}
        showSummary={loadState === "ready"}
      />
      <AwcProjectConnectionsLoadNotes
        loadState={loadState}
        isOwner={isOwner}
        onRetry={reload}
      />
      <AwcProjectConnectionsNotice notice={notice} />
      {allDisconnected ? <AwcProjectConnectionsEmpty /> : null}
      {showList ? (
        <ul
          aria-label="Services"
          className="divide-y divide-awc-border overflow-hidden"
        >
          {rows.map((item) => (
            <AwcProjectConnectionRow
              key={item.provider}
              item={item}
              isOwner={isOwner}
              canMutate={canMutate}
              projectId={projectId}
              onConnect={(reconnect) =>
                void connectFlow.begin(item.provider, reconnect)
              }
              onDisconnect={() => disconnect.open(item.provider)}
            />
          ))}
        </ul>
      ) : null}
      <AwcProjectConnectionDisconnectModal
        item={rows.find((r) => r.provider === disconnect.target) ?? null}
        isConfirming={disconnect.busy}
        onClose={disconnect.close}
        onConfirm={() => void disconnect.confirm()}
      />
      <AwcProjectConnectionConnectDialog
        state={current}
        projectName={projectName}
        onCancel={connectFlow.cancel}
        onRetry={() => {
          if (current !== null)
            void connectFlow.begin(current.provider, current.reconnect);
        }}
      />
    </section>
  );
}
