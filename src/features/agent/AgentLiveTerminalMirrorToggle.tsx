"use client";

interface AgentLiveTerminalMirrorToggleProps {
  readonly isOpen: boolean;
  readonly onToggle: () => void;
}

export default function AgentLiveTerminalMirrorToggle({
  isOpen,
  onToggle,
}: AgentLiveTerminalMirrorToggleProps) {
  return (
    <div className="mt-3 flex justify-start">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="agent-live-terminal-mirror"
        aria-label={
          isOpen ? "Hide Local Mac terminal" : "Show Local Mac terminal"
        }
        title={isOpen ? "Hide Local Mac terminal" : "Show Local Mac terminal"}
        className={`inline-flex items-center justify-center rounded-lg border px-2.5 py-2 transition ${
          isOpen
            ? "border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/10 dark:text-brand-300"
            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/5"
        }`}
      >
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="h-4 w-4 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2.5"
            y="3.5"
            width="15"
            height="13"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M6 8.5L8 10.5L6 12.5M10.5 12.5H14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
