"use client";

import { useEffect } from "react";

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
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-4 py-12 text-gray-900 dark:text-white">
      <h1 className="text-xl font-semibold">
        {errorSlug ? "Could not connect Mac" : "Signing in…"}
      </h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {errorSlug
          ? `Returning to Agent Witch Local (${errorSlug}).`
          : "Finishing Mac setup and returning to the app."}
      </p>
      <p className="mt-6 text-xs text-gray-500 dark:text-gray-500">
        If the app does not open,{" "}
        <a className="underline" href={redirectUrl}>
          continue here
        </a>
        .
      </p>
    </main>
  );
}
