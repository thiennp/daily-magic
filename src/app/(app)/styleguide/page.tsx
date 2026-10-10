import type { Metadata } from "next";

import {
  StyleguideShell,
  SurfacesSection,
  BrandLogoSection,
  MarketingBrandSection,
  AlertsSection,
  AvatarsSection,
  BadgesSection,
  ButtonsSection,
  ChartsSection,
  FormsSection,
  ImagesSection,
  ModalsSection,
  WorkflowProgressSection,
  TablesSection,
} from "@/features/styleguide/public-api/presentation";
import { requireStaffPageAccess } from "@/lib/auth/requireStaffPageAccess";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
export const metadata: Metadata = {
  title: `Design system | ${AGENT_WITCH_PRODUCT_NAME}`,
  description:
    "AgentWitch design system reference for staff — brand, surfaces, buttons, alerts, forms, tables, and charts.",
};

export default async function StyleguidePage() {
  await requireStaffPageAccess();

  return (
    <StyleguideShell>
      <BrandLogoSection />
      <MarketingBrandSection />
      <SurfacesSection />
      <ButtonsSection />
      <AlertsSection />
      <BadgesSection />
      <AvatarsSection />
      <ImagesSection />
      <ModalsSection />
      <WorkflowProgressSection />
      <FormsSection />
      <TablesSection />
      <ChartsSection />
    </StyleguideShell>
  );
}
