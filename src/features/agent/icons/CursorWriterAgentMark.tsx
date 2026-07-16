interface CursorWriterAgentMarkProps {
  readonly className?: string;
}

export default function CursorWriterAgentMark({
  className,
}: CursorWriterAgentMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 8.5L16 11V16L12 18.5L8 16V11L12 8.5Z" fill="currentColor" />
    </svg>
  );
}
