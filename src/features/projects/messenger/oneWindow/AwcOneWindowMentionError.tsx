/** Inline error under the composer (e.g. more than one @ mention). */
export default function AwcOneWindowMentionError({
  message,
}: {
  readonly message: string | null;
}) {
  if (!message) return null;
  return (
    <p className="m-0 text-[12px] font-medium text-awc-bad" role="alert">
      {message}
    </p>
  );
}
