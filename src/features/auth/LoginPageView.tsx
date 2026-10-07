import { Suspense } from "react";

import LoginForm from "@/features/auth/LoginForm";
import { LOGIN_PAGE_COPY } from "@/features/auth/loginPageCopy.constant";
import MarketingCard from "@/features/marketing/MarketingCard";
import MarketingShell from "@/features/marketing/MarketingShell";

/** Dedicated sign-in layout (not the home marketing hero). */
type LoginPageViewProps = {
  /** Allowlisted reason for this sign-in (e.g. assistant owner). */
  readonly notice?: string | null;
};

export default function LoginPageView({ notice = null }: LoginPageViewProps) {
  return (
    <MarketingShell showSignIn={false} showFooter={false}>
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-awc-fg sm:text-4xl">
            {LOGIN_PAGE_COPY.title}
          </h1>
          <p className="mt-4 text-base text-awc-fg-muted">
            {LOGIN_PAGE_COPY.description}
          </p>
        </div>

        <MarketingCard>
          <h2 className="text-xl font-semibold text-awc-fg">Sign in</h2>
          {notice !== null ? (
            <p role="status" className="mt-2 text-sm font-medium text-awc-fg">
              {notice}
            </p>
          ) : null}
          <p className="mt-2 text-sm text-awc-fg-muted">
            Use your email link or Google account to continue.
          </p>
          <div className="mt-6">
            <Suspense
              fallback={<div className="text-sm text-awc-fg-muted">Loading…</div>}
            >
              <LoginForm defaultCallbackUrl="/" appearance="marketing" />
            </Suspense>
          </div>
        </MarketingCard>
      </div>
    </MarketingShell>
  );
}
