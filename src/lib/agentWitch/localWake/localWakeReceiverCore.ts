/** Part 1/3 of the local wake receiver (see localWakeReceiverSource.ts); split to stay under the file line cap. */
export const LOCAL_WAKE_RECEIVER_PART_1 = String.raw`#!/usr/bin/env node
import { createServer } from 'node:http';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { spawn, spawnSync } from 'node:child_process';
import {
  appendFileSync, chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(join(DIR, 'config.json'), 'utf8'));
const { projectId, appOrigin, wakeCommand, port } = config;
const LOG_PATH = join(DIR, 'receiver.log');
const SECRET_PATH = join(DIR, 'secret.env');
const SEEN_PATH = join(DIR, 'seen.json');
const PROMPT_DIR = join(DIR, 'prompts');
const MAX_SKEW_SEC = 300;
const SEEN_TTL_MS = 24 * 60 * 60 * 1000;
const HEALTH_INTERVAL_MS = 6 * 60 * 60 * 1000;
const WEBHOOK_PATH = '/awc/project-inbox';
const DOCKER_NAME = 'agentwitch-local-wake-' + projectId.slice(0, 8);

const log = (line) => appendFileSync(LOG_PATH, '[' + new Date().toISOString() + '] ' + line + '\n');
const readToken = () => readFileSync(join(DIR, 'token.env'), 'utf8').trim();
const readSecret = () => (existsSync(SECRET_PATH) ? readFileSync(SECRET_PATH, 'utf8').trim() : '');

const loadSeen = () => {
  try {
    return JSON.parse(readFileSync(SEEN_PATH, 'utf8'));
  } catch {
    return {};
  }
};
const markSeen = (messageId) => {
  const now = Date.now();
  const seen = Object.fromEntries(
    Object.entries(loadSeen()).filter(([, at]) => now - at < SEEN_TTL_MS),
  );
  const duplicate = messageId in seen;
  if (!duplicate) seen[messageId] = now;
  writeFileSync(SEEN_PATH, JSON.stringify(seen));
  return duplicate;
};

const verifySignature = (secret, timestamp, messageId, rawBody, signatureHex) => {
  if (!secret || !signatureHex || !timestamp || !messageId) return false;
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > MAX_SKEW_SEC) return false;
  const expected = createHmac('sha256', secret)
    .update(timestamp + '.' + messageId + '.' + rawBody)
    .digest('hex');
  try {
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(signatureHex, 'hex');
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
};

`;
