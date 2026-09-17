import fs from "node:fs";
import path from "node:path";

import { AGENT_WITCH_PROJECT_DOT_GITIGNORE_FILE_NAME } from "./agentWitchMaterialization.constants";
import { AGENT_WITCH_PROJECT_META_FILE_NAME } from "./agentWitchProjectStorage.constants";

const GITIGNORE_BODY = `*
!${AGENT_WITCH_PROJECT_META_FILE_NAME}
`;

export const ensureAgentWitchProjectDotGitignore = (
  metaDirPath: string,
): void => {
  const gitignorePath = path.join(
    metaDirPath,
    AGENT_WITCH_PROJECT_DOT_GITIGNORE_FILE_NAME,
  );

  if (fs.existsSync(gitignorePath)) {
    return;
  }

  fs.mkdirSync(metaDirPath, { recursive: true });
  fs.writeFileSync(gitignorePath, GITIGNORE_BODY);
};
