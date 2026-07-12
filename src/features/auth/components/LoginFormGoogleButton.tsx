import Button from "@/components/ui/button/Button";
import type { LoginFormAppearance } from "@/features/auth/loginFormAppearance.constant";
import { LOGIN_FORM_APPEARANCE_CLASSES } from "@/features/auth/loginFormAppearance.constant";

interface LoginFormGoogleButtonProps {
  readonly appearance: LoginFormAppearance;
  readonly onGoogleSignIn: () => void;
}

export default function LoginFormGoogleButton({
  appearance,
  onGoogleSignIn,
}: LoginFormGoogleButtonProps) {
  if (appearance === "marketing") {
    return (
      <button
        type="button"
        className={LOGIN_FORM_APPEARANCE_CLASSES.marketing.googleButton}
        onClick={onGoogleSignIn}
      >
        Continue with Google
      </button>
    );
  }

  return (
    <Button variant="outline" className="w-full" onClick={onGoogleSignIn}>
      Continue with Google
    </Button>
  );
}
