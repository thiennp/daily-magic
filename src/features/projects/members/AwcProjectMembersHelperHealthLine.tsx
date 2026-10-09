/** Full-width wake-health line under an assistant row (not squeezed into the name column). */
export default function AwcProjectMembersHelperHealthLine({
  line,
}: {
  readonly line: string | null;
}) {
  if (!line) return null;
  return (
    <p className="-mt-1 pb-1.5 pl-[2.75rem] pr-3.5 text-[12px] text-awc-fg-subtle">
      {line}
    </p>
  );
}
