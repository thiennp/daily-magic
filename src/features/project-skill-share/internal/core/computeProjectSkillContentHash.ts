import { createHash } from "node:crypto";

import { PROJECT_SKILL_CONTENT_HASH_PREFIX } from "@/features/project-skill-share/internal/core/projectSkillShare.constant";

/** `sha256:` + lowercase hex of the exact UTF-8 bytes. Same contract as the AWL mirror. */
export const computeProjectSkillContentHash = (body: string): string =>
  `${PROJECT_SKILL_CONTENT_HASH_PREFIX}${createHash("sha256")
    .update(Buffer.from(body, "utf8"))
    .digest("hex")}`;
