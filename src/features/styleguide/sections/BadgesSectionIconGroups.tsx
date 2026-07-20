import Badge from "@/components/ui/badge/Badge";
import AppIcon from "@/components/ui/icon/AppIcon";
import { PlusIcon } from "@/icons";

import BadgeGroup from "@/features/styleguide/sections/BadgeGroup";

export default function BadgesSectionIconGroups() {
  return (
    <>
      <BadgeGroup title="Light Background with Left Icon">
        <Badge
          variant="light"
          color="primary"
          startIcon={<AppIcon icon={PlusIcon} size="sm" />}
        >
          Primary
        </Badge>
        <Badge
          variant="light"
          color="success"
          startIcon={<AppIcon icon={PlusIcon} size="sm" />}
        >
          Success
        </Badge>
        <Badge
          variant="light"
          color="error"
          startIcon={<AppIcon icon={PlusIcon} size="sm" />}
        >
          Error
        </Badge>
      </BadgeGroup>

      <BadgeGroup title="Solid Background with Right Icon">
        <Badge
          variant="solid"
          color="primary"
          endIcon={<AppIcon icon={PlusIcon} size="sm" />}
        >
          Primary
        </Badge>
        <Badge
          variant="solid"
          color="success"
          endIcon={<AppIcon icon={PlusIcon} size="sm" />}
        >
          Success
        </Badge>
        <Badge
          variant="solid"
          color="error"
          endIcon={<AppIcon icon={PlusIcon} size="sm" />}
        >
          Error
        </Badge>
      </BadgeGroup>
    </>
  );
}
