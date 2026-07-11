interface BorrowedHarnessPreviewProps {
  readonly ownerEmail: string;
  readonly hostname: string;
  readonly manifest: Readonly<Record<string, unknown>>;
}

export default function BorrowedHarnessPreview({
  ownerEmail,
  hostname,
  manifest,
}: BorrowedHarnessPreviewProps) {
  return (
    <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50/40 p-4 dark:border-brand-900/40 dark:bg-brand-950/20">
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        Borrowed from {ownerEmail} ({hostname})
      </p>
      <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-white p-3 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300">
        {JSON.stringify(manifest, null, 2)}
      </pre>
    </div>
  );
}
