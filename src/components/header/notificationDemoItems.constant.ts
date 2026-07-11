export interface NotificationDemoItem {
  readonly id: string;
  readonly userName: string;
  readonly userImage: string;
  readonly projectName: string;
  readonly category: string;
  readonly timeAgo: string;
  readonly statusColor: "success" | "error";
  readonly href?: string;
  readonly messageSpacingClass?: string;
}

export const NOTIFICATION_DEMO_ITEMS: readonly NotificationDemoItem[] = [
  {
    id: "terry-1",
    userName: "Terry Franci",
    userImage: "/images/user/user-02.jpg",
    projectName: "Project - Nganter App",
    category: "Project",
    timeAgo: "5 min ago",
    statusColor: "success",
    messageSpacingClass: "mb-1.5 space-x-1 block",
  },
  {
    id: "alena-1",
    userName: "Alena Franci",
    userImage: "/images/user/user-03.jpg",
    projectName: "Project - Nganter App",
    category: "Project",
    timeAgo: "8 min ago",
    statusColor: "success",
    messageSpacingClass: "mb-1.5 block space-x-1",
  },
  {
    id: "jocelyn-1",
    userName: "Jocelyn Kenter",
    userImage: "/images/user/user-04.jpg",
    projectName: "Project - Nganter App",
    category: "Project",
    timeAgo: "15 min ago",
    statusColor: "success",
    href: "#",
    messageSpacingClass: "mb-1.5 block space-x-1",
  },
  {
    id: "brandon-1",
    userName: "Brandon Philips",
    userImage: "/images/user/user-05.jpg",
    projectName: "Project - Nganter App",
    category: "Project",
    timeAgo: "1 hr ago",
    statusColor: "error",
    href: "#",
    messageSpacingClass: "mb-1.5 space-x-1 block",
  },
  {
    id: "terry-2",
    userName: "Terry Franci",
    userImage: "/images/user/user-02.jpg",
    projectName: "Project - Nganter App",
    category: "Project",
    timeAgo: "5 min ago",
    statusColor: "success",
    messageSpacingClass: "mb-1.5 space-x-1 block",
  },
  {
    id: "alena-2",
    userName: "Alena Franci",
    userImage: "/images/user/user-03.jpg",
    projectName: "Project - Nganter App",
    category: "Project",
    timeAgo: "8 min ago",
    statusColor: "success",
    messageSpacingClass: "mb-1.5 space-x-1 block",
  },
  {
    id: "jocelyn-2",
    userName: "Jocelyn Kenter",
    userImage: "/images/user/user-04.jpg",
    projectName: "Project - Nganter App",
    category: "Project",
    timeAgo: "15 min ago",
    statusColor: "success",
    messageSpacingClass: "mb-1.5 space-x-1 block",
  },
  {
    id: "brandon-2",
    userName: "Brandon Philips",
    userImage: "/images/user/user-05.jpg",
    projectName: "Project - Nganter App",
    category: "Project",
    timeAgo: "1 hr ago",
    statusColor: "error",
    href: "#",
    messageSpacingClass: "mb-1.5 space-x-1 block",
  },
];
