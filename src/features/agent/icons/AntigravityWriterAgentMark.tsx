interface AntigravityWriterAgentMarkProps {
  readonly className?: string;
}

export default function AntigravityWriterAgentMark({
  className,
}: AntigravityWriterAgentMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8.5 12h7M12 8.5v7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}
