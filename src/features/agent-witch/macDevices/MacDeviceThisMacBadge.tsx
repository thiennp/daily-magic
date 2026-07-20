import Badge from "@/components/ui/badge/Badge";
import { THIS_MAC_DEVICE_BADGE_LABEL } from "@/components/ui/badge/thisMacDeviceBadgeLabel.constant";

export default function MacDeviceThisMacBadge() {
  return (
    <Badge size="sm" color="successDark" variant="solid">
      {THIS_MAC_DEVICE_BADGE_LABEL}
    </Badge>
  );
}
