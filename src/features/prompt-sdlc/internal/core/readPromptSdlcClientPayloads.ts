import { mergePromptSdlcModelOptions } from "@/lib/promptSdlc/mergePromptSdlcModelOptions";
import type { PromptSdlcModelOption } from "@/lib/promptSdlc/mergePromptSdlcModelOptions";
import type PromptSdlcCycleView from "@/lib/promptSdlc/types/PromptSdlcCycleView.type";
import { isPromptSdlcCycleStatus } from "@/lib/promptSdlc/PromptSdlcCycleStatus.constant";

export interface PromptSdlcMacOption {
  readonly id: string;
  readonly label: string;
  readonly isDispatchReady: boolean;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const readPromptSdlcCyclePayload = (
  body: unknown,
): PromptSdlcCycleView | null => {
  if (!isRecord(body) || body.ok !== true || !isRecord(body.cycle)) {
    return null;
  }

  const cycle = body.cycle;
  if (
    typeof cycle.id !== "string" ||
    typeof cycle.goal !== "string" ||
    typeof cycle.status !== "string" ||
    !isPromptSdlcCycleStatus(cycle.status) ||
    !Array.isArray(cycle.revisions)
  ) {
    return null;
  }

  return cycle as unknown as PromptSdlcCycleView;
};

export const readPromptSdlcErrorMessage = (body: unknown): string | null => {
  if (!isRecord(body) || typeof body.errorMessage !== "string") {
    return null;
  }

  return body.errorMessage;
};

export const readPromptSdlcLocalCatalog = (
  body: unknown,
): {
  readonly installedWriterIds: readonly string[];
} => {
  if (!isRecord(body) || body.ok !== true) {
    return { installedWriterIds: [] };
  }

  const writers = Array.isArray(body.writers) ? body.writers : [];

  return {
    installedWriterIds: writers.flatMap((writer) =>
      isRecord(writer) && typeof writer.id === "string" ? [writer.id] : [],
    ),
  };
};

export const readPromptSdlcMacOptions = (
  body: unknown,
): readonly PromptSdlcMacOption[] => {
  if (!isRecord(body) || !Array.isArray(body.devices)) {
    return [];
  }

  return body.devices.flatMap((device) => {
    if (
      !isRecord(device) ||
      typeof device.id !== "string" ||
      device.revokedAt
    ) {
      return [];
    }

    const displayName =
      typeof device.displayName === "string" && device.displayName.length > 0
        ? device.displayName
        : null;
    const deviceLabel =
      typeof device.deviceLabel === "string" && device.deviceLabel.length > 0
        ? device.deviceLabel
        : null;

    return [
      {
        id: device.id,
        label: displayName ?? deviceLabel ?? "Mac",
        isDispatchReady: device.isDispatchReady === true,
      },
    ];
  });
};

export const buildPromptSdlcModelOptions = (input: {
  readonly localBody: unknown;
  readonly cursorCloudConnected: boolean;
}): readonly PromptSdlcModelOption[] => {
  const local = readPromptSdlcLocalCatalog(input.localBody);
  return mergePromptSdlcModelOptions({
    installedWriterIds: local.installedWriterIds,
    cursorCloudConnected: input.cursorCloudConnected,
  });
};
