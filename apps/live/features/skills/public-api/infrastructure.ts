/**
 * AWL slice `skills` — local skill index, hybrid search, skills_find /
 * skills_run MCP tools and the gate every skill call goes through.
 */
export { createSkillTools } from "../internal/core/createSkillTools";
export { createDefaultSkillToolDeps } from "../internal/core/createDefaultSkillToolDeps";
export { refreshSkillIndex } from "../internal/core/refreshSkillIndex";
export { reindexProject } from "../internal/core/reindexProject";
export { indexSkill, removeSkill } from "../internal/core/indexSkill";
export { findSkills } from "../internal/core/findSkills";
export { gateSkillCall } from "../internal/core/gateSkillCall";
export { computeSkillMissRate } from "../internal/core/skillCallLog";
export {
  SKILLS_FIND_INSTRUCTION,
  withSkillsFindInstruction,
} from "../internal/core/skillsPromptInstruction";
