"use client";

import { useCallback, useMemo, useState } from "react";

import AwcProjectMessengerGateView, {
  resolveMessengerGate,
} from "@/features/projects/messenger/AwcProjectMessengerGate";
import AwcMessengerNoComputerHint from "@/features/projects/messenger/AwcMessengerNoComputerHint";
import AwcProjectMessengerInboxClearBar from "@/features/projects/messenger/AwcProjectMessengerInboxClearBar";
import AwcProjectMessengerInboxClearModals from "@/features/projects/messenger/AwcProjectMessengerInboxClearModals";
import AwcProjectMessengerHeading from "@/features/projects/messenger/AwcProjectMessengerHeading";
import AwcProjectMessengerPanels from "@/features/projects/messenger/AwcProjectMessengerPanels";
import { useAwcProjectMessengerInboxClear } from "@/features/projects/messenger/hooks/useAwcProjectMessengerInboxClear";
import { useAwcProjectMessengerThread } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThread";
import { useAwcProjectMessengerThreads } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThreads";
import { defaultMessengerTaskAssignee } from "@/features/projects/messenger/utils/defaultMessengerTaskAssignee";
import { messengerTaskAssigneeOptions } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";
import { selectMessengerThreadMeta } from "@/features/projects/messenger/utils/selectMessengerThreadMeta";
import { sumMessengerUnreadCount } from "@/features/projects/messenger/utils/sumMessengerUnreadCount";

interface AwcProjectMessengerSectionProps {
  readonly projectId: string;
  /** False → browser chat copy is long-term (no trim) + (i) hint. */
  readonly hasOwnerComputer: boolean;
  /** Overview attention / hash deep-link into a bot thread (membershipId or "whole"). */
  readonly initialThreadKey?: string | null;
  /** Parent tab badge: refresh after open/send marks read or changes unread. */
  readonly onUnreadMaybeChanged?: () => void;
  /** Owner-only Clear all bar; non-owners fetch nothing. */
  readonly isOwner?: boolean;
}

const WHOLE_KEY = "whole";

export default function AwcProjectMessengerSection({
  projectId,
  hasOwnerComputer,
  initialThreadKey = null,
  onUnreadMaybeChanged,
  isOwner = false,
}: AwcProjectMessengerSectionProps) {
  const list = useAwcProjectMessengerThreads(projectId);
  const inboxClear = useAwcProjectMessengerInboxClear(projectId, isOwner);
  const clearBar = inboxClear.visible ? (
    <AwcProjectMessengerInboxClearBar clear={inboxClear} />
  ) : null;
  const reloadThreads = list.reload;
  const [selectedKey, setSelectedKey] = useState<string | null>(
    initialThreadKey ?? WHOLE_KEY,
  );
  const [mobileShowThread, setMobileShowThread] = useState(
    initialThreadKey !== null && initialThreadKey !== WHOLE_KEY,
  );
  const onOpened = useCallback(() => {
    void reloadThreads();
    onUnreadMaybeChanged?.();
  }, [onUnreadMaybeChanged, reloadThreads]);
  const open = useAwcProjectMessengerThread({
    projectId,
    threadKey: selectedKey,
    hasOwnerComputer,
    onOpened,
  });
  const selectedMeta = useMemo(
    () => selectMessengerThreadMeta({ selectedKey, threads: list.threads }),
    [list.threads, selectedKey],
  );
  const assignees = useMemo(
    () => messengerTaskAssigneeOptions({ bots: list.threads?.bots ?? [] }),
    [list.threads],
  );
  const unreadTotal = sumMessengerUnreadCount(list.threads);
  const gate = resolveMessengerGate(list);
  if (gate.kind !== "ready") {
    return <AwcProjectMessengerGateView gate={gate} />;
  }
  const canSend = gate.threads.canSend && (open.thread?.canSend ?? true);
  const afterSend = async (ok: boolean): Promise<boolean> => {
    if (ok) {
      void list.reload();
      onUnreadMaybeChanged?.();
    }
    return ok;
  };

  return (
    <div className="space-y-3">
      <AwcProjectMessengerHeading
        unreadTotal={unreadTotal}
        message={open.message}
      />
      {clearBar ? <div className="md:hidden">{clearBar}</div> : null}
      {!hasOwnerComputer ? <AwcMessengerNoComputerHint /> : null}
      <AwcProjectMessengerPanels
        threads={gate.threads}
        headerAction={clearBar}
        selectedKey={selectedKey}
        selectedMeta={selectedMeta}
        thread={open.thread}
        isLoading={open.isLoading}
        canSend={canSend}
        sending={open.sending}
        mobileShowThread={mobileShowThread}
        assignees={assignees}
        defaultAssigneeMembershipId={defaultMessengerTaskAssignee(selectedKey)}
        onSelect={(key) => {
          setSelectedKey(key);
          setMobileShowThread(true);
        }}
        onBack={() => {
          setMobileShowThread(false);
        }}
        onSendMessage={async (text, needsReply) =>
          afterSend(await open.send(text, needsReply))
        }
        onSendTask={async (draft) => afterSend(await open.sendTask(draft))}
      />
      {isOwner ? (
        <AwcProjectMessengerInboxClearModals clear={inboxClear} />
      ) : null}
    </div>
  );
}
