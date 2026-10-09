import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  role: vi.fn(),
  settings: vi.fn(),
  list: vi.fn(),
}));

vi.mock("@/features/project-skill-share/public-api/infrastructure", () => ({
  resolveProjectSkillMemberRole: mocks.role,
}));

vi.mock(
  "@/features/project-auto-skills/internal/infrastructure/autoSkillsSettingsDb",
  () => ({
    getAutoSkillsSettingsRow: mocks.settings,
  }),
);

vi.mock(
  "@/features/project-auto-skills/internal/infrastructure/autoSkillsSuggestionsDb",
  () => ({
    listAutoSkillSuggestions: mocks.list,
  }),
);

import { getAutoSkillsDeviceView } from "@/features/project-auto-skills/internal/infrastructure/getAutoSkillsOverview";

describe("getAutoSkillsDeviceView", () => {
  beforeEach(() => {
    mocks.role.mockReset();
    mocks.settings.mockReset();
    mocks.list.mockReset();
    mocks.settings.mockResolvedValue({
      enabled: true,
      judgePref: "auto",
      judgeAgent: null,
      publishMode: "publish",
      lastCheckedAt: null,
      judgeKind: null,
      judgeLabel: null,
      pausedReason: null,
      statusNote: null,
    });
    mocks.list.mockResolvedValue([]);
  });

  it("reflects the project toggle for active members (not only the owner)", async () => {
    mocks.role.mockResolvedValue({ ok: true, role: "member" });
    const view = await getAutoSkillsDeviceView({
      projectId: "p1",
      actorUserId: "member-1",
    });
    expect(view.enabled).toBe(true);
  });

  it("returns disabled when auto skills are off at project level", async () => {
    mocks.role.mockResolvedValue({ ok: true, role: "member" });
    mocks.settings.mockResolvedValue({
      enabled: false,
      judgePref: "auto",
      judgeAgent: null,
      publishMode: "publish",
      lastCheckedAt: null,
      judgeKind: null,
      judgeLabel: null,
      pausedReason: null,
      statusNote: null,
    });
    const view = await getAutoSkillsDeviceView({
      projectId: "p1",
      actorUserId: "member-1",
    });
    expect(view.enabled).toBe(false);
  });
});
