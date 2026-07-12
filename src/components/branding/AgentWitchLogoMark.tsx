interface AgentWitchLogoMarkProps {
  readonly className?: string;
}

export default function AgentWitchLogoMark({
  className = "h-7 w-7 text-zinc-900",
}: AgentWitchLogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path
        d="M12 2L2 12l10 10 10-10L12 2z"
        className="fill-zinc-900/5 stroke-none dark:fill-zinc-100/10"
      />
      <path
        d="M12 6v12m-6-6h12"
        className="stroke-zinc-900 dark:stroke-zinc-100"
        strokeWidth="2.5"
      />
      <path
        d="M15.5 8.5l-7 7"
        className="stroke-zinc-400 dark:stroke-zinc-500"
        strokeWidth="1.5"
      />
    </svg>
  );
}
