import {
  ACL_APPROVE_MEMBER_ROW,
  ACL_APPROVE_REQUEST_ROW,
} from "@/lib/projects/acl/projectAclRequestApprove.fixtures";

export const APPROVE_DELIVERY_MODE_PROJECT = {
  id: "proj-1",
  ownerUserId: "owner-1",
  deviceId: "mac-1",
  name: "Demo",
  folderPath: "/tmp/demo",
  repoUrls: [] as string[],
  defaultBranch: null,
  lastUsedAt: null,
  createdAt: "2026-10-01T00:00:00.000Z",
  updatedAt: "2026-10-01T00:00:00.000Z",
};

export const APPROVE_DELIVERY_MODE_API_KEY = {
  ok: true as const,
  keyId: "key-1",
  plaintext: "awc_proj_test",
  prefix: "awc_proj_",
  last4: "test",
  scopes: ["acl:self"],
};

type SqlMock = {
  mockImplementation: (fn: (...args: never[]) => unknown) => unknown;
};

/** Pending approve SQL stub that returns an invite_id for join delivery_mode. */
export const stubApproveDeliveryModeSql = (sqlMock: SqlMock): void => {
  sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
    const q = String(strings);
    if (q.includes("FROM project_access_requests") && q.includes("pending")) {
      return [
        {
          ...ACL_APPROVE_REQUEST_ROW,
          status: "pending",
          invite_id: "inv-9",
        },
      ];
    }
    if (q.includes("WITH approved_request AS")) {
      return [
        {
          request_row: {
            ...ACL_APPROVE_REQUEST_ROW,
            status: "approved",
            invite_id: "inv-9",
          },
          member_row: {
            ...ACL_APPROVE_MEMBER_ROW,
            project_display_name: "Coder",
          },
        },
      ];
    }
    return [];
  });
};
