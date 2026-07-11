import type { Metadata } from "next";
import StyleguideShell from "@/features/styleguide/StyleguideShell";
import AlertsSection from "@/features/styleguide/sections/AlertsSection";
import AvatarsSection from "@/features/styleguide/sections/AvatarsSection";
import BadgesSection from "@/features/styleguide/sections/BadgesSection";
import ButtonsSection from "@/features/styleguide/sections/ButtonsSection";
import ChartsSection from "@/features/styleguide/sections/ChartsSection";
import FormsSection from "@/features/styleguide/sections/FormsSection";
import ImagesSection from "@/features/styleguide/sections/ImagesSection";
import ModalsSection from "@/features/styleguide/sections/ModalsSection";
import TablesSection from "@/features/styleguide/sections/TablesSection";
import VideosSection from "@/features/styleguide/sections/VideosSection";

export const metadata: Metadata = {
  title: "Styleguide | Daily Magic",
  description:
    "TailAdmin component styleguide with buttons, alerts, forms, tables, charts, and more.",
};

export default function StyleguidePage() {
  return (
    <StyleguideShell>
      <ButtonsSection />
      <AlertsSection />
      <BadgesSection />
      <AvatarsSection />
      <ImagesSection />
      <VideosSection />
      <ModalsSection />
      <FormsSection />
      <TablesSection />
      <ChartsSection />
    </StyleguideShell>
  );
}
