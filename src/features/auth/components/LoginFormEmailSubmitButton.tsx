import Button from "@/components/ui/button/Button";
import type { LoginFormAppearance } from "@/features/auth/loginFormAppearance.constant";
import { LOGIN_FORM_APPEARANCE_CLASSES } from "@/features/auth/loginFormAppearance.constant";

interface LoginFormEmailSubmitButtonProps {
  readonly appearance: LoginFormAppearance;
  readonly isSubmitting: boolean;
}

export default function LoginFormEmailSubmitButton({
  appearance,
  isSubmitting,
}: LoginFormEmailSubmitButtonProps) {
  if (appearance === "marketing") {
    return (
      <button
        type="submit"
        aria-label="Email me a sign-in link"
        className={LOGIN_FORM_APPEARANCE_CLASSES.marketing.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Email me a sign-in link"}
      </button>
    );
  }

  return (
    <Button
      type="submit"
      className="w-full"
      aria-label="Email me a sign-in link"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Sending..." : "Email me a sign-in link"}
    </Button>
  );
}
