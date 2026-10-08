"use client";

interface AwcAutoSkillsHeaderProps {
  readonly on: boolean;
  readonly paused: boolean;
  readonly busy: boolean;
  readonly onToggle: () => void;
}

function SparkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7L19 16z" />
    </svg>
  );
}

const resolvePill = (
  on: boolean,
  paused: boolean,
): { readonly label: string; readonly className: string } => {
  if (!on) {
    return {
      label: "Off",
      className:
        "bg-gray-200/80 text-awc-fg-muted dark:bg-white/10 dark:text-gray-400",
    };
  }
  return paused
    ? {
        label: "Paused",
        className: "bg-awc-warn-soft text-awc-warn",
      }
    : {
        label: "On",
        className: "bg-awc-ok-soft text-awc-ok",
      };
};

/** Icon, title, On/Off/Paused pill and the master switch. */
export default function AwcAutoSkillsHeader({
  on,
  paused,
  busy,
  onToggle,
}: AwcAutoSkillsHeaderProps) {
  const pill = resolvePill(on, paused);
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600/10 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
        <SparkIcon />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="m-0 text-[15px] font-semibold text-awc-fg dark:text-white">
            Auto skills
          </h3>
          <span
            className={`rounded-full px-2 py-0.5 text-[11.5px] font-medium ${pill.className}`}
          >
            {pill.label}
          </span>
        </div>
        <p className="mt-0.5 text-[13px] text-awc-fg-muted dark:text-gray-400">
          Steps you repeat across tasks become reusable skills. You approve
          every one before it is saved.
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Create skills automatically"
        disabled={busy}
        onClick={onToggle}
        className={`relative mt-1 inline-flex h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-50 ${
          on ? "bg-brand-600 dark:bg-brand-500" : "bg-gray-300 dark:bg-white/15"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
