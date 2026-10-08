"use client";

import { useEffect } from "react";

import {
  APP_SURFACE_CTA_PRIMARY_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

type MacConnectBootstrapClientProps = {
  readonly redirectUrl: string;
  readonly errorSlug?: string;
};

/** Shows signing-in state, then hands off to the Mac app via custom scheme. */
export default function MacConnectBootstrapClient({
  redirectUrl,
  errorSlug,
}: MacConnectBootstrapClientProps) {
  useEffect(() => {
    window.location.assign(redirectUrl);
  }, [redirectUrl]);

  return (
    <main className="mx-auto flex w-full max-w-[720px] flex-col gap-5 px-4 py-10 text-awc-fg sm:py-14">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Connect</h1>
        <p className="text-sm text-awc-fg-muted">
          Link this computer to your account.
        </p>
      </header>
      <section
        aria-labelledby="connect-heading"
        className="flex flex-col gap-4 rounded-xl border border-awc-border bg-awc-surface p-5"
      >
        <h2 id="connect-heading" className="text-base font-semibold">
          {errorSlug ? "Could not connect Mac" : "Signing in…"}
        </h2>
        {errorSlug ? (
          <p role="alert" className="text-sm text-awc-bad">
            Returning to AgentWitch Local ({errorSlug}). Nothing was connected.
          </p>
        ) : (
          <p role="status" className="text-sm text-awc-fg-muted">
            Finishing computer setup and returning to the app.
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <a href={redirectUrl} className={APP_SURFACE_CTA_PRIMARY_CLASS}>
            {errorSlug ? "Try again" : "Open AgentWitch"}
          </a>
        </div>
        <p className="text-[13px] text-awc-fg-muted">
          Not installed yet?{" "}
          <a href="/download" className={APP_SURFACE_TEXT_LINK_CLASS}>
            Download AgentWitch
          </a>
        </p>
      </section>
    </main>
  );
}
