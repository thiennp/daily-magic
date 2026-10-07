import AwcOneWindowNoticeRow from "@/features/projects/messenger/oneWindow/AwcOneWindowNoticeRow";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

interface AwcOneWindowFeedNoticesProps {
  /** Archived notice text (owner only), or null. */
  readonly archivedText: string | null;
  /** Opens the Restore all confirm; omitted when the viewer can't restore. */
  readonly onRestore?: () => void;
  readonly quiet: readonly { readonly id: string; readonly text: string }[];
}

/**
 * P1-S3 notices at the top of the One window feed, from data the page already
 * has: archived count (inbox) and quiet assistants (thread list status).
 * Wake / joined / left notices need OW9 feed rows (S5).
 */
export default function AwcOneWindowFeedNotices({
  archivedText,
  onRestore,
  quiet,
}: AwcOneWindowFeedNoticesProps) {
  if (archivedText === null && quiet.length === 0) return null;
  return (
    <div className="grid gap-2 px-4 pt-3" data-one-window-notices>
      {archivedText !== null ? (
        <AwcOneWindowNoticeRow
          text={archivedText}
          action={
            onRestore !== undefined
              ? { label: ONE_WINDOW_FEED_COPY.noticeRestore, onClick: onRestore }
              : undefined
          }
        />
      ) : null}
      {quiet.map((notice) => (
        <AwcOneWindowNoticeRow key={notice.id} text={notice.text} />
      ))}
    </div>
  );
}
