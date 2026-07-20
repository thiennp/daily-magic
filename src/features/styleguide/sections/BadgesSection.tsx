import Badge from "@/components/ui/badge/Badge";
import { THIS_MAC_DEVICE_BADGE_LABEL } from "@/components/ui/badge/thisMacDeviceBadgeLabel.constant";

import BadgeGroup from "@/features/styleguide/sections/BadgeGroup";
import BadgesSectionIconGroups from "@/features/styleguide/sections/BadgesSectionIconGroups";

export default function BadgesSection() {
  return (
    <section id="badges" className="scroll-mt-28">
      <h2 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Badges
      </h2>
      <div className="space-y-5 sm:space-y-6">
        <BadgeGroup title="With Light Background">
          <Badge variant="light" color="primary">
            Primary
          </Badge>
          <Badge variant="light" color="success">
            Success
          </Badge>
          <Badge variant="light" color="error">
            Error
          </Badge>
          <Badge variant="light" color="warning">
            Warning
          </Badge>
          <Badge variant="light" color="info">
            Info
          </Badge>
          <Badge variant="light" color="light">
            Light
          </Badge>
          <Badge variant="light" color="dark">
            Dark
          </Badge>
        </BadgeGroup>

        <BadgeGroup title="With Solid Background">
          <Badge variant="solid" color="primary">
            Primary
          </Badge>
          <Badge variant="solid" color="success">
            Success
          </Badge>
          <Badge variant="solid" color="successDark">
            Success dark
          </Badge>
          <Badge variant="solid" color="error">
            Error
          </Badge>
          <Badge variant="solid" color="warning">
            Warning
          </Badge>
          <Badge variant="solid" color="info">
            Info
          </Badge>
          <Badge variant="solid" color="light">
            Light
          </Badge>
          <Badge variant="solid" color="dark">
            Dark
          </Badge>
        </BadgeGroup>

        <BadgeGroup title="Device context">
          <Badge variant="solid" color="successDark" size="sm">
            {THIS_MAC_DEVICE_BADGE_LABEL}
          </Badge>
        </BadgeGroup>

        <BadgesSectionIconGroups />
      </div>
    </section>
  );
}
