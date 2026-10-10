"use client";

interface AwcAutoSkillsCommitPickerProps {
  readonly value: number;
  readonly max: number;
  /** Set when `max` is the whole history, so its chip reads "All n". */
  readonly maxIsAll: boolean;
  readonly presets: readonly number[];
  readonly onChange: (value: number) => void;
}

/** Preset chips plus a number field for how many commits to scan. */
export default function AwcAutoSkillsCommitPicker({
  value,
  max,
  maxIsAll,
  presets,
  onChange,
}: AwcAutoSkillsCommitPickerProps) {
  return (
    <>
      <div
        role="radiogroup"
        aria-label="Commits to scan"
        className="flex flex-wrap gap-2"
      >
        {presets.map((count) => (
          <button
            key={count}
            type="button"
            role="radio"
            aria-checked={value === count}
            onClick={() => onChange(count)}
            className={`min-h-11 rounded-full border px-4 text-[13px] font-medium sm:min-h-9 ${
              value === count
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-awc-border text-awc-fg hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-white/[0.06]"
            }`}
          >
            {count === max && maxIsAll ? `All ${count}` : count}
          </button>
        ))}
      </div>
      <label className="flex flex-col gap-1 text-[13px] text-awc-fg dark:text-gray-200">
        Or type a number (1 to {max})
        <input
          type="number"
          inputMode="numeric"
          min={1}
          max={max}
          value={Number.isNaN(value) ? "" : value}
          onChange={(event) => onChange(event.target.valueAsNumber)}
          className="h-11 w-40 rounded-lg border border-awc-border bg-transparent px-3 text-[14px] dark:border-gray-700 sm:h-10"
        />
      </label>
    </>
  );
}
