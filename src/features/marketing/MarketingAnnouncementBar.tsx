import { MARKETING_ANNOUNCEMENT_COPY } from "@/features/marketing/marketingAnnouncementCopy.constant";
import { MARKETING_ANNOUNCEMENT_BAR_CLASSES } from "@/features/marketing/marketingDesignSystem.constant";

export default function MarketingAnnouncementBar() {
  return (
    <div className={MARKETING_ANNOUNCEMENT_BAR_CLASSES} role="note">
      {MARKETING_ANNOUNCEMENT_COPY}
    </div>
  );
}
