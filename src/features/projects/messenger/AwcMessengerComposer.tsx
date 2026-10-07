"use client";

import AwcOneWindowComposerGoneNotice from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerGoneNotice";
import AwcOneWindowComposerHint from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerHint";
import AwcOneWindowComposerPicker from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerPicker";
import AwcOneWindowComposerRouteRow from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerRouteRow";
import AwcOneWindowKeptRetryNotice from "@/features/projects/messenger/oneWindow/AwcOneWindowKeptRetryNotice";
import AwcOneWindowMentionBox from "@/features/projects/messenger/oneWindow/AwcOneWindowMentionBox";
import {
  type OneWindowSendMessage,
  sendOneWindowMessageTo,
} from "@/features/projects/messenger/oneWindow/oneWindowSendTarget";
import { useOneWindowComposerDraft } from "@/features/projects/messenger/oneWindow/useOneWindowComposerDraft";
import type { useOneWindowComposerRouting } from "@/features/projects/messenger/oneWindow/useOneWindowComposerRouting";
import { useOneWindowComposerSend } from "@/features/projects/messenger/oneWindow/useOneWindowComposerSend";
import { useOneWindowKeptSendRetry } from "@/features/projects/messenger/oneWindow/useOneWindowKeptSendRetry";
import type { MessengerTaskAssigneeOption } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

type Routing = ReturnType<typeof useOneWindowComposerRouting>;

interface AwcMessengerComposerProps {
  readonly disabled: boolean;
  readonly sending: boolean;
  readonly assignees: readonly MessengerTaskAssigneeOption[];
  readonly onSendMessage: OneWindowSendMessage;
  readonly onSendTask: (draft: MessengerTaskDraft) => Promise<boolean>;
  readonly routing?: Routing;
  /** P1-S4b "To X" chip: the open feed and how to switch it. */
  readonly feedSwitch?: { readonly key: string; readonly onSelect: (key: string) => void };
}

/**
 * P1-S4b @ composer: one box, @ button + inline mention picker ("Each @
 * assigns one task"), "To X" feed switch; OW-H2 picker / kept chip stay.
 * Replaces the Message | Assign task toggle and the "Needs a reply" box.
 * P1-S5 (COMPOSER-LOCK KEPT(r)): no-@ and picker sends go to r; with a feed
 * switch the kept chip is hidden and the switch names the target.
 * P1-S5b: a retry after a part-way kept send only goes to who has not got it.
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
  const assistants = assignees.map((a) => ({ membershipId: a.membershipId, displayName: a.displayName }));
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
  });
  const draft = useOneWindowComposerDraft({
    assistants,
    mentionsEnabled: !single,
    onSubmit: (text, clear) => {
      if (busy) return;
      void send(text).then((ok) => {
        sync();
        if (ok) clear();
      });
    },
  });
  return (
    <div className="relative flex flex-col gap-2 border-t border-awc-border bg-awc-surface px-4 pb-3.5 pt-2.5 dark:border-gray-800 dark:bg-gray-950">
      {routing?.goneName ? <AwcOneWindowComposerGoneNotice name={routing.goneName} onDismiss={routing.dismissGone} /> : null}
      {!single ? <AwcOneWindowComposerRouteRow assistants={assistants} routing={routing} feedSwitch={feedSwitch} busy={busy} /> : null}
      {pending !== null && pending.text === draft.text.trim() ? (
        <AwcOneWindowKeptRetryNotice pendingKeys={pending.pending} assistants={assistants} />
      ) : null}
      <AwcOneWindowMentionBox draft={draft} busy={busy} single={single} placeholder={routing?.placeholder} />
      <AwcOneWindowComposerHint single={single} />
      {routing?.picking ? (
        <AwcOneWindowComposerPicker
          draftText={routing.draftForPicker}
          assistants={assistants}
          onCancel={routing.cancelPicker}
          onConfirm={(choice) => {
            void routing
              .confirmPicker(choice)
              .then((text) => sendOneWindowMessageTo(onSendMessage, text, choice.recipient, keptProgress))
              .then((ok) => {
                sync();
                if (ok) draft.clear();
              });
          }}
        />
      ) : null}
    </div>
  );
}
