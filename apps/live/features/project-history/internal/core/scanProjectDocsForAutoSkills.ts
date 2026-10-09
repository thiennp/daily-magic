import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";

import { probeSignedInAutoSkillAgent } from "./autoSkillAgent";
import { createHttpAutoSkillCloud } from "./autoSkillCloud";
import { probeAutoSkillOllamaModel } from "./autoSkillOllama";
import { selectAutoSkillJudge } from "./autoSkillSelectJudge";
import { findStaleDocSkills, listDocOriginSkills } from "./docOriginSkills";
import {
  ingestFolderDocsAsSkillDrafts,
  type DocIngestResult,
} from "./ingestFolderDocsAsSkillDrafts";
import { listProjectHistorySkillgenDraftFingerprints } from "./listProjectHistorySkillgenDraftFingerprints";
import { listProjectHistorySkillgenPublishedFingerprints } from "./listProjectHistorySkillgenPublishedFingerprints";

const plural = (n: number, word: string): string =>
  `${n} ${word}${n === 1 ? "" : "s"}`;

export const describeDocScan = (
  result: DocIngestResult,
  staleCount: number,
): string => {
  const more = result.eligible - result.asked;
  return [
    `Docs scan: read ${plural(result.scanned, "doc")}, raised ${plural(result.asked, "question")}`,
    more > 0 ? `, ${more} more eligible once you answer these` : "",
    staleCount > 0
      ? `; ${plural(staleCount, "doc-made skill")} ${staleCount === 1 ? "has" : "have"} a changed source`
      : "",
    ".",
  ].join("");
};

const safe = <T>(read: () => readonly T[]): readonly T[] => {
  try {
    return read();
  } catch {
    return [];
  }
};

/**
 * Manual "Scan project docs": one deterministic pass over the folder's
 * skills, commands and Q&A docs (no model), raising owner questions, then a
 * one-line status for the strip. Never throws.
 */
export const scanProjectDocsForAutoSkills = async (input: {
  readonly cloudApi: AgentWitchCloudApiConfig;
  readonly projectId: string;
  readonly folderPath: string | null;
}): Promise<DocIngestResult | null> => {
  try {
    const cloud = createHttpAutoSkillCloud(input.cloudApi);
    const settings = await cloud.getSettings(input.projectId);
    const choice = selectAutoSkillJudge(settings.judgePref, {
      ollamaModel: await probeAutoSkillOllamaModel(),
      agentWriter: await probeSignedInAutoSkillAgent(
        null,
        undefined,
        settings.judgeAgent ?? null,
      ),
      botName: null,
    });
    const report = (note: string) =>
      cloud.postStatus(input.projectId, {
        judgeKind: choice.ok ? choice.kind : null,
        judgeLabel: choice.ok ? choice.label : null,
        pausedReason: choice.ok ? null : choice.pausedReason,
        note,
      });
    if (input.folderPath === null) {
      await report("Docs scan: link a project folder on this computer first.");
      return null;
    }
    const origin = safe(() => listDocOriginSkills(input.projectId));
    const result = await ingestFolderDocsAsSkillDrafts({
      projectId: input.projectId,
      folderPath: input.folderPath,
      cloud,
      existingNames: [
        ...safe(() =>
          listProjectHistorySkillgenPublishedFingerprints(input.projectId),
        ),
        ...safe(() =>
          listProjectHistorySkillgenDraftFingerprints(input.projectId),
        ),
      ].map((skill) => skill.name),
      backfilledCount: origin.length,
    });
    await report(
      describeDocScan(
        result,
        findStaleDocSkills(input.folderPath, origin).length,
      ),
    );
    return result;
  } catch {
    return null;
  }
};
