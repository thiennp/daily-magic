const TOKEN = /[A-Za-z0-9_./~-]{3,180}/g;

const FILE_EXTENSION =
  /\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i;

const isPathToken = (token: string): boolean => {
  if (token.includes("://") || token.startsWith("http")) {
    return false;
  }
  const stripped = token.replace(/^[~./]+/, "");
  if (stripped.length === 0 || stripped.includes("..")) {
    return false;
  }
  const first = stripped.split("/")[0] ?? "";
  if (stripped.includes("/") && first.includes(".")) {
    return false;
  }
  return stripped.includes("/") || FILE_EXTENSION.test(stripped);
};

/** File paths named in the prompt or the judge instructions, in first-seen order. */
export const findPromptSdlcEvidencePaths = (
  text: string,
  limit = 12,
): readonly string[] => {
  const found: string[] = [];
  for (const match of text.matchAll(TOKEN)) {
    const token = match[0].replace(/\.+$/, "");
    if (!isPathToken(token) || found.includes(token)) {
      continue;
    }
    found.push(token);
    if (found.length >= limit) {
      break;
    }
  }
  return found;
};
