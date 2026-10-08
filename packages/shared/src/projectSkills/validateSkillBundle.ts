import { hasResidualOutboundSecret } from "../dispatch/scrubOutboundSecrets";

import { computeSkillScriptSha256 } from "./computeSkillScriptSha256";
import {
  SKILL_BUNDLE_MAX_TOTAL_BYTES,
  SKILL_SCRIPT_MAX_BYTES,
} from "./skillBundle.constant";
import type { SkillBundleResult } from "./skillBundle.type";
import { parseSkillManifest } from "./parseSkillManifest";

// eslint-disable-next-line no-control-regex
const BINARY = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/;

const byteLength = (text: string): number => Buffer.byteLength(text, "utf8");

const fail = (reason: string): SkillBundleResult => ({ ok: false, reason });

/**
 * Validate an untrusted bundle: manifest shape, one text file per entry,
 * caps (64 KB each, 10 scripts, 256 KB total), no binary content, no secrets,
 * and each file hashes to the manifest sha256.
 */
export const validateSkillBundle = (raw: unknown): SkillBundleResult => {
  const record = raw as { manifest?: unknown; files?: unknown } | null;
  const manifest = parseSkillManifest(record?.manifest);
  const files = record?.files;
  if (
    manifest === null ||
    typeof files !== "object" ||
    files === null ||
    Array.isArray(files)
  ) {
    return fail("bundle_malformed");
  }
  const map = files as Readonly<Record<string, unknown>>;
  const names = new Set(manifest.scripts.map((s) => s.file));
  if (Object.keys(map).some((name) => !names.has(name))) {
    return fail("bundle_unlisted_file");
  }
  let total = 0;
  const out: Record<string, string> = {};
  for (const entry of manifest.scripts) {
    const content = map[entry.file];
    if (typeof content !== "string" || content.length === 0) {
      return fail(`script_missing:${entry.name}`);
    }
    const bytes = byteLength(content);
    total += bytes;
    if (bytes > SKILL_SCRIPT_MAX_BYTES) {
      return fail(`script_too_large:${entry.name}`);
    }
    if (BINARY.test(content)) {
      return fail(`script_binary:${entry.name}`);
    }
    if (hasResidualOutboundSecret(content)) {
      return fail(`script_secret:${entry.name}`);
    }
    if (computeSkillScriptSha256(content) !== entry.sha256) {
      return fail(`script_hash_mismatch:${entry.name}`);
    }
    out[entry.file] = content;
  }
  return total > SKILL_BUNDLE_MAX_TOTAL_BYTES
    ? fail("bundle_too_large")
    : { ok: true, bundle: { manifest, files: out } };
};

/** Parse the bundle embedded in a body (`null`: none; failure: reason). */
export const parseSkillBundleJson = (json: string): SkillBundleResult => {
  try {
    return validateSkillBundle(JSON.parse(json));
  } catch {
    return fail("bundle_json_invalid");
  }
};
