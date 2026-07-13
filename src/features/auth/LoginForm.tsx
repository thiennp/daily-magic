"use client";

import LoginFormEmailField from "@/features/auth/components/LoginFormEmailField";
import LoginFormEmailSubmitButton from "@/features/auth/components/LoginFormEmailSubmitButton";
import LoginFormGoogleButton from "@/features/auth/components/LoginFormGoogleButton";
import useLoginForm from "@/features/auth/hooks/useLoginForm";
import type { LoginFormAppearance } from "@/features/auth/loginFormAppearance.constant";
import { LOGIN_FORM_APPEARANCE_CLASSES } from "@/features/auth/loginFormAppearance.constant";
import Alert from "@/components/ui/alert/Alert";

interface LoginFormProps {
  readonly defaultCallbackUrl?: string;
  readonly appearance?: LoginFormAppearance;
}

export default function LoginForm({
  defaultCallbackUrl = "/",
  appearance = "default",
}: LoginFormProps) {
  const {
    email,
    setEmail,
    isSubmitting,
    isGoogleSigningIn,
    displayedFeedback,
    handleEmailSignIn,
    handleGoogleSignIn,
  } = useLoginForm({ defaultCallbackUrl });
  const emailInputId = "login-email";
  const appearanceClasses = LOGIN_FORM_APPEARANCE_CLASSES[appearance];

  return (
    <div className="space-y-6">
      <p className={appearanceClasses.description}>
        Use Google or a magic link sent to your email.
      </p>

      <div className="space-y-4">
        <LoginFormGoogleButton
          appearance={appearance}
          disabled={isGoogleSigningIn}
          onGoogleSignIn={handleGoogleSignIn}
        />

        <div className={appearanceClasses.divider}>or email</div>

        <LoginFormEmailField
          appearance={appearance}
          emailInputId={emailInputId}
          email={email}
          onEmailChange={setEmail}
        />

        <LoginFormEmailSubmitButton
          appearance={appearance}
          isSubmitting={isSubmitting}
          onEmailSignIn={() => {
            void handleEmailSignIn();
          }}
        />

        {displayedFeedback ? (
          <Alert
            variant={displayedFeedback.variant}
            title={displayedFeedback.title}
            message={displayedFeedback.message}
          />
        ) : null}
      </div>
    </div>
  );
}
