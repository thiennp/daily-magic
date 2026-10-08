import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";

interface GroupCompanyNameFieldProps {
  readonly id: string;
  readonly value: string;
  readonly error: string;
  readonly autoFocus?: boolean;
  readonly onChange: (value: string) => void;
}

export default function GroupCompanyNameField({
  id,
  value,
  error,
  autoFocus = false,
  onChange,
}: GroupCompanyNameFieldProps) {
  const errorId = `${id}-err`;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-awc-fg">
        {C.companyNameLabel}
      </label>
      <input
        id={id}
        value={value}
        maxLength={60}
        autoComplete="organization"
        autoFocus={autoFocus}
        placeholder={C.companyNamePlaceholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        className="w-full rounded-lg border border-awc-border px-3 py-2 text-sm"
      />
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-awc-bad">
          {error}
        </p>
      ) : null}
    </div>
  );
}
