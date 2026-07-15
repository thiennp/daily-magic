import fs from "node:fs";
import path from "node:path";

import {
  parseLocalScheduledAutomation,
  type LocalAutomationStoreDocument,
  type LocalScheduledAutomation,
} from "./agentWitchLocalAutomation.types";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

const AUTOMATIONS_FILE_NAME = "automations.json";

const resolveAutomationsPath = (layout: AgentWitchLocalLayout): string => {
  if (layout.profileEmail !== null) {
    return path.join(
      layout.installDir,
      "profiles",
      layout.profileEmail,
      AUTOMATIONS_FILE_NAME,
    );
  }

  return path.join(layout.installDir, AUTOMATIONS_FILE_NAME);
};

const emptyDocument = (): LocalAutomationStoreDocument => ({
  version: 1,
  automations: [],
});

export const readLocalAutomationStore = (
  layout: AgentWitchLocalLayout,
): LocalAutomationStoreDocument => {
  const filePath = resolveAutomationsPath(layout);

  if (!fs.existsSync(filePath)) {
    return emptyDocument();
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !Array.isArray((parsed as { automations?: unknown }).automations)
    ) {
      return emptyDocument();
    }

    const automations = (
      parsed as { automations: readonly unknown[] }
    ).automations.flatMap((entry) => {
      const automation = parseLocalScheduledAutomation(entry);
      return automation !== null ? [automation] : [];
    });

    return { version: 1, automations };
  } catch {
    return emptyDocument();
  }
};

export const writeLocalAutomationStore = (
  layout: AgentWitchLocalLayout,
  document: LocalAutomationStoreDocument,
): void => {
  const filePath = resolveAutomationsPath(layout);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(document, null, 2)}\n`, "utf8");
};

export const replaceLocalScheduledAutomations = (
  layout: AgentWitchLocalLayout,
  automations: readonly LocalScheduledAutomation[],
): void => {
  writeLocalAutomationStore(layout, { version: 1, automations });
};

export const updateLocalScheduledAutomation = (
  layout: AgentWitchLocalLayout,
  automation: LocalScheduledAutomation,
): void => {
  const store = readLocalAutomationStore(layout);
  const automations = store.automations.filter(
    (entry) => entry.id !== automation.id,
  );
  writeLocalAutomationStore(layout, {
    version: 1,
    automations: [...automations, automation],
  });
};

export const findLocalScheduledAutomation = (
  layout: AgentWitchLocalLayout,
  automationId: string,
): LocalScheduledAutomation | null =>
  readLocalAutomationStore(layout).automations.find(
    (entry) => entry.id === automationId,
  ) ?? null;
