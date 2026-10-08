interface LoginTermsCheckboxProps {
  readonly checked: boolean;
  readonly error: boolean;
  readonly onChange: (checked: boolean) => void;
}

/** Sign-up consent: required before the account-creating email is sent. */
export default function LoginTermsCheckbox({
  checked,
  error,
  onChange,
}: LoginTermsCheckboxProps) {
  return (
    <div>
      <label className="flex items-start gap-2 text-sm text-awc-fg">
        <input
          id="login-terms"
          type="checkbox"
          checked={checked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "login-terms-error" : undefined}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-0.5 size-[18px] shrink-0 accent-awc-blue-600"
        />
        <span>
          I agree to the{" "}
          <a
            className="text-awc-blue-700 underline"
            href="/terms"
            target="_blank"
            rel="noopener"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            className="text-awc-blue-700 underline"
            href="/privacy"
            target="_blank"
            rel="noopener"
          >
            Privacy policy
          </a>
        </span>
      </label>
      {error ? (
        <p
          id="login-terms-error"
          role="alert"
          className="mt-1 text-[13px] text-awc-bad"
        >
          Agree to continue.
        </p>
      ) : null}
    </div>
  );
}
