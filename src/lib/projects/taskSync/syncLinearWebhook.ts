import { randomBytes } from "node:crypto";

import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";
import { encryptProjectConnectionToken } from "@/lib/projects/connections/encryptProjectConnectionToken";
import {
  createLinearWebhook,
  deleteLinearWebhook,
} from "@/lib/projects/taskSync/linearWebhookOperations";
import type { TaskSyncSettings } from "@/lib/projects/taskSync/taskSync.types";
import { withLinearAccessToken } from "@/lib/projects/taskSync/withLinearAccessToken";

export type LinearWebhookState = {
  readonly webhookId: string | null;
  readonly webhookSecret: {
    readonly ciphertext: string;
    readonly iv: string;
  } | null;
  readonly error: string | null;
};

const NO_WEBHOOK: LinearWebhookState = {
  webhookId: null,
  webhookSecret: null,
  error: null,
};

export const buildLinearWebhookUrl = (projectId: string): string =>
  new URL(
    `/api/projects/${projectId}/connections/linear/webhook`,
    resolveAppBaseUrl(),
  ).toString();

const register = async (input: {
  readonly token: string;
  readonly projectId: string;
  readonly teamId: string;
  readonly authSecret: string;
}): Promise<LinearWebhookState> => {
  const secret = randomBytes(32).toString("hex");
  try {
    const webhookId = await createLinearWebhook({
      token: input.token,
      url: buildLinearWebhookUrl(input.projectId),
      teamId: input.teamId,
      secret,
    });
    return {
      webhookId,
      webhookSecret: encryptProjectConnectionToken(secret, input.authSecret),
      error: null,
    };
  } catch (e: unknown) {
    const reason = e instanceof Error ? e.message : "error";
    return { ...NO_WEBHOOK, error: `webhook_failed: ${reason}`.slice(0, 200) };
  }
};

/**
 * Brings the Linear webhook in line with the wanted state. Removes the old one
 * (best effort) when disabled / team changed; registers a new one with a fresh
 * secret when wanted. null = webhook wanted but no usable Linear connection.
 */
export const syncLinearWebhook = async (input: {
  readonly projectId: string;
  readonly authSecret: string;
  readonly prev: TaskSyncSettings | null;
  readonly teamId: string | null;
  readonly enabled: boolean;
}): Promise<LinearWebhookState | null> => {
  const { prev, teamId } = input;
  const wanted = input.enabled && teamId !== null;
  const reusable =
    wanted &&
    prev?.enabled === true &&
    prev.externalTeamId === teamId &&
    prev.webhookId !== null &&
    prev.webhookSecretCiphertext !== null &&
    prev.webhookSecretIv !== null;
  if (reusable) {
    return {
      webhookId: prev.webhookId,
      webhookSecret: {
        ciphertext: prev.webhookSecretCiphertext,
        iv: prev.webhookSecretIv,
      },
      error: null,
    };
  }
  if (!wanted && prev?.webhookId == null) return NO_WEBHOOK;
  const result = await withLinearAccessToken(input.projectId, async (token) => {
    if (prev?.webhookId != null) {
      await deleteLinearWebhook(token, prev.webhookId).catch(() => undefined);
    }
    return wanted
      ? register({
          token,
          projectId: input.projectId,
          teamId,
          authSecret: input.authSecret,
        })
      : NO_WEBHOOK;
  });
  return result ?? (wanted ? null : NO_WEBHOOK);
};
