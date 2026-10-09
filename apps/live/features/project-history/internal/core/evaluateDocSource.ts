import { createHash } from "node:crypto";

import { buildDocSkillMarkdown } from "./buildDocSkillMarkdown";
import {
  convertDocToSkillDraft,
  type DocSkillDraft,
  type DocSource,
} from "./convertDocToSkillDraft";
import { scrubProjectHistorySkillgenSecrets } from "./scrubProjectHistorySkillgenSecrets";
import { shouldIngestDoc } from "./shouldIngestDoc";
import { validateDocSkillDraft } from "./validateDocSkillDraft";

export type DocEvaluation =
  | {
      readonly kind: "candidate";
      readonly draft: DocSkillDraft;
      readonly markdown: string;
      readonly clusterId: string;
      readonly stepCount: number;
    }
  | { readonly kind: "skip"; readonly reason: string };

/** Stable per document version: a changed file gets a new id, so it can be asked again. */
export const docClusterId = (relPath: string, sha: string): string =>
  `doc-${createHash("sha1").update(relPath).digest("hex").slice(0, 12)}-${sha.slice(0, 8)}`;

/** Scrub secrets, convert, gate, stamp and validate one document. */
export const evaluateDocSource = (
  source: DocSource,
  existingNames: readonly string[],
): DocEvaluation => {
  const scrubbed = scrubProjectHistorySkillgenSecrets(source.text);
  if (scrubbed.residualSecret) {
    return { kind: "skip", reason: "secret" };
  }
  const draft = convertDocToSkillDraft({ ...source, text: scrubbed.scrubbed });
  const gate = shouldIngestDoc(draft, existingNames);
  if (!gate.ok) {
    return { kind: "skip", reason: gate.reason };
  }
  const markdown = buildDocSkillMarkdown(draft);
  const valid = validateDocSkillDraft(markdown);
  return valid.ok
    ? {
        kind: "candidate",
        draft,
        markdown,
        clusterId: docClusterId(draft.relPath, draft.sha),
        stepCount: valid.stepCount,
      }
    : { kind: "skip", reason: valid.reason };
};
