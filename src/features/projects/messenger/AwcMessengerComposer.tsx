"use client";

import { useState } from "react";

import AwcOneWindowComposerGoneNotice from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerGoneNotice";
import AwcOneWindowComposerHint from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerHint";
import AwcOneWindowComposerPickerSlot from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerPickerSlot";
import AwcOneWindowComposerRouteRow from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerRouteRow";
import AwcOneWindowKeptRetryNotice from "@/features/projects/messenger/oneWindow/AwcOneWindowKeptRetryNotice";
import { useOneWindowComposerPrefill } from "@/features/projects/messenger/oneWindow/useOneWindowComposerPrefill";
import AwcOneWindowMentionBox from "@/features/projects/messenger/oneWindow/AwcOneWindowMentionBox";
import AwcOneWindowMentionError from "@/features/projects/messenger/oneWindow/AwcOneWindowMentionError";
import { useOneWindowComposerDraft } from "@/features/projects/messenger/oneWindow/useOneWindowComposerDraft";
import { useOneWindowComposerSend } from "@/features/projects/messenger/oneWindow/useOneWindowComposerSend";
import { useOneWindowKeptSendRetry } from "@/features/projects/messenger/oneWindow/useOneWindowKeptSendRetry";
import type { AwcMessengerComposerProps } from "@/features/projects/messenger/types/awcMessengerComposerProps.type";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

/**
 * P1-S4b @ composer: one box, @ button + mention picker, "To X" feed switch,
 * OW-H2 picker / kept chip. One recipient per send (093103ac): one @ only.
 */
export default function AwcMessengerComposer({
  disabled,
  sending,
  assignees,
  onSendMessage,
  onSendTask,
  routing,
  feedSwitch,
}: AwcMessengerComposerProps) {
  const [mentionError, setMentionError] = useState<string | null>(null);
  const assistants = assignees.map((a) => ({
    membershipId: a.membershipId,
    displayName: a.displayName,
  }));
  const single = routing?.hideAllRoutingUi ?? assistants.length < 2;
  const feedKey = feedSwitch?.key ?? PROJECT_MESSENGER_WHOLE_THREAD_KEY;
  const privateFeed = feedKey !== PROJECT_MESSENGER_WHOLE_THREAD_KEY;
  const busy = disabled || sending;
  const { progress: keptProgress, pending, sync } = useOneWindowKeptSendRetry();
  const send = useOneWindowComposerSend({
    assistants,
    mentionsEnabled: !single,
    privateFeed,
    routing,
    onSendMessage,
    onSendTask,
    keptProgress,
    onMentionError: setMentionError,
  });
  const draft = useOneWindowComposerDraft({
    assistants,
    mentionsEnabled: !single,
    onSubmit: (text, clear) => {
      setMentionError(null);
      if (busy) return;
      void send(text).then((ok) => {
        sync();
        if (ok) clear();
      });
    },
  });
  useOneWindowComposerPrefill(draft.textareaRef);
  return (
    <div className="relative flex flex-col gap-2 border-t border-awc-border bg-awc-surface px-4 pb-3.5 pt-2.5 dark:border-gray-800 dark:bg-gray-950">
      {routing?.goneName ? (
        <AwcOneWindowComposerGoneNotice
          name={routing.goneName}
          onDismiss={routing.dismissGone}
        />
      ) : null}
      {!single ? (
        <AwcOneWindowComposerRouteRow
          assistants={assistants}
          routing={routing}
          feedSwitch={feedSwitch}
          busy={busy}
        />
      ) : null}
      {pending !== null && pending.text === draft.text.trim() ? (
        <AwcOneWindowKeptRetryNotice
          pendingKeys={pending.pending}
          assistants={assistants}
        />
      ) : null}
      <AwcOneWindowMentionBox
        draft={draft}
        busy={busy}
        single={single}
        placeholder={routing?.placeholder}
      />
      <AwcOneWindowMentionError message={mentionError} />
      <AwcOneWindowComposerHint single={single} />
      <AwcOneWindowComposerPickerSlot
        routing={routing}
        assistants={assistants}
        onSendMessage={onSendMessage}
        keptProgress={keptProgress}
        onSent={(ok) => {
          sync();
          if (ok) draft.clear();
        }}
      />
    </div>
  );
}
