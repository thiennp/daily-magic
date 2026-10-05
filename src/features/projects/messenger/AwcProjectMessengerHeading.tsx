import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";

interface AwcProjectMessengerHeadingProps {
  readonly unreadTotal: number;
  readonly message: string | null;
}

export default function AwcProjectMessengerHeading({
  unreadTotal,
  message,
}: AwcProjectMessengerHeadingProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  return (
    <>
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          {copy.tab}
        </h2>
        {unreadTotal > 0 ? (
          <span className="inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-blue-600 px-1.5 py-0.5 text-[11px] font-semibold text-white">
            {unreadTotal}
          </span>
        ) : null}
      </div>
      {message !== null ? (
        <p className="text-xs text-amber-800 dark:text-amber-200">{message}</p>
      ) : null}
    </>
  );
}
