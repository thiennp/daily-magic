/** 5ca01f06: shown instead of "Computer ready" when the picked tool isn't. */
export default function SendReadinessWriterNotice({
  notice,
}: {
  readonly notice: string;
}) {
  return (
    <p
      role="status"
      className="rounded-lg border border-warning-200 bg-warning-50 px-3 py-2 text-[13px] text-warning-800 dark:border-warning-500/30 dark:bg-warning-500/10 dark:text-warning-300"
    >
      {notice}
    </p>
  );
}
