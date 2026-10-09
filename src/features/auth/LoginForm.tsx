"use client";

import { useEffect } from "react";

import LoginCheckEmailStep from "@/features/auth/components/LoginCheckEmailStep";
import LoginFormEmailField from "@/features/auth/components/LoginFormEmailField";
import LoginFormEmailSubmitButton from "@/features/auth/components/LoginFormEmailSubmitButton";
import LoginFormGoogleButton from "@/features/auth/components/LoginFormGoogleButton";
import LoginTermsCheckbox from "@/features/auth/components/LoginTermsCheckbox";
import useLoginForm from "@/features/auth/hooks/useLoginForm";
import useLoginTermsGate, {
  type LoginTermsGate,
} from "@/features/auth/hooks/useLoginTermsGate";
import type { LoginFormAppearance } from "@/features/auth/loginFormAppearance.constant";
import { LOGIN_FORM_APPEARANCE_CLASSES } from "@/features/auth/loginFormAppearance.constant";
import Alert from "@/components/ui/alert/Alert";

export type LoginFormMode = "in" | "up";

interface LoginFormProps {
  readonly defaultCallbackUrl?: string;
  readonly appearance?: LoginFormAppearance;
  readonly mode?: LoginFormMode;
  /** Lets the card swap its title while the "Check your email" step shows. */
  readonly onSentChange?: (sent: boolean) => void;
  /** Sign-up consent owned by the parent: blocked clicks call `onMissing`. */
  readonly termsGate?: LoginTermsGate;
}

export default function LoginForm({
  defaultCallbackUrl = "/",
  appearance = "default",
  mode = "in",
  onSentChange,
  termsGate,
}: LoginFormProps) {
  const form = useLoginForm({ defaultCallbackUrl });
  const terms = useLoginTermsGate(mode === "up", termsGate);
  const appearanceClasses = LOGIN_FORM_APPEARANCE_CLASSES[appearance];
  const isSent = form.sentEmail !== null;

  useEffect(() => {
    onSentChange?.(isSent);
  }, [isSent, onSentChange]);

  if (form.sentEmail !== null) {
    return (
      <LoginCheckEmailStep
        email={form.sentEmail}
        isSending={form.isSubmitting}
        onResend={() =>
          void form.handleEmailSignIn(form.sentEmail ?? undefined)
        }
        onUseAnotherEmail={form.resetSent}
      />
    );
  }

  return (
    <div className="space-y-6">
      {appearance !== "marketing" ? (
        <p className={appearanceClasses.description}>
          Use Google or a sign-in link sent to your email.
        </p>
      ) : null}

      <div className="space-y-4">
        <LoginFormGoogleButton
          appearance={appearance}
          disabled={form.isGoogleSigningIn}
          onGoogleSignIn={() => terms.guard(form.handleGoogleSignIn)}
        />

        <div className={appearanceClasses.divider}>or use email</div>

        <form
          noValidate
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            terms.guard(() => {
              const submitted = new FormData(e.currentTarget).get("email");
              void form.handleEmailSignIn(
                typeof submitted === "string" ? submitted : undefined,
              );
            });
          }}
        >
          <LoginFormEmailField
            appearance={appearance}
            emailInputId="login-email"
            email={form.email}
            error={form.fieldError}
            onEmailChange={form.setEmail}
          />
          {mode === "up" ? (
            <LoginTermsCheckbox
              checked={terms.termsChecked}
              error={terms.termsError}
              onChange={terms.setChecked}
            />
          ) : null}
          <LoginFormEmailSubmitButton
            appearance={appearance}
            isSubmitting={form.isSubmitting}
            idleLabel={
              mode === "up" ? "Create account" : "Email me a sign-in link"
            }
          />
        </form>

        {form.displayedFeedback ? (
          <Alert
            variant={form.displayedFeedback.variant}
            title={form.displayedFeedback.title}
            message={form.displayedFeedback.message}
          />
        ) : null}
      </div>
    </div>
  );
}
