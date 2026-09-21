import guestLibraryDraftToCreatePlaybookPayload from "@/lib/library/guest/guestLibraryDraftToCreatePlaybookPayload";
import type GuestLibraryDraft from "@/lib/library/guest/types/GuestLibraryDraft.type";

export type PushGuestLibraryDraftResult =
  | { readonly ok: true; readonly capabilityId: string }
  | { readonly ok: false; readonly errorMessage: string };

const parseCapabilityId = (data: unknown): string | null => {
  if (typeof data !== "object" || data === null) {
    return null;
  }

  const record = data as Record<string, unknown>;
  const capability =
    typeof record.capability === "object" && record.capability !== null
      ? (record.capability as { id?: unknown })
      : null;

  return capability !== null && typeof capability.id === "string"
    ? capability.id
    : null;
};

export const pushGuestLibraryDraftToCloud = async (
  draft: GuestLibraryDraft,
  remoteCapabilityId: string | null,
): Promise<PushGuestLibraryDraftResult> => {
  const payload = guestLibraryDraftToCreatePlaybookPayload(draft);

  if (remoteCapabilityId !== null) {
    const response = await fetch(
      `/api/capabilities/${encodeURIComponent(remoteCapabilityId)}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          description: payload.description,
          exampleRequest: payload.exampleRequest,
          workflowFields: payload.workflowFields,
        }),
      },
    );

    if (!response.ok) {
      const data: unknown = await response.json().catch(() => null);
      const message =
        typeof data === "object" &&
        data !== null &&
        "error" in data &&
        typeof (data as { error: unknown }).error === "string"
          ? (data as { error: string }).error
          : "Could not update playbook on your account.";
      return { ok: false, errorMessage: message };
    }

    return { ok: true, capabilityId: remoteCapabilityId };
  }

  const response = await fetch("/api/capabilities/mine", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: payload.type,
      name: payload.name,
      description: payload.description,
      exampleRequest: payload.exampleRequest,
      workflowFields: payload.workflowFields ?? [],
      harnessItems: payload.harnessItems,
    }),
  });

  if (!response.ok) {
    const data: unknown = await response.json().catch(() => null);
    const message =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : "Could not save playbook to your account.";
    return { ok: false, errorMessage: message };
  }

  const data: unknown = await response.json();
  const capabilityId = parseCapabilityId(data);

  if (capabilityId === null) {
    return {
      ok: false,
      errorMessage: "Playbook saved but response was invalid.",
    };
  }

  return { ok: true, capabilityId };
};
