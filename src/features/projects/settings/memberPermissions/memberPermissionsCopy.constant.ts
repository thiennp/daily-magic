import type { ProjectMemberPermissionKey } from "@/lib/projects/acl/memberPermissions/projectMemberPermission.constant";

/** Product EN draft (pending copy lock). Owner-only card; members see no controls. */
export const MEMBER_PERMISSIONS_COPY = {
  heading: "What members can do",
  intro: "Members can do everything by default. Turn off what you don't want.",
  reset: "Allow everything again",
  loading: "Loading…",
  loadError: "Couldn't load these settings.",
  saveError: "Couldn't save this change. Try again.",
  retry: "Try again",
} as const;

export type MemberPermissionRowCopy = {
  readonly key: ProjectMemberPermissionKey;
  readonly label: string;
  readonly hint: string;
};

export const MEMBER_PERMISSION_GROUPS: readonly {
  readonly title: string;
  readonly rows: readonly MemberPermissionRowCopy[];
}[] = [
  {
    title: "Skills",
    rows: [
      {
        key: "skill.publish",
        label: "Publish skills",
        hint: "Off: members can only save drafts on skills someone else published.",
      },
      {
        key: "skill.delete",
        label: "Delete skills",
        hint: "Off: only you can delete skills.",
      },
    ],
  },
  {
    title: "Auto skills",
    rows: [
      {
        key: "autoSkill.manage",
        label: "Use auto skills",
        hint: "Turn them on or off, scan, and answer their questions.",
      },
    ],
  },
];
