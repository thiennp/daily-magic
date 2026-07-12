import type { LoginFormAppearance } from "@/features/auth/loginFormAppearance.constant";
import { LOGIN_FORM_APPEARANCE_CLASSES } from "@/features/auth/loginFormAppearance.constant";

interface LoginFormEmailFieldProps {
  readonly appearance: LoginFormAppearance;
  readonly emailInputId: string;
  readonly email: string;
  readonly onEmailChange: (value: string) => void;
}

export default function LoginFormEmailField({
  appearance,
  emailInputId,
  email,
  onEmailChange,
}: LoginFormEmailFieldProps) {
  const classes = LOGIN_FORM_APPEARANCE_CLASSES[appearance];

  return (
    <label htmlFor={emailInputId} className={classes.label}>
      Email
      <input
        id={emailInputId}
        type="email"
        value={email}
        onChange={(event) => {
          onEmailChange(event.target.value);
        }}
        className={classes.input}
        placeholder="you@example.com"
        autoComplete="email"
      />
    </label>
  );
}
