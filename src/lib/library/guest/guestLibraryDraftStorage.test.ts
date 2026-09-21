import { beforeEach, describe, expect, it } from "vitest";

import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";
import {
  readGuestLibraryDrafts,
  removeGuestLibraryDraft,
  upsertGuestLibraryDraft,
  GUEST_LIBRARY_DRAFTS_STORAGE_KEY,
} from "@/lib/library/guest/guestLibraryDraftStorage";
import type GuestLibraryDraft from "@/lib/library/guest/types/GuestLibraryDraft.type";

const sampleDraft = (
  overrides: Partial<GuestLibraryDraft> = {},
): GuestLibraryDraft => ({
  localId: "draft-a",
  remoteCapabilityId: null,
  sourceTemplateId: null,
  type: CapabilityType.WORKFLOW,
  name: "Test workflow",
  description: "",
  exampleRequest: "",
  workflowFields: [
    { key: "topic", label: "Topic", type: "text", required: true },
  ],
  harnessItems: [],
  harnessSetSlug: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-02T00:00:00.000Z",
  ...overrides,
});

describe("guestLibraryDraftStorage", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    globalThis.window.localStorage.clear();
  });

  it("round-trips drafts through localStorage", () => {
    upsertGuestLibraryDraft(sampleDraft());

    expect(readGuestLibraryDrafts()).toHaveLength(1);
    expect(readGuestLibraryDrafts()[0]?.name).toBe("Test workflow");
  });

  it("removes a draft by localId", () => {
    upsertGuestLibraryDraft(sampleDraft());
    removeGuestLibraryDraft("draft-a");

    expect(readGuestLibraryDrafts()).toHaveLength(0);
    expect(
      globalThis.window.localStorage.getItem(GUEST_LIBRARY_DRAFTS_STORAGE_KEY),
    ).toBe("[]");
  });
});
