import Badge from "@/components/ui/badge/Badge";
import AppIcon from "@/components/ui/icon/AppIcon";
import { PlusIcon } from "@/icons";

import BadgeGroup from "@/features/styleguide/sections/BadgeGroup";

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

        <BadgeGroup title="Light Background with Left Icon">
          <Badge variant="light" color="primary" startIcon={<AppIcon icon={PlusIcon} size="sm" />}>
            Primary
          </Badge>
          <Badge variant="light" color="success" startIcon={<AppIcon icon={PlusIcon} size="sm" />}>
            Success
          </Badge>
          <Badge variant="light" color="error" startIcon={<AppIcon icon={PlusIcon} size="sm" />}>
            Error
          </Badge>
        </BadgeGroup>

        <BadgeGroup title="Solid Background with Right Icon">
          <Badge variant="solid" color="primary" endIcon={<AppIcon icon={PlusIcon} size="sm" />}>
            Primary
          </Badge>
          <Badge variant="solid" color="success" endIcon={<AppIcon icon={PlusIcon} size="sm" />}>
            Success
          </Badge>
          <Badge variant="solid" color="error" endIcon={<AppIcon icon={PlusIcon} size="sm" />}>
            Error
          </Badge>
        </BadgeGroup>
      </div>
    </section>
  );
}
