/** Small (i) button with a hover / focus tooltip. */
export default function LoginInfoTip({
  id,
  label,
  children,
}: {
  readonly id: string;
  readonly label: string;
  readonly children: string;
}) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        className="grid size-[18px] cursor-help place-items-center rounded-full border border-awc-fg-subtle bg-transparent p-0 text-[11px] font-bold leading-none text-awc-fg-muted hover:border-awc-blue-600 hover:bg-awc-blue-50 hover:text-awc-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-awc-blue-600"
        aria-label={label}
        aria-describedby={id}
      >
        i
      </button>
      <span
        role="tooltip"
        id={id}
        className="pointer-events-none absolute -left-2.5 bottom-[calc(100%+6px)] z-30 w-max max-w-[260px] rounded-md bg-awc-fg px-3 py-2 text-left text-[13px] font-normal leading-snug text-awc-surface opacity-0 transition-opacity motion-reduce:transition-none group-focus-within:opacity-100 group-hover:opacity-100"
      >
        {children}
      </span>
    </span>
  );
}
