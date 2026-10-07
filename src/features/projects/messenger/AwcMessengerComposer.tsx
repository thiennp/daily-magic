"use client";

import AwcOneWindowComposerGoneNotice from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerGoneNotice";
import AwcOneWindowComposerHint from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerHint";
import AwcOneWindowComposerPicker from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerPicker";
import AwcOneWindowKeptChip from "@/features/projects/messenger/oneWindow/AwcOneWindowKeptChip";
import AwcOneWindowMentionBox from "@/features/projects/messenger/oneWindow/AwcOneWindowMentionBox";
import AwcOneWindowRecipientSwitch from "@/features/projects/messenger/oneWindow/AwcOneWindowRecipientSwitch";
import { useOneWindowComposerDraft } from "@/features/projects/messenger/oneWindow/useOneWindowComposerDraft";
import type { useOneWindowComposerRouting } from "@/features/projects/messenger/oneWindow/useOneWindowComposerRouting";
import { useOneWindowComposerSend } from "@/features/projects/messenger/oneWindow/useOneWindowComposerSend";
import type { MessengerTaskAssigneeOption } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

type Routing = ReturnType<typeof useOneWindowComposerRouting>;

interface AwcMessengerComposerProps {
  readonly disabled: boolean;
  readonly sending: boolean;
  readonly assignees: readonly MessengerTaskAssigneeOption[];
  readonly onSendMessage: (text: string, needsReply: boolean) => Promise<boolean>;
  readonly onSendTask: (draft: MessengerTaskDraft) => Promise<boolean>;
  readonly routing?: Routing;
  /** P1-S4b "To X" chip: the open feed and how to switch it. */
  readonly feedSwitch?: { readonly key: string; readonly onSelect: (key: string) => void };
}

/**
 * P1-S4b @ composer: one box, @ button + inline mention picker ("Each @
 * assigns one task"), "To X" feed switch; OW-H2 picker / kept chip stay.
 * Replaces the Message | Assign task toggle and the "Needs a reply" box.
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
  const send = useOneWindowComposerSend({
    assistants,
    mentionsEnabled: !single,
    privateFeed,
    routing,
    onSendMessage,
    onSendTask,
  });
  const draft = useOneWindowComposerDraft({
    assistants,
    mentionsEnabled: !single,
    onSubmit: (text, clear) => {
      if (busy) return;
      void send(text).then((ok) => {
        if (ok) clear();
      });
    },
  });
  const showKept = !single && !privateFeed && routing?.mode === "KEPT" && routing.chipLabel !== null;

  return (
    <div className="relative flex flex-col gap-2 border-t border-awc-border bg-awc-surface px-4 pb-3.5 pt-2.5 dark:border-gray-800 dark:bg-gray-950">
      {routing?.goneName ? <AwcOneWindowComposerGoneNotice name={routing.goneName} onDismiss={routing.dismissGone} /> : null}
      {!single && (feedSwitch !== undefined || showKept) ? (
        <div className="flex flex-wrap items-center gap-2.5">
          {feedSwitch !== undefined ? (
            <AwcOneWindowRecipientSwitch feedKey={feedKey} assistants={assistants} onSelect={feedSwitch.onSelect} />
          ) : null}
          {showKept && routing?.chipLabel ? (
            <AwcOneWindowKeptChip label={routing.chipLabel} keepChecked disabled={busy} onKeepChange={(on) => void (on ? null : routing.uncheckKeep())} />
          ) : null}
        </div>
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
              .then((text) => onSendMessage(text, false))
              .then((ok) => {
                if (ok) draft.clear();
              });
          }}
        />
      ) : null}
    </div>
  );
}
