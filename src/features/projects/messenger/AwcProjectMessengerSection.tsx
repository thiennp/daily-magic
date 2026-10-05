"use client";

import { useCallback, useMemo, useState } from "react";

import AwcProjectMessengerGateView, {
  resolveMessengerGate,
} from "@/features/projects/messenger/AwcProjectMessengerGate";
import AwcProjectMessengerHeading from "@/features/projects/messenger/AwcProjectMessengerHeading";
import AwcProjectMessengerPanels from "@/features/projects/messenger/AwcProjectMessengerPanels";
import { useAwcProjectMessengerThread } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThread";
import { useAwcProjectMessengerThreads } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThreads";
import { defaultMessengerTaskAssignee } from "@/features/projects/messenger/utils/defaultMessengerTaskAssignee";
import { messengerTaskAssigneeOptions } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";
import { selectMessengerThreadMeta } from "@/features/projects/messenger/utils/selectMessengerThreadMeta";
import { sumMessengerUnreadCount } from "@/features/projects/messenger/utils/sumMessengerUnreadCount";

interface AwcProjectMessengerSectionProps {
  readonly projectId: string;
  /** Overview attention / hash deep-link into a bot thread (membershipId or "whole"). */
  readonly initialThreadKey?: string | null;
  /** Parent tab badge: refresh after open/send marks read or changes unread. */
  readonly onUnreadMaybeChanged?: () => void;
}

const WHOLE_KEY = "whole";

export default function AwcProjectMessengerSection({
  projectId,
  initialThreadKey = null,
  onUnreadMaybeChanged,
}: AwcProjectMessengerSectionProps) {
  const list = useAwcProjectMessengerThreads(projectId);
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
      <AwcProjectMessengerPanels
        threads={gate.threads}
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
    </div>
  );
}
