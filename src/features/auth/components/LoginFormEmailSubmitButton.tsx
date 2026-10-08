import Button from "@/components/ui/button/Button";
import type { LoginFormAppearance } from "@/features/auth/loginFormAppearance.constant";
import { LOGIN_FORM_APPEARANCE_CLASSES } from "@/features/auth/loginFormAppearance.constant";

interface LoginFormEmailSubmitButtonProps {
  readonly appearance: LoginFormAppearance;
  readonly isSubmitting: boolean;
  readonly idleLabel?: string;
}

export default function LoginFormEmailSubmitButton({
  appearance,
  isSubmitting,
  idleLabel = "Email me a sign-in link",
}: LoginFormEmailSubmitButtonProps) {
  const label = isSubmitting ? "Sending…" : idleLabel;

  if (appearance === "marketing") {
    return (
      <button
        type="submit"
        className={LOGIN_FORM_APPEARANCE_CLASSES.marketing.submitButton}
        disabled={isSubmitting}
        aria-busy={isSubmitting || undefined}
      >
        {label}
      </button>
    );
  }

  return (
    <Button type="submit" className="w-full" disabled={isSubmitting}>
      {label}
    </Button>
  );
}
