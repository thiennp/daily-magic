interface AwcProjectInboxDispatchStatusProps {
  readonly statusText: string | null;
  readonly toast: string | null;
}

export default function AwcProjectInboxDispatchStatus({
  statusText,
  toast,
}: AwcProjectInboxDispatchStatusProps) {
  return (
    <>
      {statusText !== null ? (
        <p
          role="status"
          className="text-[11px] font-medium text-gray-700 dark:text-gray-200"
        >
          {statusText}
        </p>
      ) : null}
      {toast ? (
        <p className="text-[11px] font-medium text-gray-700 dark:text-gray-200">
          {toast}
        </p>
      ) : null}
    </>
  );
}
