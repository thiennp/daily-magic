import type { Metadata } from "next";

import StyleguideShell from "@/features/styleguide/StyleguideShell";
import { requireStaffPageAccess } from "@/lib/auth/requireStaffPageAccess";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import SurfacesSection from "@/features/styleguide/sections/SurfacesSection";
import BrandLogoSection from "@/features/styleguide/sections/BrandLogoSection";
import MarketingBrandSection from "@/features/styleguide/sections/MarketingBrandSection";
import AlertsSection from "@/features/styleguide/sections/AlertsSection";
import AvatarsSection from "@/features/styleguide/sections/AvatarsSection";
import BadgesSection from "@/features/styleguide/sections/BadgesSection";
import ButtonsSection from "@/features/styleguide/sections/ButtonsSection";
import ChartsSection from "@/features/styleguide/sections/ChartsSection";
import FormsSection from "@/features/styleguide/sections/FormsSection";
import ImagesSection from "@/features/styleguide/sections/ImagesSection";
import ModalsSection from "@/features/styleguide/sections/ModalsSection";
import WorkflowProgressSection from "@/features/styleguide/sections/WorkflowProgressSection";
import TablesSection from "@/features/styleguide/sections/TablesSection";
export const metadata: Metadata = {
  title: `Design system | ${AGENT_WITCH_PRODUCT_NAME}`,
  description:
    "Agent Witch design system reference for staff — brand, surfaces, buttons, alerts, forms, tables, and charts.",
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
