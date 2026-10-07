"use client";

const FIELD =
  "mt-1 w-full rounded-md border border-awc-border-strong bg-white px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-950";

interface AwcProjectAccessSecretInputProps {
  readonly label: string;
  readonly name: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/** Masked input, autocomplete off, password managers told to ignore it. */
export default function AwcProjectAccessSecretInput({
  label,
  name,
  value,
  onChange,
}: AwcProjectAccessSecretInputProps) {
  return (
    <label className="block text-xs text-awc-fg-muted dark:text-gray-400">
      {label}
      <input
        className={FIELD}
        type="password"
        name={name}
        autoComplete="off"
        spellCheck={false}
        data-1p-ignore
        data-lpignore="true"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
