/**
 * base64url of UTF-8 text without `Buffer`: in the browser `Buffer` is a
 * polyfill that does not know the "base64url" encoding and throws
 * "Unknown encoding: base64url". Same bytes as Node's base64url, no padding.
 */
export const encodeBase64UrlText = (text: string): string => {
  const bytes = new TextEncoder().encode(text);
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join(
    "",
  );
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

/** Throws on input that is not valid base64url text; callers catch. */
export const decodeBase64UrlText = (raw: string): string => {
  const padded = raw.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, "="));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
};
