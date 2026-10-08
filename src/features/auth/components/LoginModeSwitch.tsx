import type { LoginFormMode } from "@/features/auth/LoginForm";

const linkClass =
  "rounded-sm font-medium text-awc-blue-700 underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-awc-blue-600";

interface LoginModeSwitchProps {
  readonly mode: LoginFormMode;
  readonly onChange: (mode: LoginFormMode) => void;
}

/** Footnote that flips between "Sign in" and "Create a free account". */
export default function LoginModeSwitch({
  mode,
  onChange,
}: LoginModeSwitchProps) {
  const isSignIn = mode === "in";
  return (
    <p className="text-center text-sm text-awc-fg-muted">
      {isSignIn ? "New here? " : "Already have an account? "}
      <button
        type="button"
        className={linkClass}
        onClick={() => onChange(isSignIn ? "up" : "in")}
      >
        {isSignIn ? "Create a free account" : "Sign in"}
      </button>
    </p>
  );
}
