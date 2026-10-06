import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";

/** EN table from docs/design/chat-retention/CLEAR-ALL-LOCK.md, verbatim. */
const LOCK: Readonly<Record<string, string>> = {
  "clearAll.button": "Clear all",
  "clearAll.confirmTitle": "Clear all messages?",
  "clearAll.confirmBody":
    "They move to Archived. You can restore them any time.",
  "clearAll.confirm": "Clear all",
  "clearAll.cancel": "Cancel",
  "clearAll.toast": "Cleared {n} messages. They're in Archived.",
  "clearAll.toastOne": "Cleared 1 message. It's in Archived.",
  "clearAll.undo": "Undo",
  "archived.filter": "Archived ({n})",
  "archived.empty": "Nothing archived.",
  "archived.restore": "Restore",
  "archived.restoreAll": "Restore all",
  "archived.restoreAllConfirmTitle": "Restore all archived messages?",
  "archived.restoreAllConfirm": "Restore all",
  "archived.restoredToast": "Restored {n} messages.",
  "archived.restoredToastOne": "Restored 1 message.",
  "archived.ownerOnlyReason": "Only the project owner can restore messages.",
  "activity.archived": "{name} cleared {n} messages to Archived",
  "activity.restored": "{name} restored {n} messages",
};

const FORBIDDEN = /\b(delete[sd]?|deleting|wipe[sd]?|wiping|permanent(ly)?)\b/i;

const FLOW_FILES = [
  "src/features/projects/access/inbox/AwcProjectInboxClearBar.tsx",
  "src/features/projects/access/inbox/AwcProjectInboxClearConfirmModal.tsx",
  "src/features/projects/access/inbox/AwcProjectInboxArchivedFilter.tsx",
  "src/features/projects/access/inbox/AwcProjectInboxArchivedPanel.tsx",
  "src/features/projects/access/inbox/AwcProjectInboxRestoreAllConfirmModal.tsx",
  "src/features/projects/access/inbox/AwcProjectInboxBody.tsx",
  "src/features/projects/access/inbox/utils/clearProjectInbox.ts",
  "src/features/projects/access/inbox/utils/restoreProjectInbox.ts",
  "src/features/projects/access/inbox/utils/formatInboxClearToast.ts",
  "src/features/projects/access/inbox/utils/formatInboxRestoreToast.ts",
  "src/features/projects/accessLog/formatAccessLogMessagesEvent.ts",
  "src/features/projects/access/inbox/awcProjectInboxCopy.constant.ts",
];

const lookup = (key: string): unknown =>
  key
    .split(".")
    .reduce<unknown>(
      (node, part) => (node as Record<string, unknown> | undefined)?.[part],
      AWC_PROJECT_INBOX_COPY,
    );

describe("Inbox Clear all → archive copy (LOCK)", () => {
  it("every LOCK key is present with the exact EN string", () => {
    Object.entries(LOCK).forEach(([key, en]) => {
      expect(lookup(key), key).toBe(en);
    });
  });

  it("never says delete / wipe / permanently in this flow", () => {
    const strings = [
      ...Object.values(AWC_PROJECT_INBOX_COPY.clearAll),
      ...Object.values(AWC_PROJECT_INBOX_COPY.archived),
      ...Object.values(AWC_PROJECT_INBOX_COPY.activity),
      AWC_PROJECT_INBOX_COPY.clearAlreadyEmpty,
      AWC_PROJECT_INBOX_COPY.clearFailed,
      AWC_PROJECT_INBOX_COPY.clearUnavailable,
      AWC_PROJECT_INBOX_COPY.restoreFailed,
    ];
    strings.forEach((text) => expect(text).not.toMatch(FORBIDDEN));
    FLOW_FILES.forEach((file) => {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      expect(source, file).not.toMatch(FORBIDDEN);
    });
  });
});
