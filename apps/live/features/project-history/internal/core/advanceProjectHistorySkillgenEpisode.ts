import { randomUUID } from "node:crypto";

import { computeProjectSkillContentHash } from "@agent-witch/shared/projectSkills";

import {
  PROJECT_HISTORY_SKILL_OWNER_LLM_INPUT_TOKEN_CAP,
  PROJECT_HISTORY_SKILL_VALIDATE_RETRY_MAX,
} from "./projectHistory.constants";
import { checkProjectHistorySkillgenTokenBudget } from "./checkProjectHistorySkillgenTokenBudget";
import { closeProjectHistorySkillgenEpisode } from "./closeProjectHistorySkillgenEpisode";
import { computeProjectHistorySkillgenReviewFlag } from "./computeProjectHistorySkillgenReviewFlag";
import { mergeOrSkipProjectHistorySkillgenDraft } from "./mergeOrSkipProjectHistorySkillgenDraft";
import type { ProjectHistorySkillgenDraftFingerprint } from "./mergeOrSkipProjectHistorySkillgenDraft";
import type { OwnerLlmDraftWriter } from "./ownerLlmDraftWriter.port";
import { resolveOwnerLlmDraftWriterMode } from "./ownerLlmDraftWriter.port";
import type { ProjectHistorySkillgenEpisodeRecord } from "./projectHistorySkillgenEpisode.type";
import type { ProjectHistorySkillgenReviewFlag } from "./computeProjectHistorySkillgenReviewFlag";
import {
  detectProjectHistorySkillgenOwnerMark,
  detectProjectHistorySkillgenSuccessSignal,
  qualifyProjectHistorySkillgenEpisode,
} from "./qualifyProjectHistorySkillgenEpisode";
import { recordProjectHistorySkillgenMetrics } from "./recordProjectHistorySkillgenMetrics";
import type { ProjectHistorySkillgenMetricsEvent } from "./recordProjectHistorySkillgenMetrics";
import { scrubProjectHistorySkillgenSecrets } from "./scrubProjectHistorySkillgenSecrets";
import { stampProjectHistorySkillgenSourceMessageIds } from "./stampProjectHistorySkillgenSourceMessageIds";
import { stepProjectHistorySkillgenFsm } from "./stepProjectHistorySkillgenFsm";
import {
  extractProjectHistorySkillgenStepLines,
  validateProjectHistorySkillgenDraft,
} from "./validateProjectHistorySkillgenDraft";
import type { WriteProjectHistorySkillgenDraftResult } from "./writeProjectHistorySkillgenDraft";

export type AdvanceProjectHistorySkillgenMessage = {
  readonly messageId: string;
  readonly createdAtMs: number;
  readonly text: string;
};

export type AdvanceProjectHistorySkillgenEpisodeDeps = {
  readonly ownerLlm: OwnerLlmDraftWriter | null;
  readonly writeDraft: (input: {
    readonly projectId: string;
    readonly draftId: string;
    readonly skillMarkdown: string;
    readonly episodeId: string;
    readonly sourceMessageIds: readonly string[];
    readonly name: string;
    readonly description: string;
  }) => WriteProjectHistorySkillgenDraftResult;
  readonly listDraftFingerprints: () => readonly ProjectHistorySkillgenDraftFingerprint[];
  readonly listPublishedFingerprints: () => readonly ProjectHistorySkillgenDraftFingerprint[];
  readonly openDraftCount: () => number;
  /** Rough token estimate for transcript size (chars/4 default if omitted). */
  readonly estimateTokens?: (text: string) => number;
};

export type AdvanceProjectHistorySkillgenEpisodeInput = {
  readonly episode: ProjectHistorySkillgenEpisodeRecord;
  readonly messages: readonly AdvanceProjectHistorySkillgenMessage[];
  readonly tokensUsedToday: number;
  readonly lastClosedAtMs: number | null;
  readonly nowMs: number;
  readonly deps: AdvanceProjectHistorySkillgenEpisodeDeps;
};

