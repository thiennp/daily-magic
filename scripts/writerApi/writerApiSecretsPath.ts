import path from "node:path";

export const WRITER_API_SECRETS_FILE_NAME = "writer-api-secrets.json";

export const resolveWriterApiSecretsPath = (profileDir: string): string =>
  path.join(profileDir, WRITER_API_SECRETS_FILE_NAME);
