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

/** Absolute, home-relative, relative or Windows drive path; never a URL or data URI. */
const LOCAL_FILE_PATH = /^(?:\/|~\/|\.{1,2}\/|[A-Za-z]:[\\/])(?!.*:\/\/)/;

export const isLocalFilePathRef = (value: string): boolean =>
  LOCAL_FILE_PATH.test(value) && !/(^data:|base64,)/i.test(value);

/**
 * `localPath` may point at any file on the sender computer, including an
 * image: only the path travels, never the bytes. URLs and data URIs stay
 * rejected.
 */
export const refValueLooksLikeMediaOrBlob = (
  value: string,
  options: { readonly allowLocalFilePath?: boolean } = {},
): boolean => {
  const localFilePath =
    options.allowLocalFilePath === true && isLocalFilePathRef(value);
  if (!localFilePath && FORBIDDEN_REF_VALUE.test(value)) {
    return true;
  }
  if (
    value.length >= 80 &&
    LOOKS_LIKE_BASE64_BLOB.test(value.replace(/\s+/g, ""))
  ) {
    return true;
  }
  return false;
};
