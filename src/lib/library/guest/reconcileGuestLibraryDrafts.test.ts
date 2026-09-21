import { describe, expect, it } from "vitest";

import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityVisibility } from "@/lib/capabilities/CapabilityVisibility.constant";
import {
  planGuestLibraryReconciliation,
  ReconcileGuestDraftActionType,
} from "@/lib/library/guest/reconcileGuestLibraryDrafts";
import type GuestLibraryDraft from "@/lib/library/guest/types/GuestLibraryDraft.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

const baseDraft = (
  overrides: Partial<GuestLibraryDraft> = {},
): GuestLibraryDraft => ({
  localId: "local-1",
  remoteCapabilityId: null,
  sourceTemplateId: null,
  type: CapabilityType.WORKFLOW,
  name: "Weekly status",
  description: "",
  exampleRequest: "",
  workflowFields: [
    { key: "notes", label: "Notes", type: "text", required: true },
  ],
  harnessItems: [],
  harnessSetSlug: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-02T00:00:00.000Z",
  ...overrides,
});

const baseCloud = (
  overrides: Partial<PublishedCapabilityRecord> = {},
): PublishedCapabilityRecord => ({
  id: "cap-1",
  ownerUserId: "user-1",
  groupId: null,
  type: CapabilityType.WORKFLOW,
  name: "Weekly status",
  description: "",
  exampleRequest: "",
  visibility: CapabilityVisibility.PRIVATE,
  status: CapabilityStatus.PUBLISHED,
  dispatchPolicyOverride: null,
  harnessSetSlug: null,
  currentVersionId: "ver-1",
  workflowFields: [],
  operatorSteps: [],
  forkedFromCapabilityId: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T12:00:00.000Z",
  ...overrides,
});

describe("planGuestLibraryReconciliation", () => {
  it("pushes local when no cloud match exists", () => {
    const actions = planGuestLibraryReconciliation([baseDraft()], []);

    expect(actions).toEqual([
      {
        type: ReconcileGuestDraftActionType.PUSH_LOCAL,
        localId: "local-1",
        remoteCapabilityId: null,
      },
    ]);
  });

  it("pushes local when local updatedAt is newer than cloud", () => {
    const actions = planGuestLibraryReconciliation(
      [baseDraft()],
      [baseCloud()],
    );

    expect(actions[0]).toEqual({
      type: ReconcileGuestDraftActionType.PUSH_LOCAL,
      localId: "local-1",
      remoteCapabilityId: "cap-1",
    });
  });

  it("drops local when cloud updatedAt is newer or equal", () => {
    const actions = planGuestLibraryReconciliation(
      [
        baseDraft({
          updatedAt: "2026-01-01T00:00:00.000Z",
        }),
      ],
      [baseCloud({ updatedAt: "2026-01-02T00:00:00.000Z" })],
    );

    expect(actions[0]).toEqual({
      type: ReconcileGuestDraftActionType.DROP_LOCAL,
      localId: "local-1",
      remoteCapabilityId: "cap-1",
    });
  });

  it("matches by remoteCapabilityId when names differ", () => {
    const actions = planGuestLibraryReconciliation(
      [
        baseDraft({
          name: "Renamed locally",
          remoteCapabilityId: "cap-99",
          updatedAt: "2026-01-03T00:00:00.000Z",
        }),
      ],
      [
        baseCloud({
          id: "cap-99",
          name: "Original",
          updatedAt: "2026-01-01T00:00:00.000Z",
        }),
      ],
    );

    expect(actions[0]?.type).toBe(ReconcileGuestDraftActionType.PUSH_LOCAL);
    expect(actions[0]?.remoteCapabilityId).toBe("cap-99");
  });
});
