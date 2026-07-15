import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";

export interface BorrowedHarnessExportSet {
  readonly name: string;
  readonly slug: string;
  readonly items: readonly {
    readonly id: string;
    readonly kind: HarnessItemKind;
    readonly title: string;
    readonly content: string;
  }[];
}

export interface HarnessExportResultPayload {
  readonly success: boolean;
  readonly ownerUserId?: string;
  readonly sets?: readonly BorrowedHarnessExportSet[];
  readonly errorMessage?: string;
}

export const parseHarnessExportResultPayload = (
  payload: unknown,
): HarnessExportResultPayload | null => {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  const record = payload as Record<string, unknown>;
  const sets = Array.isArray(record.sets)
    ? record.sets.filter(
        (set): set is BorrowedHarnessExportSet =>
          typeof set === "object" &&
          set !== null &&
          typeof (set as BorrowedHarnessExportSet).slug === "string" &&
          Array.isArray((set as BorrowedHarnessExportSet).items),
      )
    : undefined;

  return {
    success: record.success === true,
    ownerUserId:
      typeof record.ownerUserId === "string" ? record.ownerUserId : undefined,
    sets,
    errorMessage:
      typeof record.errorMessage === "string" ? record.errorMessage : undefined,
  };
};
