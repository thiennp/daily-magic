import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const resolveHomeReal = (): string =>
  fs.realpathSync(path.resolve(os.homedir()));

export const resolveSafePathUnderHome = (inputPath: string): string | null => {
  const trimmed = inputPath.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const expanded = trimmed.startsWith("~")
    ? path.join(os.homedir(), trimmed.slice(1))
    : trimmed;

  let resolved: string;
  try {
    resolved = fs.realpathSync(path.resolve(expanded));
  } catch {
    return null;
  }

  const home = resolveHomeReal();
  if (resolved === home || resolved.startsWith(`${home}${path.sep}`)) {
    return resolved;
  }

  return null;
};

const SECRET_DIR_SEGMENTS = new Set([
  ".ssh",
  ".aws",
  ".gnupg",
  ".kube",
  ".docker",
  ".azure",
  ".gcloud",
  ".1password",
  "Keychains",
]);

/** Credentials and keys: never served to a caller, even inside the home folder. */
export const isSecretLikePath = (realPath: string): boolean => {
  const segments = realPath.split(path.sep).filter((part) => part.length > 0);
  const name = segments[segments.length - 1] ?? "";
  return (
    segments.some((part) => SECRET_DIR_SEGMENTS.has(part)) ||
    name.startsWith(".env") ||
    /^id_(rsa|dsa|ecdsa|ed25519)/.test(name) ||
    /\.(pem|key|p12|pfx|keystore)$/i.test(name) ||
    [
      ".netrc",
      ".npmrc",
      ".pypirc",
      "credentials",
      "device-keypair.json",
      "link-code.txt",
    ].includes(name) ||
    (name === "config.json" && segments.includes(".agent-witch"))
  );
};

export const assertReadableFileUnderHome = (
  filePath: string,
): string | null => {
  const safe = resolveSafePathUnderHome(filePath);
  if (safe === null || isSecretLikePath(safe)) {
    return null;
  }

  try {
    const stat = fs.statSync(safe);
    if (!stat.isFile()) {
      return null;
    }
  } catch {
    return null;
  }

  return safe;
};
