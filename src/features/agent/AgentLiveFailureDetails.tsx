"use client";

/** 73181622: "Why it failed" under a Failed floater, closed by default. */
export default function AgentLiveFailureDetails({
  details,
}: {
  readonly details: string;
}) {
  return (
    <details className="mt-2 text-sm text-awc-fg dark:text-gray-200">
      <summary className="cursor-pointer text-xs font-medium text-awc-fg-muted dark:text-gray-400">
        Why it failed
      </summary>
      <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-awc-bg/80 p-2 font-sans text-xs dark:bg-black/20">
        {details}
      </pre>
    </details>
  );
}
