import type { Mock } from "vitest";

import { resetDeviceCodeSchemaEnsureForTests } from "@/lib/agentAccess/deviceCode/ensureDeviceCodeSchema";
import { handleDeviceCodeSqlInsert } from "@/lib/agentAccess/deviceCode/deviceCodeSqlMock.insertHandlers";
import { handleDeviceCodeSqlSelect } from "@/lib/agentAccess/deviceCode/deviceCodeSqlMock.selectHandlers";
import {
  qText,
  resetDeviceCodeStore,
} from "@/lib/agentAccess/deviceCode/deviceCodeSqlMock.store";
import { handleDeviceCodeSqlUpdate } from "@/lib/agentAccess/deviceCode/deviceCodeSqlMock.updateHandlers";
import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";

export { store, qText } from "@/lib/agentAccess/deviceCode/deviceCodeSqlMock.store";
export type {
  DeliveryRow,
  RequestRow,
  TokenRow,
} from "@/lib/agentAccess/deviceCode/deviceCodeSqlMock.types";

type SqlMock = Mock<(strings: TemplateStringsArray, ...values: unknown[]) => Promise<unknown>>;
type BucketMock = Mock<(...args: unknown[]) => Promise<boolean>>;

/** Wire hoisted sqlMock + reset store for device-code flow tests. */
export const installDeviceCodeSqlMockFrom = (input: {
  readonly sqlMock: SqlMock;
  readonly bucketAllowed: BucketMock;
}): void => {
  input.sqlMock.mockReset();
  input.bucketAllowed.mockReset();
  input.bucketAllowed.mockResolvedValue(true);
  resetDeviceCodeStore();
  resetDeviceCodeSchemaEnsureForTests();
  resetAgentAccessSchemaEnsureForTests();

  input.sqlMock.mockImplementation(
    async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = qText(strings);

      if (
        q.includes("CREATE TABLE") ||
        q.includes("ALTER TABLE") ||
        q.includes("CREATE INDEX") ||
        q.includes("CREATE UNIQUE INDEX")
      ) {
        return [];
      }

      const inserted = handleDeviceCodeSqlInsert(strings, values);
      if (inserted !== null) {
        return inserted;
      }

      const updated = handleDeviceCodeSqlUpdate(strings, values);
      if (updated !== null) {
        return updated;
      }

      const selected = handleDeviceCodeSqlSelect(strings, values);
      if (selected !== null) {
        return selected;
      }

      return [];
    },
  );
};
