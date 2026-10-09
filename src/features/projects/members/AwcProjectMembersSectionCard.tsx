/** Raised white card used by Assistants / People / Invite (design v2: depth on sand). */
export const SECTION_CARD =
  "flex flex-col gap-3 rounded-awc-card border border-awc-line bg-awc-surface p-3.5 shadow-awc-lift";

const TONE = {
  pine: "bg-awc-accent-soft text-awc-primary",
  neutral: "border border-awc-line bg-awc-tile text-awc-fg-muted",
} as const;

const ICONS = {
  assistants: (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20a6 6 0 0 1 12 0M16 5.3a3.2 3.2 0 0 1 0 5.4M18 14.5a6 6 0 0 1 3 5.5" />
    </>
  ),
  invite: <path d="M12 5v14M5 12h14" />,
} as const;

/** 28px rounded icon tile before a section title. */
export default function SectionIcon({
  tone,
  icon,
}: {
  readonly tone: keyof typeof TONE;
  readonly icon: keyof typeof ICONS;
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
        {ICONS[icon]}
      </svg>
    </span>
  );
}
