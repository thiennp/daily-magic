import Link from "next/link";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_CLASS,
  APP_SURFACE_CTA_SECONDARY_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

export interface EmptyStateCtaLink {
  readonly label: string;
  readonly href: string;
}

export interface EmptyStatePanelProps {
  readonly title: string;
  readonly body: string;
  readonly primaryCta: EmptyStateCtaLink;
  readonly secondaryCta?: EmptyStateCtaLink;
  readonly tertiaryLink?: EmptyStateCtaLink;
  readonly density: "page" | "section";
  /** Match full-width lists (e.g. reports); default centers narrow card. */
  readonly width?: "centered" | "full";
}

const PANEL_WIDTH_CLASS: Record<
  NonNullable<EmptyStatePanelProps["width"]>,
  string
> = {
  centered: "mx-auto w-full max-w-lg",
  full: "w-full",
};

export default function EmptyStatePanel({
  title,
  body,
  primaryCta,
  secondaryCta,
  tertiaryLink,
  density,
  width = "centered",
}: EmptyStatePanelProps) {
  const panelPadding = density === "page" ? "default" : "compact";
  const titleClassName =
    density === "page"
      ? "text-xl font-semibold text-awc-fg dark:text-white sm:text-2xl"
      : "text-lg font-semibold text-awc-fg dark:text-white/90";

  return (
    <AppPanel padding={panelPadding} className={PANEL_WIDTH_CLASS[width]}>
      <div className="flex flex-col gap-4">
        <h2 className={titleClassName}>{title}</h2>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>{body}</p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            href={primaryCta.href}
            className={APP_SURFACE_CTA_PRIMARY_CLASS}
          >
            {primaryCta.label}
          </Link>
          {secondaryCta !== undefined ? (
            <Link
              href={secondaryCta.href}
              className={APP_SURFACE_CTA_SECONDARY_CLASS}
            >
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
        {tertiaryLink !== undefined ? (
          <Link
            href={tertiaryLink.href}
            className={APP_SURFACE_TEXT_LINK_CLASS}
          >
            {tertiaryLink.label}
          </Link>
        ) : null}
      </div>
    </AppPanel>
  );
}
