import type {
  ProjectSkillAwcPublishedSource,
  ProjectSkillPublishedMeta,
} from "@agent-witch/shared/projectSkills";

import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";

import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "../../../projects/internal/core/agentWitchDeviceAuth.constant";

const deviceHeaders = (pairingToken: string): Record<string, string> => ({
  [AGENT_WITCH_PAIRING_TOKEN_HEADER]: pairingToken,
  Accept: "application/json",
});

/**
 * AWL-injected AWC published source. Errors throw (never coerce to []).
 * Hits device-auth published skills routes.
 */
export const createHttpProjectSkillAwcPublishedSource = (
  cloudApi: AgentWitchCloudApiConfig,
): ProjectSkillAwcPublishedSource => ({
  listPublished: async (projectId) => {
    const response = await fetch(
      `${cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(projectId)}/skills/published`,
      {
        method: "GET",
        headers: deviceHeaders(cloudApi.pairingToken),
        signal: AbortSignal.timeout(30_000),
      },
    );
    if (!response.ok) {
      throw new Error(`listPublished http ${response.status}`);
    }
    const body: unknown = await response.json();
    if (
      typeof body !== "object" ||
      body === null ||
      (body as { ok?: unknown }).ok !== true ||
      !Array.isArray((body as { skills?: unknown }).skills)
    ) {
      throw new Error("listPublished malformed body");
    }
    const skills = (body as { skills: unknown[] }).skills;
    return skills.map((row, index): ProjectSkillPublishedMeta => {
      if (
        typeof row !== "object" ||
        row === null ||
        typeof (row as { skillId?: unknown }).skillId !== "string" ||
        typeof (row as { publishedVersion?: unknown }).publishedVersion !==
          "number" ||
        typeof (row as { contentHash?: unknown }).contentHash !== "string"
      ) {
        throw new Error(`listPublished row ${index} missing version/contentHash`);
      }
      const meta = row as {
        skillId: string;
        publishedVersion: number;
        contentHash: string;
        skillRowId?: string;
      };
      return {
        skillId: meta.skillId,
        publishedVersion: meta.publishedVersion,
        contentHash: meta.contentHash,
        ...(typeof meta.skillRowId === "string"
          ? { skillRowId: meta.skillRowId }
          : {}),
      };
    });
  },
  getPublishedBody: async (input) => {
    const url = new URL(
      `${cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(input.projectId)}/skills/published/${encodeURIComponent(input.skillId)}`,
    );
    url.searchParams.set("version", String(input.version));
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: deviceHeaders(cloudApi.pairingToken),
      signal: AbortSignal.timeout(30_000),
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`getPublishedBody http ${response.status}`);
    }
    const body: unknown = await response.json();
    if (
      typeof body !== "object" ||
      body === null ||
      (body as { ok?: unknown }).ok !== true ||
      typeof (body as { body?: unknown }).body !== "string" ||
      typeof (body as { contentHash?: unknown }).contentHash !== "string"
    ) {
      throw new Error("getPublishedBody malformed body");
    }
    return {
      body: (body as { body: string }).body,
      contentHash: (body as { contentHash: string }).contentHash,
    };
  },
});
