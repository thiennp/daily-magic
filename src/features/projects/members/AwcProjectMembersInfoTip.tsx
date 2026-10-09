/** Sidebar (i) tip: help text moves out of the page into a hover / focus tooltip (design v2, "less text"). */
export default function AwcProjectMembersInfoTip({
  id,
  label = "More about this",
  children,
}: {
  readonly id: string;
  readonly label?: string;
  readonly children: string;
}) {
  return (
    <span className="group relative inline-flex" data-info-tip>
      <button
        type="button"
        className="awc-focus-ring grid size-[18px] cursor-help place-items-center rounded-full border border-awc-border-strong bg-awc-surface p-0 font-serif text-[11px] font-bold italic leading-none text-awc-fg-subtle"
        aria-label={label}
        aria-describedby={id}
      >
        i
      </button>
      <span
        role="tooltip"
        id={id}
        className="pointer-events-none absolute -left-2.5 bottom-[calc(100%+6px)] z-30 w-max max-w-[220px] rounded-lg bg-awc-fg px-2.5 py-2 text-left text-[12.5px] font-normal not-italic leading-snug text-awc-surface hidden group-focus-within:block group-hover:block"
      >
        {children}
      </span>
    </span>
  );
}
