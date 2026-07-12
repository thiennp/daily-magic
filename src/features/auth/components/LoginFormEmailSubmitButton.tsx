import Button from "@/components/ui/button/Button";
import type { LoginFormAppearance } from "@/features/auth/loginFormAppearance.constant";
import { LOGIN_FORM_APPEARANCE_CLASSES } from "@/features/auth/loginFormAppearance.constant";

interface LoginFormEmailSubmitButtonProps {
  readonly appearance: LoginFormAppearance;
  readonly isSubmitting: boolean;
  readonly onEmailSignIn: () => void;
}

export default function LoginFormEmailSubmitButton({
  appearance,
  isSubmitting,
  onEmailSignIn,
}: LoginFormEmailSubmitButtonProps) {
  if (appearance === "marketing") {
    return (
      <button
        type="button"
        aria-label="Email me a sign-in link"
        className={LOGIN_FORM_APPEARANCE_CLASSES.marketing.submitButton}
        disabled={isSubmitting}
        onClick={onEmailSignIn}
      >
        {isSubmitting ? "Sending..." : "Email me a sign-in link"}
      </button>
    );
  }

  return (
    <Button
      className="w-full"
      aria-label="Email me a sign-in link"
      disabled={isSubmitting}
      onClick={onEmailSignIn}
    >
      {isSubmitting ? "Sending..." : "Email me a sign-in link"}
    </Button>
  );
}
