import { beforeEach, describe, expect, it, vi } from "vitest";

import { deleteSendTaskComposerLibraryItem } from "@/features/agent/utils/deleteSendTaskComposerLibraryItem";

vi.mock("@/features/workflows/submitArchiveWorkflow", () => ({
  submitArchiveWorkflow: vi.fn(),
}));

import { submitArchiveWorkflow } from "@/features/workflows/submitArchiveWorkflow";

describe("deleteSendTaskComposerLibraryItem (AGENT-035)", () => {
  beforeEach(() => {
    vi.mocked(submitArchiveWorkflow).mockReset();
  });

  it("archives library workflow rows", async () => {
    vi.mocked(submitArchiveWorkflow).mockResolvedValue({ ok: true });

    await expect(
      deleteSendTaskComposerLibraryItem({
        kind: "library",
        id: "cap-dup-1",
        label: "Freelancer client proposal",
        itemType: "workflow",
      }),
    ).resolves.toBe(true);

    expect(submitArchiveWorkflow).toHaveBeenCalledWith("cap-dup-1");
  });

  it("ignores custom and history rows", async () => {
    await expect(
      deleteSendTaskComposerLibraryItem({
        kind: "custom",
        id: "custom",
        label: "Custom task",
        itemType: "custom",
      }),
    ).resolves.toBe(false);

    expect(submitArchiveWorkflow).not.toHaveBeenCalled();
  });
});
