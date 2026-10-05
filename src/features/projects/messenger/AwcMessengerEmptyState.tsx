import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";

interface AwcMessengerEmptyStateProps {
  readonly onOpenPeople?: () => void;
}

export default function AwcMessengerEmptyState({
  onOpenPeople,
}: AwcMessengerEmptyStateProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-12 text-center">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
        {copy.emptyTitle}
      </h3>
      <p className="max-w-xs text-sm text-gray-500">{copy.emptyBody}</p>
      {onOpenPeople !== undefined ? (
        <button
          type="button"
          onClick={onOpenPeople}
          className="mt-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
        >
          {copy.emptyCta}
        </button>
      ) : null}
    </div>
  );
}
