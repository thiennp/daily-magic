import { beforeEach, describe, expect, it, vi } from "vitest";

import { createProjectApiKeyPlaintext } from "@/lib/projects/acl/projectApiKeys/hashProjectApiKey";
import { resolveProjectApiKeyActor } from "@/lib/projects/acl/projectApiKeys/resolveProjectApiKeyActor";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("resolveProjectApiKeyActor", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("resolves active key to membership user actor", async () => {
    const token = createProjectApiKeyPlaintext();
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_api_keys")) {
        return [
          {
            key_id: "key-1",
            project_id: "proj-1",
            membership_id: "mem-1",
            scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
            user_id: "bot-1",
            email: "bot@agents.agentwitch.com",
            name: "Buni",
            membership_status: "active",
          },
        ];
      }
      if (q.includes("UPDATE project_api_keys")) return [];
      return [];
    });

    const auth = await resolveProjectApiKeyActor(token);
    expect(auth).toMatchObject({
      keyId: "key-1",
      projectId: "proj-1",
      membershipId: "mem-1",
      actor: {
        id: "bot-1",
        email: "bot@agents.agentwitch.com",
        name: "Buni",
        registrationMethod: "none",
      },
    });
    expect(auth?.scopes).toContain("peer_sync");
  });

  it("rejects revoked or inactive membership keys", async () => {
    const token = createProjectApiKeyPlaintext();
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_api_keys")) {
        return [
          {
            key_id: "key-1",
            project_id: "proj-1",
            membership_id: "mem-1",
            scopes: ["acl:self"],
            user_id: "bot-1",
            email: "bot@agents.agentwitch.com",
            name: null,
            membership_status: "revoked",
          },
        ];
      }
      return [];
    });
    await expect(resolveProjectApiKeyActor(token)).resolves.toBeNull();
  });
});
