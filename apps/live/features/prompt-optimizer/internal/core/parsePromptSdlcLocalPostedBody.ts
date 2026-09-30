/** Parses prompt-optimizer POST bodies (urlencoded or multipart). */
export const parsePromptSdlcLocalPostedBody = (
  contentType: string | undefined,
  rawBody: string,
): URLSearchParams => {
  if (contentType?.includes("application/x-www-form-urlencoded")) {
    return new URLSearchParams(rawBody);
  }
  if (contentType?.includes("multipart/form-data")) {
    const boundaryMatch = /boundary=([^;\s]+)/i.exec(contentType);
    if (boundaryMatch === null) {
      return new URLSearchParams();
    }
    const boundary = boundaryMatch[1].replace(/^"|"$/g, "");
    const params = new URLSearchParams();
    const segments = rawBody.split(`--${boundary}`);
    for (const segment of segments) {
      if (!segment.includes("Content-Disposition")) {
        continue;
      }
      const nameMatch = /name="([^"]+)"/.exec(segment);
      if (nameMatch === null) {
        continue;
      }
      const valueStart = segment.indexOf("\r\n\r\n");
      if (valueStart < 0) {
        continue;
      }
      let value = segment.slice(valueStart + 4);
      value = value.replace(/\r\n--\s*$/u, "").replace(/\r\n$/u, "");
      params.append(nameMatch[1], value);
    }
    return params;
  }
  return new URLSearchParams(rawBody);
};
