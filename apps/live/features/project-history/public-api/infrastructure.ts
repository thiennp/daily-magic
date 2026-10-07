export { isValidProjectComputerHistoryProjectId } from "../internal/core/isValidProjectComputerHistoryProjectId";
export {
  ensureProjectDataTree,
  resolveProjectDataDir,
} from "../internal/core/resolveProjectDataDir";
export { writeProjectSkillVersion } from "../internal/core/writeProjectSkillVersion";
export { readProjectSkillVersion } from "../internal/core/readProjectSkillVersion";
export {
  tombstoneProjectSkill,
  readProjectSkillTombstone,
} from "../internal/core/tombstoneProjectSkill";
export { listProjectSkillIds } from "../internal/core/listProjectSkillIds";
export { writeProjectHistoryMessage } from "../internal/core/writeProjectHistoryMessage";
export { handleProjectMessageHistoryDispatch } from "../internal/core/handleProjectMessageHistoryDispatch";
export { PROJECT_COMPUTER_HISTORY_TICK_INTERVAL_MS } from "../internal/core/projectHistory.constants";
export { createProjectSkillHistoryPort } from "../internal/core/createProjectSkillHistoryPort";
export { createHttpProjectSkillAwcPublishedSource } from "../internal/core/createHttpProjectSkillAwcPublishedSource";
export { tickProjectComputerHistory } from "../internal/core/tickProjectComputerHistory";
export { pullPublishedProjectSkillsToMirror } from "@agent-witch/shared/projectSkills";
export { startProjectComputerHistoryTick } from "../internal/core/startProjectComputerHistoryTick";
export {
  listLocalHistoryActiveProjectIds,
  readLocalProjectHistoryState,
  writeLocalProjectHistoryState,
} from "../internal/core/localProjectHistoryState";

export {
  PROJECT_HISTORY_SKILL_EPISODE_MESSAGE_COUNT,
  PROJECT_HISTORY_SKILL_IDLE_MS,
  PROJECT_HISTORY_SKILL_MAX_INTERVAL_MS,
  PROJECT_HISTORY_SKILL_RUN_TOKEN_CAP,
  PROJECT_HISTORY_SKILL_DAY_TOKEN_CAP,
  PROJECT_HISTORY_SKILL_MAX_OPEN_DRAFTS,
} from "../internal/core/projectHistory.constants";
export { closeProjectHistorySkillgenEpisode } from "../internal/core/closeProjectHistorySkillgenEpisode";
export { checkProjectHistorySkillgenTokenBudget } from "../internal/core/checkProjectHistorySkillgenTokenBudget";
export {
  qualifyProjectHistorySkillgenEpisode,
  detectProjectHistorySkillgenSuccessSignal,
  detectProjectHistorySkillgenOwnerMark,
} from "../internal/core/qualifyProjectHistorySkillgenEpisode";
export { scrubProjectHistorySkillgenSecrets } from "../internal/core/scrubProjectHistorySkillgenSecrets";
export { mergeOrSkipProjectHistorySkillgenDraft } from "../internal/core/mergeOrSkipProjectHistorySkillgenDraft";
export {
  resolveOwnerLlmDraftWriterMode,
} from "../internal/core/ownerLlmDraftWriter.port";
export {
  createOwnerLlmDraftWriter,
  runOwnerLlmCliTurn,
} from "../internal/core/createOwnerLlmDraftWriter";
export {
  buildOwnerLlmSkillReflectPrompt,
  buildOwnerLlmSkillWritePrompt,
} from "../internal/core/buildOwnerLlmSkillDraftPrompt";
export { extractOwnerLlmSkillMarkdown } from "../internal/core/extractOwnerLlmSkillMarkdown";
export { persistProjectHistorySkillgenReviewFlag } from "../internal/core/persistProjectHistorySkillgenReviewFlag";
export {
  validateProjectHistorySkillgenDraft,
  extractProjectHistorySkillgenStepLines,
} from "../internal/core/validateProjectHistorySkillgenDraft";
export {
  writeProjectHistorySkillgenDraft,
  countProjectHistorySkillgenOpenDrafts,
} from "../internal/core/writeProjectHistorySkillgenDraft";
export { computeProjectHistorySkillgenReviewFlag } from "../internal/core/computeProjectHistorySkillgenReviewFlag";
export { recordProjectHistorySkillgenMetrics } from "../internal/core/recordProjectHistorySkillgenMetrics";
export { purgeProjectHistoryOnOff } from "../internal/core/purgeProjectHistoryOnOff";
export { nextProjectHistorySkillgenState } from "../internal/core/nextProjectHistorySkillgenState";
export { stepProjectHistorySkillgenFsm } from "../internal/core/stepProjectHistorySkillgenFsm";
export { advanceProjectHistorySkillgenEpisode } from "../internal/core/advanceProjectHistorySkillgenEpisode";
export { runProjectHistorySkillgenTick } from "../internal/core/runProjectHistorySkillgenTick";
export {
  PROJECT_HISTORY_SKILLGEN_STATES,
  PROJECT_HISTORY_SKILLGEN_TRANSITIONS,
  PROJECT_HISTORY_SKILLGEN_ACTIVE_STATES,
} from "../internal/core/projectHistorySkillgenStateMachine";

