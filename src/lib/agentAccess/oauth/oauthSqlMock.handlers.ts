import { handleOauthSqlInsert } from "@/lib/agentAccess/oauth/oauthSqlMock.insertHandlers";
import { handleOauthSqlSelect } from "@/lib/agentAccess/oauth/oauthSqlMock.selectHandlers";
import { handleOauthSqlUpdate } from "@/lib/agentAccess/oauth/oauthSqlMock.updateHandlers";
import { qText } from "@/lib/agentAccess/oauth/oauthSqlMock.store";

/** In-memory SQL handlers for OAuth unit tests. */
export const handleOauthSql = (
  strings: TemplateStringsArray,
  values: readonly unknown[],
): unknown[] => {
  const q = qText(strings);
  if (
    q.includes("CREATE TABLE") ||
    q.includes("ALTER TABLE") ||
    q.includes("CREATE INDEX")
  ) {
    return [];
  }

  const inserted = handleOauthSqlInsert(strings, values);
  if (inserted !== null) {
    return inserted;
  }
  const updated = handleOauthSqlUpdate(strings, values);
  if (updated !== null) {
    return updated;
  }
  const selected = handleOauthSqlSelect(strings, values);
  if (selected !== null) {
    return selected;
  }
  return [];
};
