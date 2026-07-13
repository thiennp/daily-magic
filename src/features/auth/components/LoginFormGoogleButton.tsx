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
  if (appearance === "marketing") {
    return (
      <button
        type="button"
        aria-label="Continue signing in with Google"
        className={LOGIN_FORM_APPEARANCE_CLASSES.marketing.googleButton}
        disabled={disabled}
        onClick={onGoogleSignIn}
      >
        <GoogleSignInIcon />
        Continue with Google
      </button>
    );
  }

  return (
    <Button
      variant="outline"
      className="w-full"
      aria-label="Continue signing in with Google"
      disabled={disabled}
      startIcon={<GoogleSignInIcon />}
      onClick={onGoogleSignIn}
    >
      Continue with Google
    </Button>
  );
}
