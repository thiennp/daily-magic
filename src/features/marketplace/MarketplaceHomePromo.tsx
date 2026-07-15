"use client";

import Link from "next/link";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_SECONDARY_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

export default function MarketplaceHomePromo() {
  return (
    <AppPanel>
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Marketplace</h2>
      <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Install free starters or listings from teammates on your Mac.
      </p>
      <Link
        href="/marketplace"
        className={`mt-4 ${APP_SURFACE_CTA_SECONDARY_CLASS}`}
      >
        Open marketplace
      </Link>
    </AppPanel>
  );
}
