import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AUTOMATIONS_PAGE_COPY } from "@/features/automations/automationsPageCopy.constant";
import { MARKETPLACE_COMPUTER_PICKER_COPY } from "@/features/marketplace/marketplaceComputerPickerCopy.constant";
import { THIS_MAC_DEVICE_BADGE_LABEL } from "@/components/ui/badge/thisMacDeviceBadgeLabel.constant";
import { ANOTHER_COMPUTER_DEVICE_BADGE_LABEL } from "@/components/ui/badge/anotherComputerDeviceBadgeLabel.constant";
import { APP_SHELL_COMPUTERS_COPY } from "@/features/shell/v5/appShellComputersCopy.constant";
import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";
import { SHELL_NAV_TEAM_ONLY_HREFS } from "@/lib/shell/shellNavTeamOnlyHrefs.constant";
import { PRIMARY_NAV } from "@/features/shell/appNav.constant";

const read = (...parts: string[]): string =>
  readFileSync(join(process.cwd(), ...parts), "utf8");

describe("Automations must-keeps + picker copy", () => {
  it("keeps Webhook HTTP POST trigger and copy-now controls", () => {
    expect(AUTOMATIONS_PAGE_COPY.triggerWebhook).toBe("Webhook (HTTP POST)");
    expect(AUTOMATIONS_PAGE_COPY.webhookSecretTitle).toBe(
      "Webhook secret (copy now)",
    );
    expect(AUTOMATIONS_PAGE_COPY.webhookUrlTitle).toBe("Webhook URL");
    const reveal = read(
      "src/features/automations/CreateAutomationWebhookReveal.tsx",
    );
    expect(reveal).toContain("useCopyToClipboard");
    expect(reveal).toContain("AUTOMATIONS_PAGE_COPY.copySecret");
    expect(reveal).toContain("AUTOMATIONS_PAGE_COPY.copyUrl");
    const trigger = read(
      "src/features/automations/CreateAutomationTriggerSelect.tsx",
    );
    expect(trigger).toContain("triggerWebhook");
  });

  it("keeps timezone on schedule fields", () => {
    expect(AUTOMATIONS_PAGE_COPY.timezone).toBe("Timezone");
    const schedule = read(
      "src/features/automations/AutomationScheduleFields.tsx",
    );
    expect(schedule).toContain("AUTOMATIONS_PAGE_COPY.timezone");
    expect(schedule).toContain("scheduleTimezone");
  });

  it("keeps sync-to-local amber with this computer + AgentWitch", () => {
    expect(AUTOMATIONS_PAGE_COPY.syncFailed).toContain("this computer");
    expect(AUTOMATIONS_PAGE_COPY.syncFailed).toContain("AgentWitch");
    expect(AUTOMATIONS_PAGE_COPY.syncFailed).not.toContain("Agent Witch");
    const client = read("src/features/automations/AutomationsPageClient.tsx");
    expect(client).toContain("syncAutomationsToLocalMac");
    expect(client).toContain("amber-");
    expect(client).toContain("AUTOMATIONS_PAGE_COPY.syncFailed");
  });

  it("keeps Connect reachable and Download AgentWitch when connected", () => {
    expect(APP_SHELL_COMPUTERS_COPY.connectThis).toBe("Connect this computer");
    expect(APP_SHELL_COMPUTERS_COPY.download).toBe("Download AgentWitch");
    const panel = read("src/features/home/HomeConnectedMacsPanel.tsx");
    expect(panel).toContain("ComputersDownloadLink");
    expect(panel).toContain("ConnectAnotherMacButton");
  });

  it("Marketplace picker uses computer seat copy", () => {
    expect(MARKETPLACE_COMPUTER_PICKER_COPY.question).toBe(
      "Which computer should run this?",
    );
    expect(MARKETPLACE_COMPUTER_PICKER_COPY.thisComputer).toBe("This computer");
    expect(MARKETPLACE_COMPUTER_PICKER_COPY.anotherComputer).toBe(
      "Another computer",
    );
    expect(THIS_MAC_DEVICE_BADGE_LABEL).toBe(
      MARKETPLACE_COMPUTER_PICKER_COPY.thisComputer,
    );
    expect(ANOTHER_COMPUTER_DEVICE_BADGE_LABEL).toBe(
      MARKETPLACE_COMPUTER_PICKER_COPY.anotherComputer,
    );
    const picker = read("src/features/agent/MacDevicePicker.tsx");
    expect(picker).toContain("MARKETPLACE_COMPUTER_PICKER_COPY.question");
    expect(picker).not.toContain("Which Mac should run this?");
    const rows = read("src/features/agent/MacDevicePickerRows.tsx");
    expect(rows).toContain("showAnotherComputerBadge={!isThisMac}");
  });

  it("never hides Marketplace or Automations; keeps My bots label", () => {
    const labels = PRIMARY_NAV.map((item) => item.label);
    expect(labels).toContain("Marketplace");
    expect(labels).toContain("Automations");
    expect(SHELL_NAV_TEAM_ONLY_HREFS).not.toContain("/automations");
    expect(SHELL_NAV_TEAM_ONLY_HREFS).not.toContain("/marketplace");
    expect(MY_BOTS_COPY.title).toBe("My bots");
    expect(AUTOMATIONS_PAGE_COPY.empty).toContain("assistant");
    expect(AUTOMATIONS_PAGE_COPY.description).toContain("AgentWitch");
    expect(AUTOMATIONS_PAGE_COPY.description).not.toContain("Agent Witch");
  });
});
