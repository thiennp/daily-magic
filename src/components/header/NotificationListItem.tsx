import Image from "next/image";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import type { NotificationDemoItem } from "@/components/header/notificationDemoItems.constant";

interface NotificationListItemProps {
  readonly item: NotificationDemoItem;
  readonly onItemClick: () => void;
}

const STATUS_INDICATOR_CLASS_MAP = {
  success: "bg-success-500",
  error: "bg-error-500",
} as const;

export default function NotificationListItem({
  item,
  onItemClick,
}: NotificationListItemProps) {
  const messageSpacingClass =
    item.messageSpacingClass ?? "mb-1.5 space-x-1 block";

  return (
    <li>
      <DropdownItem
        onItemClick={onItemClick}
        className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
        href={item.href}
      >
        <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
          <Image
            width={40}
            height={40}
            src={item.userImage}
            alt="User"
            className={
              item.id === "brandon-2"
                ? "overflow-hidden rounded-full"
                : "w-full overflow-hidden rounded-full"
            }
          />
          <span
            className={`absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white ${STATUS_INDICATOR_CLASS_MAP[item.statusColor]} dark:border-gray-900`}
          ></span>
        </span>

        <span className="block">
          <span
            className={`${messageSpacingClass} text-theme-sm text-gray-500 dark:text-gray-400`}
          >
            <span className="font-medium text-gray-800 dark:text-white/90">
              {item.userName}
            </span>
            <span>
              {item.userName === "Alena Franci" ||
              item.userName === "Brandon Philips"
                ? " requests permission to change"
                : "requests permission to change"}
            </span>
            <span className="font-medium text-gray-800 dark:text-white/90">
              {item.projectName}
            </span>
          </span>

          <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
            <span>{item.category}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>{item.timeAgo}</span>
          </span>
        </span>
      </DropdownItem>
    </li>
  );
}
