import type { Mock } from "vitest";

import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { resetDeviceCodeSchemaEnsureForTests } from "@/lib/agentAccess/deviceCode/ensureDeviceCodeSchema";
import { resetOauthSchemaEnsureForTests } from "@/lib/agentAccess/oauth/ensureOauthSchema";
import { handleOauthSql } from "@/lib/agentAccess/oauth/oauthSqlMock.handlers";
import { resetOauthStore } from "@/lib/agentAccess/oauth/oauthSqlMock.store";

export { store, qText } from "@/lib/agentAccess/oauth/oauthSqlMock.store";

type SqlMock = Mock<
  (strings: TemplateStringsArray, ...values: unknown[]) => Promise<unknown>
>;

export const installOauthSqlMockFrom = (input: {
  readonly sqlMock: SqlMock;
}): void => {
  input.sqlMock.mockReset();
  resetOauthStore();
  resetOauthSchemaEnsureForTests();
  resetDeviceCodeSchemaEnsureForTests();
  resetAgentAccessSchemaEnsureForTests();
  input.sqlMock.mockImplementation(
    async (strings: TemplateStringsArray, ...values: unknown[]) =>
      handleOauthSql(strings, values),
  );
};