export { readProjectHistoryMessage } from "../internal/core/readProjectHistoryMessage";
export { listProjectHistoryMessages } from "../internal/core/listProjectHistoryMessages";
export { extractProjectHistoryMessageText } from "../internal/core/extractProjectHistoryMessageText";
export { loadProjectHistorySkillgenMessagesSinceCursor } from "../internal/core/loadProjectHistorySkillgenMessagesSinceCursor";
export { readProjectHistorySkillgenEpisodes } from "../internal/core/readProjectHistorySkillgenEpisodes";
export { writeProjectHistorySkillgenEpisodes } from "../internal/core/writeProjectHistorySkillgenEpisodes";
export { readProjectHistorySkillgenBudget } from "../internal/core/readProjectHistorySkillgenBudget";
export { writeProjectHistorySkillgenBudget } from "../internal/core/writeProjectHistorySkillgenBudget";
export { appendProjectHistorySkillgenMetrics } from "../internal/core/appendProjectHistorySkillgenMetrics";
export { createDefaultProjectHistorySkillgenRunner } from "../internal/core/createDefaultProjectHistorySkillgenRunner";
export { isLocalProjectHistoryOn } from "../internal/core/isLocalProjectHistoryOn";

export { normalizeProjectHistoryPitfallText } from "../internal/core/normalizeProjectHistoryPitfallText";
export { selectProjectHistorySkillgenFailureEpisodes } from "../internal/core/selectProjectHistorySkillgenFailureEpisodes";
export { mapHistoryFailuresToSkillPitfalls } from "../internal/core/mapHistoryFailuresToSkillPitfalls";
export { mergeSkillPitfallsIntoDraftMarkdown } from "../internal/core/mergeSkillPitfallsIntoDraftMarkdown";
export { attachProjectHistoryPitfallsAfterDraft } from "../internal/core/attachProjectHistoryPitfallsAfterDraft";
export { readProjectHistoryLearnedPitfalls } from "../internal/core/readProjectHistoryLearnedPitfalls";
export { writeProjectHistoryLearnedPitfalls } from "../internal/core/writeProjectHistoryLearnedPitfalls";
export { readProjectHistorySkillgenFlags } from "../internal/core/readProjectHistorySkillgenFlags";
export { writeProjectHistorySkillgenFlags } from "../internal/core/writeProjectHistorySkillgenFlags";
export {
  PROJECT_HISTORY_PITFALL_MAX_PER_DRAFT,
  PROJECT_HISTORY_PITFALL_MAX_STORED,
  PROJECT_HISTORY_PITFALL_MAX_BULLET_CHARS,
  PROJECT_HISTORY_PITFALL_FLAG_KEY,
  PROJECT_HISTORY_SKILLGEN_DRAFTS_REVIEW_FLAG_KEY,
  PROJECT_HISTORY_SKILLGEN_OWNER_LLM_ENABLE_ENV,
  PROJECT_HISTORY_SKILLGEN_OWNER_LLM_DRY_RUN_ENV,
  PROJECT_HISTORY_SKILL_OWNER_LLM_INPUT_TOKEN_CAP,
} from "../internal/core/projectHistory.constants";

