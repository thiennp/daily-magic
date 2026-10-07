import { CHAT_DOCK_ACCESS_PILL_CLASS } from "@/features/projects/chatDock/projectChatDockClasses.constant";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

/** P1-S4a "Access · N pending" (owner, full view): opens the Access pending view. */
export default function AwcProjectChatDockAccessPill({
  count,
  onOpen,
}: {
  readonly count: number;
  readonly onOpen: () => void;
}) {
  if (count <= 0) return null;
  const copy = ONE_WINDOW_FEED_COPY;
  const n = String(count);
  return (
    <button
      type="button"
      className={CHAT_DOCK_ACCESS_PILL_CLASS}
      aria-label={copy.accessPendingA11y.replace("{n}", n)}
      onClick={onOpen}
    >
      {copy.accessPending.replace("{n}", n)}
    </button>
  );
}
