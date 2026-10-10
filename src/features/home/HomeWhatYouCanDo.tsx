"use client";

import Link from "next/link";

import {
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { useMyMacDevices } from "@/features/agent/hooks/public-api/presentation";
import ConnectAnotherMacButton from "@/features/home/ConnectAnotherMacButton";
import { HOME_WHAT_YOU_CAN_DO_ITEMS } from "@/features/home/constants/public-api/types";

interface HomeWhatYouCanDoProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
}

/** Design "What you can do": four accordion items, each with one action. */
export default function HomeWhatYouCanDo(props: HomeWhatYouCanDoProps) {
  const { devices } = useMyMacDevices();

  return (
    <section aria-labelledby="home-what-you-can-do-heading" className="mt-8">
      <h2
        id="home-what-you-can-do-heading"
        className={`mb-3 ${APP_SURFACE_SECTION_TITLE_CLASS}`}
      >
        What you can do
      </h2>
      <div className="divide-y divide-awc-border rounded-awc-card border border-awc-border bg-awc-surface">
        {HOME_WHAT_YOU_CAN_DO_ITEMS.map((item) => (
          <details key={item.id} className="group px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-awc-fg">
              {item.title}
              <span aria-hidden className="transition group-open:rotate-180">
                ⌄
              </span>
            </summary>
            <div className="mt-2 space-y-3">
              <p className="text-sm text-awc-fg-muted">{item.body}</p>
              {item.action.kind === "connect" ? (
                <ConnectAnotherMacButton
                  {...props}
                  hasExistingDevices={devices.length > 0}
                  className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
                />
              ) : (
                <Link
                  href={item.action.href}
                  className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
                >
                  {item.action.label}
                </Link>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
