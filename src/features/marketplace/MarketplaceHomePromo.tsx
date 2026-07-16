"use client";

import Link from "next/link";

import AppPanel from "@/components/surfaces/AppPanel";
import AppIcon from "@/components/ui/icon/AppIcon";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_SECONDARY_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";
import { PlugInIcon } from "@/icons";

export default function MarketplaceHomePromo() {
  return (
    <AppPanel>
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Marketplace</h2>
      <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        {MAC_WORKER_BENEFIT_COPY.marketplacePromo}
      </p>
      <Link
        href="/marketplace"
        className={`mt-4 gap-2 ${APP_SURFACE_CTA_SECONDARY_CLASS}`}
      >
        <AppIcon icon={PlugInIcon} size="sm" />
        Open marketplace
      </Link>
    </AppPanel>
  );
}
