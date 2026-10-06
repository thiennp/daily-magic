/**
 * Test-only in-memory project for the invite → wake owner flow: one redeemed,
 * active member bot ("Coder") with no wake link until the owner saves one.
 */
import { GUARDED_INSERT } from "@/lib/projects/acl/webhooks/grokWebhookSql.fixtures";

export const WAKE_FLOW = {
  projectId: "proj-1",
  ownerUserId: "owner-1",
  botUserId: "bot-user-1",
  membershipId: "mem-coder",
} as const;

export const wakeFlowDb = { grokUrl: null as string | null };

const botMemberView = {
  id: WAKE_FLOW.membershipId,
  userId: WAKE_FLOW.botUserId,
  role: "member",
  memberKind: "bot",
  status: "active",
  teamLabel: null,
  scopes: [],
  projectDisplayName: "Coder",
  isAgent: true,
  displayName: null,
  email: null,
  image: null,
  createdAt: "2026-10-06T06:00:00.000Z",
  revokedAt: null,
};

/** Fake tagged-template SQL backed by `wakeFlowDb`. */
export const wakeFlowSql = async (
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<unknown[]> => {
  const text = strings.join("?");
  if (text.includes(GUARDED_INSERT)) {
    wakeFlowDb.grokUrl = String(values[0]);
    return [{ webhook_url: values[0] }];
  }
  if (text.includes("grok_wake_link_set")) {
    const set = wakeFlowDb.grokUrl !== null;
    return [
      {
        id: WAKE_FLOW.membershipId,
        grok_wake_link_set: set,
        other_wake_link_set: false,
      },
    ];
  }
  if (text.includes("LEFT JOIN project_membership_grok_routine_webhooks")) {
    return [{ webhook_url: wakeFlowDb.grokUrl, last_wake_result: null }];
  }
  if (text.includes("LEFT JOIN project_membership_webhooks")) {
    return [{ webhook_url: null, secret_set: false }];
  }
  return [];
};

/** vi.mock factory bodies (load via dynamic import inside the factory). */
export const wakeFlowModuleMocks = {
  ensureSchema: { ensureProjectAclSchema: async () => undefined },
  userProjects: {
    getUserProjectById: async () => ({
      id: WAKE_FLOW.projectId,
      ownerUserId: WAKE_FLOW.ownerUserId,
    }),
  },
  memberships: { listProjectMembershipsForProject: async () => [] },
  views: {
    buildMembershipViews: async () => [botMemberView],
    buildPendingRequestViews: async () => [],
  },
  pending: { listPendingProjectAccessRequests: async () => [] },
  computers: {
    enrichProjectAccessComputerMembers: async (rows: unknown) => rows,
  },
  liveDevices: { resolveAccessComputerLiveDeviceIds: async () => new Set() },
  patch: { handleProjectAccessPatch: async () => Response.json({}) },
  safeUrl: {
    assertSafeProjectWebhookUrl: async (raw: unknown) =>
      String(raw).startsWith("https://")
        ? { ok: true, url: new URL(String(raw)) }
        : { ok: false, code: "https_only" },
  },
};
