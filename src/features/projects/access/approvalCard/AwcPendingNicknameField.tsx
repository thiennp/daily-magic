import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";

interface AwcPendingNicknameFieldProps {
  readonly requestId: string;
  readonly value: string;
  /** Format issue or server error (e.g. name taken); null shows `help`. */
  readonly error: string | null;
  readonly help: string;
  readonly available: readonly string[];
  readonly onChange: (value: string) => void;
  readonly onSubmit: () => void;
}

const WarnIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="mt-px size-[15px] shrink-0 fill-none stroke-current"
    strokeWidth={2}
    aria-hidden
  >
    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
    <path d="M12 7.5v5.5M12 16.5v.01" />
  </svg>
);

/** "Name in this project" — prefilled; Enter approves when valid. */
export default function AwcPendingNicknameField({
  requestId,
  value,
  error,
  help,
  available,
  onChange,
  onSubmit,
}: AwcPendingNicknameFieldProps) {
  const inputId = `pending-name-${requestId}`;
  const msgId = `pending-name-msg-${requestId}`;
  const listId = `display-name-presets-${requestId}`;
  return (
    <div className="grid w-full gap-1.5 @min-[520px]:max-w-[440px]">
      <label htmlFor={inputId} className="text-[13px] font-semibold text-awc-fg">
        {C.nicknameLabel}
      </label>
      <input
        id={inputId}
        className={`awc-focus-ring w-full rounded-[10px] border px-3 py-2.5 text-[15px] text-awc-fg ${
          error
            ? "border-awc-bad bg-awc-bad-soft"
            : "border-awc-border-strong bg-awc-surface"
        }`}
        value={value}
        maxLength={32}
        autoComplete="off"
        spellCheck={false}
        list={listId}
        aria-describedby={msgId}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !error) onSubmit();
        }}
      />
      <datalist id={listId}>
        {available.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>
      {error ? (
        <p id={msgId} className="m-0 flex items-start gap-1.5 text-[13px] text-awc-bad">
          <WarnIcon />
          <span>{error}</span>
        </p>
      ) : (
        <p id={msgId} className="m-0 text-[12.5px] text-awc-fg-muted">
          {help}
        </p>
      )}
    </div>
  );
}
