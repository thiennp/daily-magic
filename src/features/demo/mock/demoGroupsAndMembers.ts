import type { MemberItem } from "@/features/admin/types/groupManagement.types";
import { GroupRole } from "@/lib/auth/roles";

export const demoGroups = [
  { id: "group-demo-product", name: "Daily Magic GmbH" },
  { id: "group-demo-ops", name: "Northwind Energy AG" },
] as const;

export const demoMembers: readonly MemberItem[] = [
  {
    membership: {
      id: "membership-demo-1",
      role: GroupRole.GROUP_ADMIN,
      userId: "user-demo-alex",
    },
    user: {
      id: "user-demo-alex",
      email: "alex.owner@example.com",
      name: "Alex Owner",
    },
    presence: { isOnline: true, isPaired: true },
  },
  {
    membership: {
      id: "membership-demo-2",
      role: GroupRole.USER,
      userId: "user-demo-jordan",
    },
    user: {
      id: "user-demo-jordan",
      email: "jordan@example.com",
      name: "Jordan Lee",
    },
    presence: { isOnline: true, isPaired: true },
  },
  {
    membership: {
      id: "membership-demo-3",
      role: GroupRole.USER,
      userId: "user-demo-sam",
    },
    user: {
      id: "user-demo-sam",
      email: "sam@example.com",
      name: "Sam Rivera",
    },
    presence: { isOnline: false, isPaired: true },
  },
];
