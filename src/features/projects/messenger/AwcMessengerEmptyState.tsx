import AwcOneWindowFeedEmpty from "@/features/projects/messenger/oneWindow/AwcOneWindowFeedEmpty";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";

interface AwcMessengerEmptyStateProps {
  readonly onOpenPeople?: () => void;
}

/** Activity empty — one-window empty chrome (OW-H1). */
export default function AwcMessengerEmptyState({
  onOpenPeople,
}: AwcMessengerEmptyStateProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  return (
    <div className="flex flex-1 flex-col">
      <AwcOneWindowFeedEmpty />
      {onOpenPeople !== undefined ? (
        <div className="flex justify-center pb-8">
          <button
            type="button"
            onClick={onOpenPeople}
            className="rounded-lg border border-awc-control-border bg-awc-surface px-3.5 py-2 text-sm font-medium text-awc-fg hover:bg-awc-surface-2"
          >
            {copy.emptyCta}
          </button>
        </div>
      ) : null}
    </div>
  );
}