export type AdvanceProjectHistorySkillgenEpisodeResult = {
  readonly episode: ProjectHistorySkillgenEpisodeRecord;
  readonly metrics: readonly ProjectHistorySkillgenMetricsEvent[];
  readonly reviewFlag: ProjectHistorySkillgenReviewFlag;
  readonly draftWritten: WriteProjectHistorySkillgenDraftResult | null;
  readonly tokensSpent: number;
};

const defaultEstimateTokens = (text: string): number =>
  Math.ceil(text.length / 4);

const withTransition = (
  episode: ProjectHistorySkillgenEpisodeRecord,
  nextState: ProjectHistorySkillgenEpisodeRecord["state"],
  reason: string | null,
  patch: Partial<ProjectHistorySkillgenEpisodeRecord> = {},
): ProjectHistorySkillgenEpisodeRecord => ({
  ...episode,
  ...patch,
  state: nextState,
  reason,
});

/**
 * Advances one episode through as many legal FSM steps as possible until it
 * pauses (CAPTURING not ready, draft cap, AWAITING_REVIEW, or terminal).
 * Uses injected OwnerLlmDraftWriter (createOwnerLlmDraftWriter in production).
 */
export const advanceProjectHistorySkillgenEpisode = async (
  input: AdvanceProjectHistorySkillgenEpisodeInput,
): Promise<AdvanceProjectHistorySkillgenEpisodeResult> => {
  let episode = input.episode;
  const metrics: ProjectHistorySkillgenMetricsEvent[] = [];
  let draftWritten: WriteProjectHistorySkillgenDraftResult | null = null;
  let tokensSpent = 0;
  let pendingMarkdown: string | null = null;
  const estimateTokens =
    input.deps.estimateTokens ?? defaultEstimateTokens;
  const transcript = input.messages.map((m) => m.text).join("\n");

  const pushMetric = (
    from: ProjectHistorySkillgenEpisodeRecord["state"],
    to: ProjectHistorySkillgenEpisodeRecord["state"],
    reason: string | null,
  ): void => {
    metrics.push(
      recordProjectHistorySkillgenMetrics({
        projectId: episode.projectId,
        episodeId: episode.episodeId,
        fromState: from,
        toState: to,
        reason,
        tokensUsed: tokensSpent,
        openDraftCount: input.deps.openDraftCount(),
        nowIso: new Date(input.nowMs).toISOString(),
      }),
    );
  };

  for (let i = 0; i < 16; i += 1) {
    const reviewFlag = computeProjectHistorySkillgenReviewFlag({
      openDraftCount: input.deps.openDraftCount(),
    });

    if (episode.state === "CAPTURING") {
      const close = closeProjectHistorySkillgenEpisode({
        messages: input.messages.map((m) => ({
          messageId: m.messageId,
          createdAtMs: m.createdAtMs,
        })),
        nowMs: input.nowMs,
        lastClosedAtMs: input.lastClosedAtMs,
      });
      const step = stepProjectHistorySkillgenFsm({
        state: episode.state,
        verdict: { kind: "close", ready: close.ready },
      });
      if (!step.ok) {
        break;
      }
      const from = episode.state;
      episode = withTransition(episode, step.nextState, close.ready ? close.reason : null, {
        messageIds: close.ready ? close.messageIds : episode.messageIds,
        closedAtMs: close.ready ? input.nowMs : episode.closedAtMs,
        ownerMarkedSaveAsSkill: input.messages.some((m) =>
          detectProjectHistorySkillgenOwnerMark(m.text),
        ),
        hasSuccessSignal: input.messages.some((m) =>
          detectProjectHistorySkillgenSuccessSignal(m.text),
        ),
      });
      pushMetric(from, episode.state, episode.reason);
      continue;
    }

    if (episode.state === "EPISODE_READY") {
      if (reviewFlag.capReached) {
        const step = stepProjectHistorySkillgenFsm({
          state: episode.state,
          verdict: { kind: "draft_cap", reached: true },
        });
        if (step.ok) {
          pushMetric(episode.state, step.nextState, "draft_cap_reached");
          episode = withTransition(episode, step.nextState, "draft_cap_reached");
        }
        break;
      }
      const budget = checkProjectHistorySkillgenTokenBudget({
        tokensUsedToday: input.tokensUsedToday + tokensSpent,
      });
      const step = stepProjectHistorySkillgenFsm({
        state: episode.state,
        verdict: { kind: "budget", ok: budget.ok },
      });
      if (!step.ok) {
        break;
      }
      const from = episode.state;
      episode = withTransition(
        episode,
        step.nextState,
        budget.ok ? "budget_ok" : budget.reason,
      );
      pushMetric(from, episode.state, episode.reason);
      continue;
    }

    if (episode.state === "SCRUBBING") {
      const scrub = scrubProjectHistorySkillgenSecrets(transcript);
      const step = stepProjectHistorySkillgenFsm({
        state: episode.state,
        verdict: { kind: "scrub", residualSecret: scrub.residualSecret },
      });
      if (!step.ok) {
        break;
      }
      const from = episode.state;
      episode = withTransition(
        episode,
        step.nextState,
        scrub.residualSecret ? "scrub_quarantine" : "scrub_ok",
        { scrubbedTranscript: scrub.scrubbed },
      );
      pushMetric(from, episode.state, episode.reason);
      continue;
    }

    if (episode.state === "TRIAGE") {
      const qualify = qualifyProjectHistorySkillgenEpisode({
        messageCount: episode.messageIds.length,
        ownerMarkedSaveAsSkill: episode.ownerMarkedSaveAsSkill,
        hasSuccessSignal: episode.hasSuccessSignal,
      });
      const step = stepProjectHistorySkillgenFsm({
        state: episode.state,
        verdict: { kind: "qualify", ok: qualify.ok },
      });
      if (!step.ok) {
        break;
      }
      const from = episode.state;
      episode = withTransition(episode, step.nextState, qualify.reason);
      pushMetric(from, episode.state, episode.reason);
      continue;
    }

    if (episode.state === "DEDUP") {
      // Pre-extract fingerprint uses scrubbed transcript hash as a stand-in
      // until the owner LLM produces markdown; exact body hash is rechecked
      // after EXTRACT. Near-dup compare uses empty steps until then → name-only.
      const contentHash = computeProjectSkillContentHash(
        episode.scrubbedTranscript ?? transcript,
      );
      const dedup = mergeOrSkipProjectHistorySkillgenDraft({
        contentHash,
        name: "",
        stepLines: [],
        existingDrafts: input.deps.listDraftFingerprints(),
        existingPublished: input.deps.listPublishedFingerprints(),
      });
      if (
        (dedup.action === "create_new" || dedup.action === "update_draft") &&
        input.deps.ownerLlm === null
      ) {
        pushMetric(episode.state, episode.state, "owner_llm_unconfigured");
        break;
      }
      const step = stepProjectHistorySkillgenFsm({
        state: episode.state,
        verdict: { kind: "dedup", action: dedup.action },
      });
      if (!step.ok) {
        break;
      }
      const from = episode.state;
      episode = withTransition(episode, step.nextState, dedup.action, {
        contentHash,
        mergeDraftId:
          dedup.action === "update_draft" ? dedup.draftId : episode.mergeDraftId,
      });
      pushMetric(from, episode.state, episode.reason);
      continue;
    }

    if (episode.state === "EXTRACT") {
      if (input.deps.ownerLlm === null) {
        pushMetric(episode.state, episode.state, "owner_llm_unconfigured");
        break;
      }
      const scrubbed = episode.scrubbedTranscript ?? "";
      const mode = resolveOwnerLlmDraftWriterMode({
        estimatedInputTokens: estimateTokens(scrubbed),
        inputTokenCap: PROJECT_HISTORY_SKILL_OWNER_LLM_INPUT_TOKEN_CAP,
      });
      const written = await input.deps.ownerLlm({
        scrubbedTranscript: scrubbed,
        similarDraftHints: [],
        mode,
      });
      tokensSpent += written.tokensUsed;
      const step = stepProjectHistorySkillgenFsm({
        state: episode.state,
        verdict: { kind: "extract", ok: written.ok },
      });
      if (!step.ok) {
        break;
      }
      const from = episode.state;
      if (written.ok) {
        // Provenance from code, not the LLM: ids actually fed to the writer.
        pendingMarkdown = stampProjectHistorySkillgenSourceMessageIds({
          skillMarkdown: written.skillMarkdown,
          sourceMessageIds: episode.messageIds,
        });
      }
      episode = withTransition(
        episode,
        step.nextState,
        written.ok ? "extract_ok" : written.reason,
        { tokensUsed: episode.tokensUsed + written.tokensUsed },
      );
      pushMetric(from, episode.state, episode.reason);
      continue;
    }

    if (episode.state === "VALIDATE") {
      const markdown = pendingMarkdown ?? "";
      const validated = validateProjectHistorySkillgenDraft({
        skillMarkdown: markdown,
      });
      const attempts = episode.validateAttempts + (validated.ok ? 0 : 1);
      const step = stepProjectHistorySkillgenFsm({
        state: episode.state,
        verdict: {
          kind: "validate",
          ok: validated.ok,
          attempts: validated.ok
            ? episode.validateAttempts
            : Math.max(1, attempts),
        },
      });
      if (!step.ok) {
        break;
      }
      const from = episode.state;
      if (validated.ok) {
        // Post-extract exact/near-dup on the real skill body.
        const contentHash = computeProjectSkillContentHash(markdown);
        const stepLines = extractProjectHistorySkillgenStepLines(markdown);
        const dedup = mergeOrSkipProjectHistorySkillgenDraft({
          contentHash,
          name: validated.name,
          stepLines,
          existingDrafts: input.deps.listDraftFingerprints(),
          existingPublished: input.deps.listPublishedFingerprints(),
        });
        if (dedup.action === "skip_exact") {
          episode = withTransition(episode, "SKIPPED_DEDUP", "skip_exact", {
            contentHash,
            validateAttempts: attempts,
          });
          pushMetric(from, episode.state, "skip_exact");
          break;
        }
        const draftId =
          dedup.action === "update_draft"
            ? dedup.draftId
            : episode.mergeDraftId ?? randomUUID();
        draftWritten = input.deps.writeDraft({
          projectId: episode.projectId,
          draftId,
          skillMarkdown: markdown,
          episodeId: episode.episodeId,
          sourceMessageIds: validated.sourceMessageIds,
          name: validated.name,
          description: validated.description,
        });
        episode = withTransition(episode, step.nextState, "validate_ok", {
          draftId,
          contentHash: draftWritten.contentHash,
          validateAttempts: attempts,
        });
        pushMetric(from, episode.state, episode.reason);
        break;
      }
      if (step.nextState === "EXTRACT") {
        pendingMarkdown = null;
      }
      episode = withTransition(episode, step.nextState, validated.reason, {
        validateAttempts: attempts,
      });
      pushMetric(from, episode.state, episode.reason);
      if (
        step.nextState === "EXTRACT" &&
        attempts > PROJECT_HISTORY_SKILL_VALIDATE_RETRY_MAX
      ) {
        break;
      }
      continue;
    }

    break;
  }

  const reviewFlag = computeProjectHistorySkillgenReviewFlag({
    openDraftCount: input.deps.openDraftCount(),
  });
  return { episode, metrics, reviewFlag, draftWritten, tokensSpent };
};
