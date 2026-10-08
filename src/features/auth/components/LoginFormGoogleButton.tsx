import Button from "@/components/ui/button/Button";
import GoogleSignInIcon from "@/features/auth/components/GoogleSignInIcon";
import type { LoginFormAppearance } from "@/features/auth/loginFormAppearance.constant";
import { LOGIN_FORM_APPEARANCE_CLASSES } from "@/features/auth/loginFormAppearance.constant";

interface LoginFormGoogleButtonProps {
  readonly appearance: LoginFormAppearance;
  readonly disabled?: boolean;
  readonly onGoogleSignIn: () => void;
}

export default function LoginFormGoogleButton({
  appearance,
  disabled = false,
  onGoogleSignIn,
}: LoginFormGoogleButtonProps) {
  const label = disabled ? "Opening Google…" : "Continue with Google";

  if (appearance === "marketing") {
    return (
      <button
        type="button"
        className={LOGIN_FORM_APPEARANCE_CLASSES.marketing.googleButton}
        disabled={disabled}
        aria-busy={disabled || undefined}
        onClick={onGoogleSignIn}
      >
        <GoogleSignInIcon />
        {label}
      </button>
    );
  }

  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={disabled}
      startIcon={<GoogleSignInIcon />}
      onClick={onGoogleSignIn}
    >
      {label}
    </Button>
  );
}
