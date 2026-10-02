/** Protocol metadata only — reject content-body / dump / media hints in summary. */
const FORBIDDEN_SUMMARY =
  /(run\s*log|skill\s*body|catalog\s*dump|memory\s*dump|base64[,:]|data:\s*(image|audio|video|application)|content-type:\s*(image|audio|video)\/|\b(image|audio|video)\/[a-z0-9.+-]+|\b(blob|octet-stream)\b)/i;

/** Reject media / data-URI / bulky base64-looking ref values. */
const FORBIDDEN_REF_VALUE =
  /(^data:|base64,|content-type:\s*(image|audio|video)\/|\b(image|audio|video)\/[a-z0-9.+-]+|\.(png|jpe?g|gif|webp|mp[34]|wav|ogg|mov|webm|pdf|zip)(\?|#|$))/i;

/** Long unbroken base64-ish payload (not a normal path/URL/sha). */
const LOOKS_LIKE_BASE64_BLOB = /^(?:[A-Za-z0-9+/]{40,}={0,2})$/;

export const summaryHasForbiddenContent = (summary: string): boolean =>
  FORBIDDEN_SUMMARY.test(summary);

export const refValueLooksLikeMediaOrBlob = (value: string): boolean => {
  if (FORBIDDEN_REF_VALUE.test(value)) {
    return true;
  }
  if (value.length >= 80 && LOOKS_LIKE_BASE64_BLOB.test(value.replace(/\s+/g, ""))) {
    return true;
  }
  return false;
};
