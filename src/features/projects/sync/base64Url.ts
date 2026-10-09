/**
 * base64url for browser and Node alike. `Buffer` in the browser is a polyfill
 * that does not know the "base64url" encoding, so the sync cursor must not
 * use it (it threw "Unknown encoding: base64url" on the Tasks tab).
 */
export const encodeBase64Url = (text: string): string => {
  const bytes = new TextEncoder().encode(text);
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join(
    "",
  );
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

/** Throws on input that is not base64url, like `Buffer.from(raw, "base64url")` on bad bytes would not; callers catch. */
export const decodeBase64Url = (raw: string): string => {
  const padded = raw.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, "="));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
};
