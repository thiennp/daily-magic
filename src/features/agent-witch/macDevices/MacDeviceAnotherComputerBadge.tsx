import Badge from "@/components/ui/badge/Badge";
import { ANOTHER_COMPUTER_DEVICE_BADGE_LABEL } from "@/components/ui/badge/anotherComputerDeviceBadgeLabel.constant";

export default function MacDeviceAnotherComputerBadge() {
  return (
    <Badge size="sm" color="light" variant="light">
      {ANOTHER_COMPUTER_DEVICE_BADGE_LABEL}
    </Badge>
  );
}
