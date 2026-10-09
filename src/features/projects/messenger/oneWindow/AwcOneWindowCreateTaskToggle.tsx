interface AwcOneWindowCreateTaskToggleProps {
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
}

/** "Create a task" (default on): the send becomes, or reuses, a task. */
export default function AwcOneWindowCreateTaskToggle({
  checked,
  onChange,
}: AwcOneWindowCreateTaskToggleProps) {
  return (
    <label className="flex w-fit items-center gap-2 text-[13px] text-awc-fg">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-awc-blue-600"
      />
      Create a task
    </label>
  );
}
