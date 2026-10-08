import LoginInfoTip from "@/features/auth/components/LoginInfoTip";
import type { LoginFormAppearance } from "@/features/auth/loginFormAppearance.constant";
import { LOGIN_FORM_APPEARANCE_CLASSES } from "@/features/auth/loginFormAppearance.constant";

interface LoginFormEmailFieldProps {
  readonly appearance: LoginFormAppearance;
  readonly emailInputId: string;
  readonly email: string;
  readonly error?: string | null;
  readonly onEmailChange: (value: string) => void;
}

export default function LoginFormEmailField({
  appearance,
  emailInputId,
  email,
  error = null,
  onEmailChange,
}: LoginFormEmailFieldProps) {
  const classes = LOGIN_FORM_APPEARANCE_CLASSES[appearance];
  const errorId = `${emailInputId}-error`;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <label htmlFor={emailInputId} className={classes.label}>
          Email
        </label>
        <LoginInfoTip id={`${emailInputId}-tip`} label="About signing in">
          We email you a sign-in link. No password to remember.
        </LoginInfoTip>
      </div>
      <input
        id={emailInputId}
        type="email"
        name="email"
        value={email}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => {
          onEmailChange(event.target.value);
        }}
        className={`${classes.input} !mt-0 ${error ? "!border-awc-bad-dot" : ""}`}
        autoComplete="email"
        autoCapitalize="off"
        spellCheck={false}
        inputMode="email"
      />
      {error ? (
        <p id={errorId} role="alert" className="text-[13px] text-awc-bad">
          {error}
        </p>
      ) : null}
    </div>
  );
}
