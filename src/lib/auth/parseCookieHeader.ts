const parseCookieHeader = (
  cookieHeader: string,
): Readonly<Record<string, string>> => {
  if (cookieHeader.trim().length === 0) {
    return {};
  }

  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((segment) => segment.trim())
      .filter((segment) => segment.length > 0)
      .map((segment) => {
        const separatorIndex = segment.indexOf("=");
        if (separatorIndex <= 0) {
          return [segment, ""];
        }

        const name = segment.slice(0, separatorIndex).trim();
        const value = segment.slice(separatorIndex + 1).trim();
        return [name, decodeURIComponent(value)];
      }),
  );
};

export default parseCookieHeader;
