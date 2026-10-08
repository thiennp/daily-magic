import { decryptProjectConnectionToken } from "@/lib/projects/connections/decryptProjectConnectionToken";
import { resolveProjectConnectionsAuthSecret } from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import { applyLinearIssueEvent } from "@/lib/projects/taskSync/applyLinearIssueEvent";
import { parseLinearWebhook } from "@/lib/projects/taskSync/parseLinearWebhook";
import { deleteLinkByExternalId } from "@/lib/projects/taskSync/taskExternalLinkReservation";
import { loadTaskSyncSettings } from "@/lib/projects/taskSync/taskSyncSettingsQueries";
import { verifyLinearWebhook } from "@/lib/projects/taskSync/verifyLinearWebhook";

export type LinearWebhookResult = {
  readonly status: number;
  readonly body: Readonly<Record<string, unknown>>;
};

const reply = (status: number, code: string): LinearWebhookResult => ({
  status,
  body: { ok: status < 400, code },
});

const readSecret = (cipher: string, iv: string): string | null => {
  const authSecret = resolveProjectConnectionsAuthSecret();
  if (authSecret === null) return null;
  try {
    return decryptProjectConnectionToken(cipher, iv, authSecret);
  } catch {
    return null;
  }
};

/** Verified Linear Issue event -> AW task (loop-guarded). */
export const handleLinearWebhook = async (input: {
  readonly projectId: string;
  readonly rawBody: string;
  readonly signature: string | null;
}): Promise<LinearWebhookResult> => {
  const { projectId } = input;
  const settings = await loadTaskSyncSettings(projectId, "linear");
  if (
    settings === null ||
    !settings.enabled ||
    settings.webhookSecretCiphertext === null ||
    settings.webhookSecretIv === null
  ) {
    return reply(404, "sync_disabled");
  }
  const secret = readSecret(
    settings.webhookSecretCiphertext,
    settings.webhookSecretIv,
  );
  if (secret === null) return reply(500, "secret_unavailable");
  const verdict = verifyLinearWebhook({
    rawBody: input.rawBody,
    signature: input.signature,
    secret,
  });
  if (!verdict.ok) return reply(401, verdict.code);

  const event = parseLinearWebhook(JSON.parse(input.rawBody));
  if (event.kind === "ignore") return reply(200, "ignored");
  if (event.kind === "unlink") {
    await deleteLinkByExternalId({
      projectId,
      provider: "linear",
      externalId: event.externalId,
    });
    return reply(200, "unlinked");
  }
  const outcome = await applyLinearIssueEvent({ projectId, settings, event });
  return reply(outcome === "project_not_found" ? 404 : 200, outcome);
};
