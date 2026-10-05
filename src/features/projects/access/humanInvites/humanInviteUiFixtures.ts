import type {
  AcceptHumanInviteResponse,
  CreateHumanInviteResponse,
  HumanInviteListItem,
  HumanJoinedMemberRow,
} from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

/** Sample-only fixtures (Summer trip / Anna / Ben) — never real ids. */
export const HUMAN_INVITE_STORY_PROJECT = {
  projectId: "story-summer-trip",
  projectName: "Summer trip",
  ownerDisplayName: "Anna",
  ownerEmail: "anna@example.com",
} as const;

export const FIXTURE_PENDING_INVITES: readonly HumanInviteListItem[] = [
  {
    inviteId: "invite-pending-ben",
    role: "member",
    email: "ben@example.com",
    requireEmailMatch: true,
    createdAt: "2026-10-03T10:00:00.000Z",
    expiresAt: "2026-10-10T10:00:00.000Z",
    revokedAt: null,
    maxUses: 1,
    usesRemaining: 1,
  },
  {
    inviteId: "invite-pending-viewer",
    role: "viewer",
    email: null,
    requireEmailMatch: false,
    createdAt: "2026-10-04T12:00:00.000Z",
    expiresAt: "2026-10-11T12:00:00.000Z",
    revokedAt: null,
    maxUses: 1,
    usesRemaining: 1,
  },
];

/** Open-link pending invite (checkbox off). */
export const FIXTURE_PENDING_OPEN: HumanInviteListItem = {
  inviteId: "invite-pending-open",
  role: "member",
  email: "casey@example.com",
  requireEmailMatch: false,
  createdAt: "2026-10-04T09:00:00.000Z",
  expiresAt: "2026-10-11T09:00:00.000Z",
  revokedAt: null,
  maxUses: 1,
  usesRemaining: 1,
};

export const FIXTURE_JOINED_HUMANS: readonly HumanJoinedMemberRow[] = [
  {
    membershipId: "mem-owner-anna",
    userId: "user-anna",
    email: "anna@example.com",
    displayName: "Anna",
    role: "owner",
    memberKind: "human",
    membershipState: "active",
    joinedAt: null,
  },
  {
    membershipId: "mem-member-dana",
    userId: "user-dana",
    email: "dana@example.com",
    displayName: "Dana",
    role: "member",
    memberKind: "human",
    membershipState: "active",
    joinedAt: "2026-09-28T15:00:00.000Z",
  },
];

/** POST create 201 shape (token plaintext once). */
export const FIXTURE_CREATE_201: CreateHumanInviteResponse = {
  inviteId: "invite-created-1",
  url: "https://example.test/invite/h/storytoken01234567",
  token: "storytoken01234567",
  role: "member",
  email: "ben@example.com",
  requireEmailMatch: true,
  expiresAt: "2026-10-12T10:00:00.000Z",
  maxUses: 1,
  usesRemaining: 1,
};

export const FIXTURE_INVITED_EMAIL_MASKED = "b***@e***.com";

/** POST accept 200 shape. */
export const FIXTURE_ACCEPT_200: AcceptHumanInviteResponse = {
  ok: true,
  projectId: HUMAN_INVITE_STORY_PROJECT.projectId,
  membershipId: "mem-new-ben",
  role: "member",
  status: "active",
  projectDisplayName: "Ben",
};
