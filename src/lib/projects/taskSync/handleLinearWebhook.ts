import { decryptProjectConnectionToken } from "@/lib/projects/connections/decryptProjectConnectionToken";
import { resolveProjectConnectionsAuthSecret } from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import { applyLinearPull } from "@/lib/projects/taskSync/applyLinearPull";
import { importLinearIssue } from "@/lib/projects/taskSync/importLinearIssue";
import { parseLinearWebhook } from "@/lib/projects/taskSync/parseLinearWebhook";
import {
  deleteLinkByExternalId,
  loadLinkByExternalId,
} from "@/lib/projects/taskSync/taskExternalLinkQueries";
import { loadTaskSyncSettings } from "@/lib/projects/taskSync/taskSyncSettingsQueries";
import { verifyLinearWebhook } from "@/lib/projects/taskSync/verifyLinearWebhook";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

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
  if (event.teamId !== settings.externalTeamId) return reply(200, "other_team");

  const project = await getUserProjectById(projectId);
  if (project === null) return reply(404, "project_not_found");
  const link = await loadLinkByExternalId({
    projectId,
    provider: "linear",
    externalId: event.ref.externalId,
  });
  if (link === null) {
    if (!settings.importNew) return reply(200, "not_linked");
    const outcome = await importLinearIssue({
      projectId,
      ownerUserId: project.ownerUserId,
      ref: event.ref,
      fields: event.fields,
    });
    return reply(200, outcome);
  }

  const outcome = await applyLinearPull({
    projectId,
    ownerUserId: project.ownerUserId,
    link,
    pulled: event.fields,
    labelsKnown: event.labelsKnown,
  });
  return reply(200, outcome);
};
