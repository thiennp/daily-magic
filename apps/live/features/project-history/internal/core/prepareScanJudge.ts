import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";

import type {
  AutoSkillAvailability,
  AutoSkillJudgeChoice,
} from "./autoSkill.types";
import { probeSignedInAutoSkillAgent } from "./autoSkillAgent";
import { createHttpAutoSkillCloud } from "./autoSkillCloud";
import { probeAutoSkillOllamaModel } from "./autoSkillOllama";
import { selectAutoSkillJudge } from "./autoSkillSelectJudge";

export type PreparedScanJudge = {
  readonly availability: AutoSkillAvailability;
  readonly choice: AutoSkillJudgeChoice;
};

/**
 * Which judge a scan uses, probed once for the whole scan instead of once per
 * run. Null when the cloud or the probes fail; each run then probes itself.
 */
export const prepareScanJudge = async (
  cloudApi: AgentWitchCloudApiConfig,
  projectId: string,
  writer: string | null,
): Promise<PreparedScanJudge | null> => {
  try {
    const settings =
      await createHttpAutoSkillCloud(cloudApi).getSettings(projectId);
    const availability: AutoSkillAvailability = {
      ollamaModel: await probeAutoSkillOllamaModel(),
      agentWriter: await probeSignedInAutoSkillAgent(
        writer,
        undefined,
        settings.judgeAgent ?? null,
      ),
      botName: null,
    };
    return {
      availability,
      choice: selectAutoSkillJudge(settings.judgePref, availability),
    };
  } catch {
    return null;
  }
};

/** Tell the strip the scan began, before any AI call, so the page shows life at once. */
export const announceScanStart = async (
  cloudApi: AgentWitchCloudApiConfig,
  projectId: string,
  prepared: PreparedScanJudge | null,
  note: string,
): Promise<void> => {
  if (prepared === null) {
    return;
  }
  const { choice } = prepared;
  await createHttpAutoSkillCloud(cloudApi)
    .postStatus(projectId, {
      judgeKind: choice.ok ? choice.kind : null,
      judgeLabel: choice.ok ? choice.label : null,
      pausedReason: choice.ok ? null : choice.pausedReason,
      note,
    })
    .catch(() => undefined);
};
