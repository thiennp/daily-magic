import { markOnboardingWorkflowCreated } from "@/features/home/utils/onboardingWorkflowCreatedStore";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export type ForkCapabilityToLibraryResult =
  | { readonly ok: true; readonly capability: PublishedCapabilityRecord }
  | { readonly ok: false; readonly errorMessage: string };

export default async function forkCapabilityToLibrary(
  capabilityId: string,
): Promise<ForkCapabilityToLibraryResult> {
  const response = await fetch(`/api/capabilities/${capabilityId}/fork`, {
    method: "POST",
  });

  const data: unknown = await response.json();

  if (!response.ok) {
    const errorMessage =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : "Could not save to your library.";

    return { ok: false, errorMessage };
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "capability" in data &&
    typeof (data as { capability: PublishedCapabilityRecord }).capability ===
      "object"
  ) {
    markOnboardingWorkflowCreated();

    return {
      ok: true,
      capability: (data as { capability: PublishedCapabilityRecord })
        .capability,
    };
  }

  return { ok: false, errorMessage: "Unexpected response from server." };
}
