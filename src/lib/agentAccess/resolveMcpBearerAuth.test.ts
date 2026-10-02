import { beforeEach, describe, expect, it, vi } from "vitest";

import { resolveMcpBearerAuth } from "@/lib/agentAccess/resolveMcpBearerAuth";
import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { createProjectApiKeyPlaintext } from "@/lib/projects/acl/projectApiKeys/hashProjectApiKey";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("resolveMcpBearerAuth", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetAgentAccessSchemaEnsureForTests();
    resetProjectAclSchemaEnsureForTests();
  });

  it("resolves agent-access Bearer unchanged", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("UPDATE agent_access_tokens")) {
        return [];
      }
      if (q.includes("FROM agent_access_tokens")) {
        return [
          {
            id: "user-1",
            email: "agt@agents.agentwitch.com",
            name: "Scout",
            global_role: "user",
            registration_method: "none",
          },
        ];
      }
      return [];
    });

    const auth = await resolveMcpBearerAuth(
      "Bearer aw_testtokenvalue000000000",
    );
    expect(auth).toMatchObject({
      kind: "agent_access",
      actor: { id: "user-1", email: "agt@agents.agentwitch.com" },
    });
  });

  it("resolves active awc_proj_ project API key", async () => {
    const token = createProjectApiKeyPlaintext();
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("UPDATE project_api_keys")) {
        return [];
      }
      if (q.includes("FROM project_api_keys")) {
        return [
          {
            key_id: "key-1",
            project_id: "proj-1",
            membership_id: "mem-1",
            scopes: ["acl:self", "project:meta", "peer_sync"],
            user_id: "bot-1",
            email: "bot@agents.agentwitch.com",
            name: "Buni",
            membership_status: "active",
          },
        ];
      }
      return [];
    });

    const auth = await resolveMcpBearerAuth(`Bearer ${token}`);
    expect(auth).toMatchObject({
      kind: "project_api_key",
      actor: { id: "bot-1" },
      projectAuth: { projectId: "proj-1", keyId: "key-1" },
    });
  });

  it("unauthorized when Bearer missing or unknown", async () => {
    sqlMock.mockResolvedValue([]);
    const missing = await resolveMcpBearerAuth(null);
    expect(missing).toMatchObject({ isError: true });
    expect(JSON.parse((missing as { text: string }).text).code).toBe(
      "unauthorized",
    );
  });
});
