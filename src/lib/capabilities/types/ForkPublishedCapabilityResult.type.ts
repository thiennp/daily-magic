import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export type ForkPublishedCapabilityFailureReason =
  "not_found" | "forbidden" | "own_capability" | "not_published";

export type ForkPublishedCapabilityResult =
  | { readonly ok: true; readonly capability: PublishedCapabilityRecord }
  | {
      readonly ok: false;
      readonly reason: ForkPublishedCapabilityFailureReason;
    };
