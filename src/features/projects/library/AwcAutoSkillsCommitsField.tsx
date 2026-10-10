"use client";

interface AwcAutoSkillsCommitsFieldProps {
  /** NaN while the field is empty. */
  readonly commits: number;
  readonly max: number;
  readonly valid: boolean;
  readonly onChange: (commits: number) => void;
}

/** How many main-branch commits "Scan past tasks" reads. */
export default function AwcAutoSkillsCommitsField({
  commits,
  max,
  valid,
  onChange,
}: AwcAutoSkillsCommitsFieldProps) {
  return (
    <label className="flex items-center gap-2 text-[13px] text-awc-fg dark:text-gray-200">
      Commits to read
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={max}
        value={Number.isNaN(commits) ? "" : commits}
        aria-invalid={!valid}
        onChange={(event) => onChange(event.target.valueAsNumber)}
        className="h-10 w-20 rounded-lg border border-awc-border bg-transparent px-3 text-[14px] dark:border-gray-700"
      />
    </label>
  );
}
