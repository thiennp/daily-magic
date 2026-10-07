"use client";

import AwcOneWindowKeptChip from "@/features/projects/messenger/oneWindow/AwcOneWindowKeptChip";
import AwcOneWindowRecipientSwitch from "@/features/projects/messenger/oneWindow/AwcOneWindowRecipientSwitch";
import type { OneWindowMentionAssistant } from "@/features/projects/messenger/oneWindow/oneWindowMentions";
import { oneWindowWholeFeedSwitchLabel } from "@/features/projects/messenger/oneWindow/oneWindowSendTarget";
import type { useOneWindowComposerRouting } from "@/features/projects/messenger/oneWindow/useOneWindowComposerRouting";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY as WHOLE } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

interface AwcOneWindowComposerRouteRowProps {
  readonly assistants: readonly OneWindowMentionAssistant[];
  readonly routing?: ReturnType<typeof useOneWindowComposerRouting>;
  readonly feedSwitch?: { readonly key: string; readonly onSelect: (key: string) => void };
  readonly busy: boolean;
}

/**
 * Composer route row (split from AwcMessengerComposer, P1-S5b): the "To X"
 * switch names the no-@ target on the whole feed (KEPT(r) → "To {name}");
 * the kept chip shows only when there is no feed switch.
 */
export default function AwcOneWindowComposerRouteRow({
  assistants,
  routing,
  feedSwitch,
  busy,
}: AwcOneWindowComposerRouteRowProps) {
  const feedKey = feedSwitch?.key ?? WHOLE;
  const kept = routing?.kept ?? null;
  const nameById = new Map(assistants.map((a) => [a.membershipId, a.displayName]));
  const chipLabel = feedSwitch === undefined && kept !== null ? (routing?.chipLabel ?? null) : null;
  if (feedSwitch === undefined && chipLabel === null) return null;
  const onSwitch = (key: string) => {
    // The hidden chip's uncheck: "Everyone in this project" on the whole feed clears KEPT(r).
    if (key === WHOLE && feedKey === WHOLE && kept !== null) void routing?.uncheckKeep();
    else feedSwitch?.onSelect(key);
  };
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {feedSwitch !== undefined ? (
        <AwcOneWindowRecipientSwitch
          feedKey={feedKey}
          assistants={assistants}
          wholeLabel={oneWindowWholeFeedSwitchLabel(kept, nameById)}
          onSelect={onSwitch}
        />
      ) : null}
      {chipLabel !== null ? (
        <AwcOneWindowKeptChip
          label={chipLabel}
          keepChecked
          disabled={busy}
          onKeepChange={(on) => void (on ? null : routing?.uncheckKeep())}
        />
      ) : null}
    </div>
  );
}
