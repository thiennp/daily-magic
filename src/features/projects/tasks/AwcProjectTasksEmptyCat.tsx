/** Simple cat mark for empty state (design HTML). */
export default function AwcProjectTasksEmptyCat() {
  return (
    <svg
      className="mx-auto mb-2.5 h-11 w-11 opacity-70"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
    >
      <ellipse
        cx="22"
        cy="26"
        rx="14"
        ry="12"
        className="fill-awc-fill stroke-awc-border-strong"
        strokeWidth="1.5"
      />
      <path
        d="M10 18l4-10 6 8M34 18l-4-10-6 8"
        className="stroke-awc-border-strong"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="25" r="1.5" className="fill-awc-fg-muted" />
      <circle cx="27" cy="25" r="1.5" className="fill-awc-fg-muted" />
      <path
        d="M20 29c1 .8 3 .8 4 0"
        className="stroke-awc-fg-muted"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
