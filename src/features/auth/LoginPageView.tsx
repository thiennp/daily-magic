import { Suspense } from "react";

import LoginCard from "@/features/auth/LoginCard";
import { MarketingShell } from "@/features/marketing/public-api/presentation";

/** Dedicated sign-in layout: one centered card (not the home marketing hero). */
type LoginPageViewProps = {
  /** Allowlisted reason for this sign-in (e.g. assistant owner). */
  readonly notice?: string | null;
};

function LoginCardSkeleton() {
  return (
    <div className="mx-auto mt-2 w-full max-w-[440px]">
      <p className="sr-only" role="status">
        Loading…
      </p>
      <div
        aria-hidden="true"
        className="flex animate-pulse flex-col gap-4 rounded-xl border border-awc-border bg-awc-surface p-6 motion-reduce:animate-none"
      >
        <div className="mx-auto size-11 rounded-full bg-awc-fill" />
        <div className="mx-auto h-7 w-32 rounded bg-awc-fill" />
        <div className="h-11 rounded-md bg-awc-fill" />
        <div className="h-11 rounded-md bg-awc-fill" />
      </div>
    </div>
  );
}

export default function LoginPageView({ notice = null }: LoginPageViewProps) {
  return (
    <MarketingShell showSignIn={false} showFooter={false}>
      <Suspense fallback={<LoginCardSkeleton />}>
        <LoginCard notice={notice} />
      </Suspense>
    </MarketingShell>
  );
}