export { ingestHistoryMessageIntoIndex } from "../internal/core/ingestHistoryMessageIntoIndex";
export { rebuildProjectHistoryIndex } from "../internal/core/rebuildProjectHistoryIndex";
export { listLocalChatIndexPage } from "../internal/core/listLocalChatIndexPage";
export { getLocalChatMessage } from "../internal/core/getLocalChatMessage";
export { listLocalChatThreadKeys } from "../internal/core/listLocalChatThreadKeys";
export { tryHandleLocalChatReadRequest } from "../internal/core/tryHandleLocalChatReadRequest";
export { openHistoryStoreDb, closeHistoryStoreDb } from "../internal/core/openHistoryStoreDb";
export { extractHistoryIndexFields } from "../internal/core/extractHistoryIndexFields";
export {
  PROJECT_HISTORY_INDEX_DIR_NAME,
  PROJECT_HISTORY_INDEX_STORE_DB_FILE_NAME,
  PROJECT_HISTORY_ACKS_DIR_NAME,
} from "../internal/core/projectHistoryPaths.constant";
export { buildProjectHistoryMessageRecordV2 } from "../internal/core/buildProjectHistoryMessageRecordV2";
export { deriveProjectHistoryThreadKey } from "../internal/core/deriveProjectHistoryThreadKey";
export { deriveProjectHistorySenderLabel } from "../internal/core/deriveProjectHistorySenderLabel";
export { buildLocalChatAckRecord } from "../internal/core/buildLocalChatAckRecord";
export { writeLocalChatAckRecord } from "../internal/core/writeLocalChatAckRecord";

export {
  encodeProjectHistoryTimelineCursor,
  decodeProjectHistoryTimelineCursor,
} from "../internal/core/projectHistoryTimelineCursor";
export {
  readProjectHistoryMessagesPage,
  loadOlderProjectHistoryMessages,
} from "../internal/core/readProjectHistoryMessagesPage";
export { mapHistoryRecordToTimelineEntry } from "../internal/core/mapHistoryRecordToTimelineEntry";

export {
  listProjectHistorySkillgenDraftsForReview,
  readProjectHistorySkillgenDraftForReview,
} from "../internal/core/listProjectHistorySkillgenDraftsForReview";
export { saveProjectHistorySkillgenDraftForReview } from "../internal/core/saveProjectHistorySkillgenDraftForReview";
export { discardProjectHistorySkillgenDraftForReview } from "../internal/core/discardProjectHistorySkillgenDraftForReview";
export { publishProjectHistorySkillgenDraftForReview } from "../internal/core/publishProjectHistorySkillgenDraftForReview";
export { tryHandleLocalSkillDraftReviewRequest } from "../internal/core/tryHandleLocalSkillDraftReviewRequest";

export { writeProjectHistoryAiSession } from "../internal/core/writeProjectHistoryAiSession";
export { listProjectHistoryAiSessions } from "../internal/core/listProjectHistoryAiSessions";
export {
  mapAiSessionRecordToTimelineEntry,
  aiSessionMatchesThreadKey,
  timelineMessageIdForAiSession,
  PROJECT_HISTORY_AI_SESSION_KIND,
} from "../internal/core/mapAiSessionRecordToTimelineEntry";
export { PROJECT_HISTORY_TASKS_DIR_NAME } from "../internal/core/projectHistoryPaths.constant";
