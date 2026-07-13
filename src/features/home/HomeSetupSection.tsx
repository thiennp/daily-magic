import AppPanel from "@/components/surfaces/AppPanel";
import HomeSetupSectionContent from "@/features/home/HomeSetupSectionContent";

export default function HomeSetupSection() {
  return (
    <AppPanel as="details" id="your-setup">
      <summary className="cursor-pointer text-lg font-semibold text-gray-800 dark:text-white/90">
        Your setup (rules and sharing)
      </summary>
      <HomeSetupSectionContent />
    </AppPanel>
  );
}
