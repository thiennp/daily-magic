import { isIP } from "node:net";
import { lookup } from "node:dns/promises";

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "metadata.google.internal",
  "metadata.google.com",
]);

const isPrivateOrLocalIp = (ip: string): boolean => {
  const version = isIP(ip);
  if (version === 4) {
    const parts = ip.split(".").map((p) => Number(p));
    if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n))) {
      return true;
    }
    const [a, b] = parts;
    if (a === 10) return true;
    if (a === 127) return true;
    if (a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
    return false;
  }
  if (version === 6) {
    const normalized = ip.toLowerCase();
    if (normalized === "::1") return true;
    if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true;
    if (normalized.startsWith("fe80")) return true;
    if (normalized.startsWith("::ffff:")) {
      const v4 = normalized.slice("::ffff:".length);
      return isPrivateOrLocalIp(v4);
    }
    return false;
  }
  return true;
};

export type SafeWebhookUrlResult =
  | { readonly ok: true; readonly url: URL }
  | { readonly ok: false; readonly code: "invalid_url" | "https_only" | "blocked_host" };

/** A3.1 SSRF: https-only; deny private/loopback/link-local/metadata (resolved). */
export const assertSafeProjectWebhookUrl = async (
  raw: unknown,
): Promise<SafeWebhookUrlResult> => {
  if (typeof raw !== "string" || raw.trim().length === 0) {
    return { ok: false, code: "invalid_url" };
  }
  const parsed = (() => {
    try {
      return { ok: true as const, url: new URL(raw.trim()) };
    } catch {
      return { ok: false as const };
    }
  })();
  if (!parsed.ok) {
    return { ok: false, code: "invalid_url" };
  }
  const url = parsed.url;
  if (url.protocol !== "https:") {
    return { ok: false, code: "https_only" };
  }
  if (url.username || url.password) {
    return { ok: false, code: "blocked_host" };
  }
  const hostname = url.hostname.toLowerCase();
  if (BLOCKED_HOSTNAMES.has(hostname) || hostname.endsWith(".localhost")) {
    return { ok: false, code: "blocked_host" };
  }
  if (isIP(hostname)) {
    if (isPrivateOrLocalIp(hostname)) {
      return { ok: false, code: "blocked_host" };
    }
    return { ok: true, url };
  }
  try {
    const records = await lookup(hostname, { all: true });
    if (records.length === 0) {
      return { ok: false, code: "blocked_host" };
    }
    for (const record of records) {
      if (isPrivateOrLocalIp(record.address)) {
        return { ok: false, code: "blocked_host" };
      }
    }
  } catch {
    return { ok: false, code: "blocked_host" };
  }
  return { ok: true, url };
};
