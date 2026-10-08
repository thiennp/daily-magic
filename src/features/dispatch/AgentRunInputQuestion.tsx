interface AgentRunInputQuestionProps {
  readonly question: string;
  readonly parts: readonly string[];
}

export default function AgentRunInputQuestion({
  question,
  parts,
}: AgentRunInputQuestionProps) {
  if (parts.length > 1) {
    return (
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-awc-fg dark:text-white/90">
        {parts.map((part) => (
          <li key={part}>{part}</li>
        ))}
      </ul>
    );
  }
  return (
    <p className="mt-2 text-sm font-medium text-awc-fg dark:text-white/90">
      {question}
    </p>
  );
}
