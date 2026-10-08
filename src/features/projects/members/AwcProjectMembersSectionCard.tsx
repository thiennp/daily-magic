/** Raised white card used by Assistants / People / Invite (design v2: depth on sand). */
export const SECTION_CARD =
  "flex flex-col gap-3 rounded-2xl border border-awc-line bg-awc-surface p-3.5 shadow-awc-lift";

const TONE = {
  pine: "bg-awc-accent-soft text-awc-primary",
  neutral: "border border-awc-line bg-awc-tile text-awc-fg-muted",
} as const;

/** 28px rounded icon tile before a section title. */
export default function SectionIcon({
  tone,
}: {
  readonly tone: keyof typeof TONE;
}) {
  return (
    <span
      className={`grid size-7 shrink-0 place-items-center rounded-[9px] ${TONE[tone]}`}
      aria-hidden
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    </span>
  );
}
