import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const detailPanelSource = readFileSync(
  path.join(process.cwd(), "src/features/projects/AwcProjectDetailPanel.tsx"),
  "utf8",
);

const detailPageSource = readFileSync(
  path.join(process.cwd(), "src/app/(app)/projects/[projectId]/page.tsx"),
  "utf8",
);

const headerSource = readFileSync(
  path.join(process.cwd(), "src/features/projects/AwcProjectDetailHeader.tsx"),
  "utf8",
);

describe("AwcProjectDetailPanel layout S1/S2 shell", () => {
  it("uses shell header + tab bar (no purple proposal banner)", () => {
    expect(detailPanelSource).toContain("AwcProjectDetailHeader");
    expect(detailPanelSource).toContain("AwcProjectDetailTabBar");
    expect(detailPanelSource).toContain("AwcProjectDetailTabPanels");
    expect(detailPanelSource).not.toMatch(/proposal|Bản thiết kế|đề xuất/i);
    expect(detailPageSource).not.toMatch(/proposal|Bản thiết kế|đề xuất/i);
  });

  it("keeps wide AppShell and drops the old page title chrome", () => {
    expect(detailPageSource).toMatch(/<AppShell>/);
    expect(detailPageSource).not.toMatch(/APP_SHELL_NARROW_CONTENT_CLASS/);
    expect(detailPageSource).not.toContain("AppPageHeader");
  });

  it("header keeps min-w-0 for mobile overflow (path moved to Settings, V5-3)", () => {
    expect(headerSource).toContain("min-w-0");
    expect(headerSource).not.toContain("AwcProjectPathDisplay");
    expect(headerSource).not.toMatch(/direction\s*:\s*rtl/);
  });
});

const overviewPanelSource = readFileSync(
  path.join(
    process.cwd(),
    "src/features/projects/overview/AwcProjectOverviewPanel.tsx",
  ),
  "utf8",
);

const tabPanelsSource = readFileSync(
  path.join(process.cwd(), "src/features/projects/AwcProjectDetailTabPanels.tsx"),
  "utf8",
);

const chatDockSource = readFileSync(
  path.join(process.cwd(), "src/features/projects/chatDock/AwcProjectChatDock.tsx"),
  "utf8",
);

const tabBodySource = readFileSync(
  path.join(process.cwd(), "src/features/projects/AwcProjectDetailTabPanelBody.tsx"),
  "utf8",
);

describe("AwcProjectDetailPanel layout S2 overview", () => {
  it("V5-5 mounts Overview body; Members rail stays live; no indigo chrome", () => {
    expect(tabBodySource).toContain("AwcProjectOverviewPanel");
    expect(detailPanelSource).toContain("AwcProjectMembersColumn");
    expect(detailPanelSource).toMatch(/lg:grid-cols-\[minmax\(0,1fr\)_20rem\]/);
    expect(overviewPanelSource).not.toMatch(/indigo|purple|#6366f1/i);
  });
});


const messengerSectionSource = readFileSync(
  path.join(
    process.cwd(),
    "src/features/projects/messenger/AwcProjectMessengerSection.tsx",
  ),
  "utf8",
);

const messengerComposerSource = readFileSync(
  path.join(
    process.cwd(),
    "src/features/projects/messenger/AwcMessengerComposer.tsx",
  ),
  "utf8",
);

describe("AwcProjectDetailPanel layout S3 activity → P1-S1 Chat dock", () => {
  it("mounts the messenger in the Chat dock full view (no Activity tab)", () => {
    expect(tabPanelsSource).toContain("AwcProjectDetailTabPanelBody");
    expect(tabBodySource).not.toContain("AwcProjectMessengerSection");
    expect(chatDockSource).toContain("AwcProjectMessengerSection");
    expect(tabBodySource).not.toMatch(
      /const STUB_TABS[\s\S]*?= \[[^\]]*"(?:activity|team)"[^\]]*\];/,
    );
    expect(messengerSectionSource).toContain("AwcProjectMessengerPanels");
    expect(messengerComposerSource).toContain("AwcMessengerMessageComposer");
    expect(messengerComposerSource).toContain("AwcMessengerTaskComposer");
  });

  it("keeps gray-only chat chrome (no indigo/purple/blue brand); no Activity tab badge", () => {
    expect(messengerSectionSource).not.toMatch(/indigo|purple|#6366f1|blue-6/i);
    expect(detailPanelSource).not.toContain("activityUnreadCount");
    expect(detailPanelSource).toContain("useAwcProjectChatSurface");
  });
});
